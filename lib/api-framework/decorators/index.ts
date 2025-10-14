/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { ControllerMethodParams, HttpHandler } from '../interfaces';
import { executarMiddlewares, executarMiddlewaresSemReflect } from './middleware';
import { DI } from '../dependency';

// Decoradores de métodos HTTP
export function Get(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  descriptor.value.__isGetHandler = true;
  return descriptor;
}

export function Post(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  descriptor.value.__isPostHandler = true;
  return descriptor;
}

export function Put(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  descriptor.value.__isPutHandler = true;
  return descriptor;
}

export function Delete(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  descriptor.value.__isDeleteHandler = true;
  return descriptor;
}

export function Patch(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  descriptor.value.__isPatchHandler = true;
  return descriptor;
}

// Re-exportar JwtAuth para uso mais fácil
export { JwtAuth } from './middleware';

// Exportar decoradores de injeção de dependência
export { Inject, InjectRepository } from '../dependency';

// Implementação do decorator Body para Next.js App Router
export function Body() {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const existing: Record<number, boolean> = Reflect.getMetadata('body', target, propertyKey) || {};
    existing[parameterIndex] = true;
    Reflect.defineMetadata('body', existing, target, propertyKey);
  };
}

// Enum para tipos de parâmetros
enum ParamType {
  BODY = 'body',
  PARAM = 'param'
}

// Interface para metadados de parâmetros
interface ParamMetadata {
  index: number;
  type: ParamType;
  paramName?: string;
}

// Implementação do decorator Param como parameter decorator usando Reflect metadata
export function Param(paramName?: string) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const existing: Record<number, string | true> = Reflect.getMetadata('param', target, propertyKey) || {};
    existing[parameterIndex] = paramName ?? true;
    Reflect.defineMetadata('param', existing, target, propertyKey);
  };
}

// Armazenamento de controladores instanciados
const controllerInstances = new Map<any, any>();

// Armazenamento global para o body processado
let cachedRequestBody: any = null;

// Função para processar o body de uma requisição
async function processRequestBody(request: NextRequest): Promise<any> {
  try {
    // Se já temos o body em cache, retorne-o
    if (cachedRequestBody !== null) {
      return cachedRequestBody;
    }
    
    // Obter o conteúdo como texto
    const text = await request.text();
    if (!text || !text.trim()) {
      cachedRequestBody = {};
      return {};
    }
    
    try {
      // Parsear como JSON
      cachedRequestBody = JSON.parse(text);
      return cachedRequestBody;
    } catch (error) {
      console.error('Erro ao processar JSON:', error);
      // Tentar interpretar como form data se falhar como JSON
      if (text.includes('=')) {
        const formData = {};
        text.split('&').forEach(item => {
          const [key, value] = item.split('=');
          if (key && value) {
            formData[decodeURIComponent(key)] = decodeURIComponent(value);
          }
        });
        cachedRequestBody = formData;
        return formData;
      }
      
      // Último recurso: retornar como texto bruto
      cachedRequestBody = { rawContent: text };
      return cachedRequestBody;
    }
  } catch (e) {
    console.error('Erro ao processar body:', e);
    cachedRequestBody = {};
    return {};
  }
}

// Função auxiliar para obter argumentos baseados em metadados
function getArgumentsFromRequest(
  target: any, 
  methodName: string, 
  requestData: ControllerMethodParams
): any[] {
  const prototype = Object.getPrototypeOf(target);
  const paramTypes = Reflect.getMetadata('design:paramtypes', target, methodName)
    || (prototype ? Reflect.getMetadata('design:paramtypes', prototype, methodName) : undefined)
    || [];
  const args: any[] = [];

  for (let i = 0; i < paramTypes.length; i++) {
    // Verificar se existe um decorator Body para este parâmetro
    const bodyMetadata = Reflect.getMetadata('body', target, methodName)
      || (prototype ? Reflect.getMetadata('body', prototype, methodName) : undefined)
      || {};
    if (bodyMetadata[i]) {
      args[i] = requestData.body;
      continue;
    }

    // Verificar se existe um decorator Param para este parâmetro
    const paramMetadata = Reflect.getMetadata('param', target, methodName)
      || (prototype ? Reflect.getMetadata('param', prototype, methodName) : undefined)
      || {};
    if (paramMetadata[i]) {
      const paramName = paramMetadata[i];
      if (paramName && requestData.params) {
        args[i] = requestData.params[paramName];
      } else {
        // Se não especificar nome do parâmetro, passar todos os parâmetros
        args[i] = requestData.params;
      }
      continue;
    }

    // Se não houver decorator específico, mapear baseado no tipo
    const paramType = paramTypes[i];
    if (paramType === NextRequest) {
      args[i] = requestData.request;
    } else if (paramType === URL) {
      args[i] = requestData.url;
    } else if (paramType === String && requestData.params) {
      // Para parâmetros do tipo String, tentar encontrar um parâmetro com nome correspondente
      const paramNames = Object.keys(requestData.params);
      if (paramNames.length === 1) {
        args[i] = requestData.params[paramNames[0]];
      } else {
        args[i] = requestData.params;
      }
    } else if (paramType === URLSearchParams) {
      args[i] = requestData.searchParams;
    } else if (requestData.body !== undefined) {
      // Se não conseguir mapear e houver body, passar o body
      args[i] = requestData.body;
    } else if (requestData.params && Object.keys(requestData.params).length > 0) {
      // Se há parâmetros na rota, verificar se o usuário pode querer um objeto com params
      // Isso é útil para casos como: res: { params: { id: string } }
      args[i] = { params: requestData.params };
    } else {
      // Último recurso: tentar passar os parâmetros
      args[i] = requestData.params;
    }
  }

  return args;
}

// Função auxiliar para obter os tipos dos parâmetros do construtor
function getConstructorParamTypes(target: any): string[] {
  try {
    // Obter o código do construtor como string
    const constructorString = target.toString();
    
    // Verificar se é uma classe com constructor
    const constructorMatch = constructorString.match(/constructor\s*\((.*?)\)/);
    if (constructorMatch && constructorMatch[1]) {
      // Extrair os nomes dos parâmetros
      return constructorMatch[1]
        .split(',')
        .map((param: string) => param.trim())
        .filter((param: string) => param.length > 0)
        .map((param: string) => {
          // Remover modificadores como 'private', 'public', etc.
          const cleanParam = param.replace(/^(private|public|protected|readonly)\s+/, '');
          
          // Extrair o nome da variável (antes do ':' se tiver tipagem)
          const varName = cleanParam.split(':')[0].trim();
          return varName;
        });
    }
  } catch (error) {
    console.warn('Erro ao analisar parâmetros do construtor:', error);
  }
  
  return [];
}

// Decorator de classe (sem parênteses)
export function Controller<T extends new (...args: any[]) => any>(constructor: T): any {
  const controllerClass: any = constructor;
  
  // Criar handlers para cada método HTTP
  const GET_HANDLER = createNextRouteHandler(controllerClass, 'GET', 'Get');
  const POST_HANDLER = createNextRouteHandler(controllerClass, 'POST', 'Post');
  const PUT_HANDLER = createNextRouteHandler(controllerClass, 'PUT', 'Put');
  const DELETE_HANDLER = createNextRouteHandler(controllerClass, 'DELETE', 'Delete');
  const PATCH_HANDLER = createNextRouteHandler(controllerClass, 'PATCH', 'Patch');
  
  // Adicionar handlers como métodos estáticos
  controllerClass.GET = GET_HANDLER;
  controllerClass.POST = POST_HANDLER;
  controllerClass.PUT = PUT_HANDLER;
  controllerClass.DELETE = DELETE_HANDLER;
  controllerClass.PATCH = PATCH_HANDLER;
  
  // Adicionar métodos à instância também
  const originalConstructor = controllerClass;
  
  function NewConstructor(this: any, ...args: any[]) {
    const instance = new originalConstructor(...args);
    
    // Adicionar os handlers à instância
    instance.GET = GET_HANDLER;
    instance.POST = POST_HANDLER;
    instance.PUT = PUT_HANDLER;
    instance.DELETE = DELETE_HANDLER;
    instance.PATCH = PATCH_HANDLER;
    
    // Adicionar método para retornar todos os handlers
    if (!instance.getHandlers) {
      instance.getHandlers = function() {
        return {
          GET: this.GET,
          POST: this.POST,
          PUT: this.PUT,
          DELETE: this.DELETE,
          PATCH: this.PATCH
        };
      };
    }
    
    return instance;
  }
  
  // Copiar o prototype
  NewConstructor.prototype = originalConstructor.prototype;
  
  // Copiar métodos estáticos
  Object.getOwnPropertyNames(originalConstructor).forEach(prop => {
    if (prop !== 'prototype' && prop !== 'length' && prop !== 'name') {
      Object.defineProperty(NewConstructor, prop, 
        Object.getOwnPropertyDescriptor(originalConstructor, prop) as PropertyDescriptor);
    }
  });
  
  // Adicionar métodos HTTP como estáticos
  NewConstructor.GET = GET_HANDLER;
  NewConstructor.POST = POST_HANDLER;
  NewConstructor.PUT = PUT_HANDLER;
  NewConstructor.DELETE = DELETE_HANDLER;
  NewConstructor.PATCH = PATCH_HANDLER;
  
  return NewConstructor as unknown as T;
}

// Função auxiliar para criar handlers do Next.js App Router
export function createNextRouteHandler(controllerClass: any, methodType: string, handlerType: string): HttpHandler {
  return async function(request: NextRequest, context?: any) {
    // Limpar o cache do body para cada nova requisição
    cachedRequestBody = null;
    const normalizedMethod = methodType.toUpperCase();
    
    // Criar ou recuperar a instância do controlador
    if (!controllerInstances.has(controllerClass)) {
      try {
        // Tentar criar instância com injeção de dependência para os repositórios
        // Usar reflexão para obter os parâmetros do construtor
        const paramNames = getConstructorParamTypes(controllerClass);
        
        if (paramNames.length > 0) {
          // Se tiver parâmetros, tentar resolver as dependências
          const params = paramNames.map(paramName => {
            try {
              // Tentar resolver pelo DI container
              return DI.resolve(paramName);
            } catch (error) {
              // Se não conseguir resolver, tenta criar uma instância pelo nome da classe
              try {
                // Verificar se o nome termina com ''Reposito'ry'
                if (paramName.endsWith('Repository')) {
                  const repoName = paramName.charAt(0).toUpperCase() + paramName.slice(1);
                  // Importar dinamicamente (isso dependerá da estrutura do projeto)
                  const repoClass = require(`@/lib/repositories/${repoName}`)[repoName];
                  if (repoClass) {
                    const instance = new repoClass();
                    DI.register(paramName, instance);
                    return instance;
                  }
                }
              } catch (e) {
                console.warn(`Não foi possível resolver dependência: ${paramName}`, e);
              }
              return undefined;
            }
          });
          
          // Criar a instância com os parâmetros resolvidos
          const instance = new controllerClass(...params.filter(p => p !== undefined));
          controllerInstances.set(controllerClass, instance);
        } else {
          // Se não tiver parâmetros, criar normalmente
          const instance = new controllerClass();
          controllerInstances.set(controllerClass, instance);
        }
      } catch (error) {
        // Fallback: criar sem injeção de dependência
        console.warn('Erro ao criar controlador com injeção de dependência:', error);
        const instance = new controllerClass();
        controllerInstances.set(controllerClass, instance);
      }
    }
    
    const instance = controllerInstances.get(controllerClass);
    
    // Encontrar método decorado com o respectivo decorator
    const methods = Object.getOwnPropertyNames(controllerClass.prototype)
      .filter(prop => prop !== 'constructor')
      .filter(prop => {
        const descriptor = Object.getOwnPropertyDescriptor(controllerClass.prototype, prop);
        return descriptor && descriptor.value && descriptor.value[`__is${handlerType}Handler`];
      });
    
    if (methods.length > 0) {
      const lastMethod = methods[methods.length - 1];
      
      try {
        // Preparar os dados da requisição
        const url = new URL(request.url);
        const params = await context?.params || {};
        const searchParams = url.searchParams;
        
        // Se o método espera corpo da requisição (POST, PUT, PATCH)
        let body = undefined;
        if (['POST', 'PUT', 'PATCH'].includes(normalizedMethod)) {
          try {
            // Obtenção do body diretamente, sem tentar usar clone
            body = await processRequestBody(request);
          } catch (e) {
            console.error('Erro ao processar body:', e);
            body = {};
          }
        }
        
        // Dados da requisição formatados
        const requestData: ControllerMethodParams = {
          request,
          url,
          params,
          body,
          searchParams,
          user: undefined // Será preenchido pelo middleware JWT se autenticado
        };
       
        // *** NOVO: Executar middlewares antes de chamar o método ***
        const middlewareResponse = await executarMiddlewares(instance, lastMethod, requestData);
        
        // Se um middleware retornou uma resposta, retorná-la diretamente
        if (middlewareResponse) {
          return middlewareResponse;
        }
        
        // Obter argumentos com base nos metadados de parâmetros
        const args = getArgumentsFromRequest(instance, lastMethod, requestData);
        
        // Chamar o método do controlador com os argumentos injetados e preservar o contexto 'this'
        const originalMethod = instance[lastMethod];
        
        // Verificar se algum argumento é uma promise
        const hasPromises = args.some(arg => arg && typeof arg.then === 'function');
        
        let result;
        if (hasPromises) {
          // Aguardar todas as promises antes de chamar o método
          const resolvedArgs = await Promise.all(args.map(arg => 
            arg && typeof arg.then === 'function' ? arg : Promise.resolve(arg)
          ));
          result = await originalMethod.apply(instance, resolvedArgs);
        } else {
          // Chamar o método normalmente
          result = await originalMethod.apply(instance, args);
        }

        // Retornar a resposta formatada para o Next.js
        return NextResponse.json(result, { 
          status: normalizedMethod === 'POST' ? 201 : 200 
        });
      } catch (error) {
        console.error(`Erro ao executar método ${normalizedMethod}:`, error);
        console.error(`Detalhes do erro:`, {
          methodType: normalizedMethod,
          methodName: lastMethod,
          controllerClass: controllerClass.name,
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
          requestUrl: request.url,
          requestMethod: request.method
        });
        
        return NextResponse.json({ 
          error: `Erro ao processar requisição ${normalizedMethod}`,
          message: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString()
        }, { 
          status: 500 
        });
      }
    }
    
    return NextResponse.json({ 
      error: `Nenhum método ${normalizedMethod} encontrado` 
    }, { 
      status: 404 
    });
  };
}