/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseDTO } from '../models';
import { connectToDatabase } from './mongodb';

/**
 * Decorator de classe que transforma todas as respostas dos métodos em objetos ResponseDTO
 * Automaticamente envolve o retorno em um objeto com { message, data, status }
 */
export function Repository<T extends { new (...args: any[]): any }>(constructor: T) {
  class RepositoryWrapper extends constructor {
    constructor(...args: any[]) {
      super(...args);

      const methodNames = Object.getOwnPropertyNames(constructor.prototype)
        .filter(prop => prop !== 'constructor')
        .filter(prop => typeof constructor.prototype[prop] === 'function');

      methodNames.forEach(methodName => {
        const originalMethod = constructor.prototype[methodName];

        this[methodName] = async (...methodArgs: any[]) => {
          try {
            await connectToDatabase();

            const result = await originalMethod.apply(this, methodArgs);

            if (result instanceof ResponseDTO) {
              return result;
            }

            if (result && typeof result === 'object' && 'status' in result && result.status >= 400) {
              return ResponseDTO.error(result.message || 'Erro desconhecido', result.status);
            }

            if (typeof result === 'string') {
              return new ResponseDTO(result);
            }

            const message = result && typeof result === 'object' && 'message' in result
              ? String(result.message)
              : 'Operação realizada com sucesso';

            const status = result && typeof result === 'object' && 'status' in result
              ? Number(result.status)
              : 200;

            return new ResponseDTO(message, result, status);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            const errorStatus = (error as any)?.status || 500;

            return ResponseDTO.error(errorMessage, errorStatus);
          }
        };
      });
    }
  }

  Object.getOwnPropertyNames(constructor)
    .filter(prop => prop !== 'prototype' && prop !== 'length' && prop !== 'name')
    .forEach(prop => {
      const descriptor = Object.getOwnPropertyDescriptor(constructor, prop);
      if (descriptor) {
        Object.defineProperty(RepositoryWrapper, prop, descriptor);
      }
    });

  return RepositoryWrapper as T;
}

/**
 * Decorator de método que transforma a resposta em um objeto ResponseDTO
 * Pode ser usado em métodos individuais como alternativa ao decorador @Repository
 */
export function ResponseWrapper() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      try {
        // Conectar ao MongoDB antes de executar o método
        await connectToDatabase();
        
        // Chamar o método original
        const result = await originalMethod.apply(this, args);
        
        // Se o resultado já for um ResponseDTO, retorná-lo diretamente
        if (result instanceof ResponseDTO) {
          return result;
        }
        
        // Se for um ErrorDTO, transformá-lo em um ResponseDTO de erro
        if (result && typeof result === 'object' && 'status' in result && result.status >= 400) {
          return ResponseDTO.error(result.message || 'Erro desconhecido', result.status);
        }
        
        // Para strings simples, assumir que é uma mensagem
        if (typeof result === 'string') {
          return new ResponseDTO(result);
        }
        
        // Para outros valores, encapsular em um ResponseDTO
        const message = result && typeof result === 'object' && 'message' in result 
          ? String(result.message) 
          : 'Operação realizada com sucesso';
        
        const status = result && typeof result === 'object' && 'status' in result 
          ? Number(result.status) 
          : 200;
        
        return new ResponseDTO(message, result, status);
      } catch (error) {
        // Em caso de erro, retornar um ResponseDTO de erro
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        const errorStatus = (error as any)?.status || 500;
        
        return ResponseDTO.error(errorMessage, errorStatus);
      }
    };
    
    return descriptor;
  };
}