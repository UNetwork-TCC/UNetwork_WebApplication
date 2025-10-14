/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { BaseController } from "../models";
import { createNextRouteHandler } from "../decorators";

interface HttpMethods {
  GET: Function
  POST: Function
  DELETE: Function
  PATCH: Function
  PUT: Function
}

function extractHttpMethods<T = BaseController>(controller: T): HttpMethods {
  return controller as unknown as HttpMethods;
}

/**
 * Cria handlers específicos para o Next.js App Router que processam corretamente middlewares
 * @param ControllerClass A classe do controller decorada
 * @returns Um objeto com os handlers HTTP prontos para exportação
 */
export function createNextRouteHandlers<T extends new (...args: any[]) => any>(
  ControllerClass: T
): HttpMethods {
  return {
    GET: createNextRouteHandler(ControllerClass, 'get', 'Get'),
    POST: createNextRouteHandler(ControllerClass, 'post', 'Post'),
    DELETE: createNextRouteHandler(ControllerClass, 'delete', 'Delete'),
    PATCH: createNextRouteHandler(ControllerClass, 'patch', 'Patch'),
    PUT: createNextRouteHandler(ControllerClass, 'put', 'Put')
  };
}

export default extractHttpMethods;
