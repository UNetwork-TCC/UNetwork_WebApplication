/* eslint-disable @typescript-eslint/no-explicit-any */
// Importar reflect-metadata para habilitar metadados dos decoradores
import 'reflect-metadata';
import { NextRequest, NextResponse } from 'next/server';
import { ControllerMethodParams } from '../interfaces';
import jwt from 'jsonwebtoken';

// Função auxiliar para verificar se um token JWT é válido
function verificarToken(token: string): { valido: boolean; payload?: any; erro?: string } {
  try {
    if (!token) {
      return { valido: false, erro: 'Token não fornecido' };
    }
    
    // Verificar e decodificar o token usando jwt.verify
    try {
      // Obter a chave secreta do ambiente
      const jwtSecret = process.env.JWT_SECRET;
      
      if (!jwtSecret) {
        return { valido: false, erro: 'Configuração de segurança ausente no servidor' };
      }
      
      // Verificar o token usando a biblioteca jsonwebtoken
      const payload = jwt.verify(token, jwtSecret);
      
      return { valido: true, payload };
    } catch (jwtError) {
      return { 
        valido: false, 
        erro: jwtError instanceof Error ? 
          `Token inválido: ${jwtError.message}` : 
          'Token inválido ou expirado' 
      };
    }
  } catch (error) {
    return {
      valido: false,
      erro: error instanceof Error ? error.message : 'Erro ao verificar token'
    };
  }
}

// Metadados para os middlewares
const MIDDLEWARE_KEY = Symbol('middleware:functions');

// Gerenciador de middlewares
type MiddlewareFunction = (requestData: ControllerMethodParams) => Promise<NextResponse | null>;

// Decorator para verificar autenticação JWT
export function JwtAuth(roles?: string[]) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    // Criar middleware para verificação de JWT
    const jwtMiddleware: MiddlewareFunction = async (requestData: ControllerMethodParams) => {
      // Extrair token do cabeçalho Authorization
      const authHeader = requestData.request.headers.get('Authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ 
          error: 'Token JWT não fornecido ou malformado' 
        }, { 
          status: 401 
        });
      }
      
      const token = authHeader.substring(7); // Remover 'Bearer ' do início
      
      // Verificar token
      const { valido, payload, erro } = verificarToken(token);
      
      if (!valido) {
        return NextResponse.json({ 
          error: 'Não autorizado', 
          details: erro 
        }, { 
          status: 401 
        });
      }
      
      // Verificar roles (se especificadas)
      if (roles && roles.length > 0) {
        const userRoles = payload.roles || [];
        const temPermissao = roles.some(role => userRoles.includes(role));
        
        if (!temPermissao) {
          return NextResponse.json({ 
            error: 'Acesso proibido. Você não tem permissão para este recurso.' 
          }, { 
            status: 403 
          });
        }
      }
      
      // Se chegou aqui, o token é válido e as permissões estão corretas
      // Adicionar payload decodificado aos dados da requisição
      requestData.user = payload;
      
      // Middleware passa adiante (continua o fluxo)
      return null;
    };
    
    // Adicionar middleware à lista de middlewares do método
    // Usar sistema alternativo para compatibilidade com o Next.js
    try {
      const existingMiddlewares: MiddlewareFunction[] = Reflect.getOwnMetadata(MIDDLEWARE_KEY, target, propertyKey) || [];
      existingMiddlewares.push(jwtMiddleware);
      Reflect.defineMetadata(MIDDLEWARE_KEY, existingMiddlewares, target, propertyKey);
    } catch (error) {
      // Fallback para o sistema alternativo
      registrarMiddleware(target, propertyKey, jwtMiddleware);
    }
    
    return descriptor;
  };
}

// Função para executar todos os middlewares de um método
export async function executarMiddlewares(
  target: any, 
  methodName: string, 
  requestData: ControllerMethodParams
): Promise<NextResponse | null> {
  try {
    let middlewares: MiddlewareFunction[] = [];
    try {
      // Tentar obter via Reflect
      middlewares = Reflect.getOwnMetadata(MIDDLEWARE_KEY, target.constructor.prototype, methodName) || [];
    } catch (error) {
      // Fallback para sistema alternativo
      const targetMap = middlewareRegistry.get(target.constructor.prototype);
      if (targetMap) {
        middlewares = targetMap.get(methodName) || [];
      }
    }
    
    // Se não houver middlewares, continua o fluxo normal
    if (middlewares.length === 0) {
      return null;
    }
    
    // Executar cada middleware em sequência
    for (const middleware of middlewares) {
      const result = await middleware(requestData);
      
      // Se o middleware retornou uma resposta, interromper o fluxo e retornar essa resposta
      if (result instanceof NextResponse) {
        return result;
      }
    }
    
    // Todos os middlewares foram executados com sucesso
    return null;
  } catch (error) {
    // Em caso de erro, retornar resposta de erro
    return NextResponse.json({ 
      error: 'Erro ao processar middlewares',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { 
      status: 500 
    });
  }
}

// Sistema de metadados manual para quando reflect-metadata não estiver disponível
export const middlewareRegistry = new Map<any, Map<string, MiddlewareFunction[]>>();

// Função para registrar um middleware sem usar reflect-metadata
export function registrarMiddleware(target: any, methodName: string, middleware: MiddlewareFunction) {
  if (!middlewareRegistry.has(target.constructor)) {
    middlewareRegistry.set(target.constructor, new Map());
  }
  
  const classMap = middlewareRegistry.get(target.constructor)!;
  
  if (!classMap.has(methodName)) {
    classMap.set(methodName, []);
  }
  
  classMap.get(methodName)!.push(middleware);
}

// Versão alternativa para executar middlewares sem reflect-metadata
export async function executarMiddlewaresSemReflect(
  target: any, 
  methodName: string, 
  requestData: ControllerMethodParams
): Promise<NextResponse | null> {
  try {
    // Obter lista de middlewares registrados para o método
    const classMap = middlewareRegistry.get(target.constructor);
    const middlewares = classMap?.get(methodName) || [];
    
    // Se não houver middlewares, continua o fluxo normal
    if (middlewares.length === 0) {
      return null;
    }
    
    // Executar cada middleware em sequência
    for (const middleware of middlewares) {
      const result = await middleware(requestData);
      
      // Se o middleware retornou uma resposta, interromper o fluxo e retornar essa resposta
      if (result instanceof NextResponse) {
        return result;
      }
    }
    
    // Todos os middlewares foram executados com sucesso
    return null;
  } catch (error) {
    console.error('Erro ao executar middlewares:', error);
    
    // Em caso de erro, retornar resposta de erro
    return NextResponse.json({ 
      error: 'Erro ao processar middlewares',
      message: error instanceof Error ? error.message : String(error)
    }, { 
      status: 500 
    });
  }
}
