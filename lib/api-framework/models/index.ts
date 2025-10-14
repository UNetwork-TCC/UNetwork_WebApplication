import { HttpHandler } from '../interfaces';

export class BaseController {
  GET!: HttpHandler;
  POST!: HttpHandler;
  PUT!: HttpHandler;
  DELETE!: HttpHandler;
  PATCH!: HttpHandler;

  getHandlers() {
    return {
      GET: this.GET,
      POST: this.POST,
      PUT: this.PUT,
      DELETE: this.DELETE,
      PATCH: this.PATCH
    };
  }
}

export class ResponseDTO<T> {
  message: string;
  data?: T;
  status: number;
  
  constructor(message: string, data?: T, status?: number) {
    this.message = message;
    this.data = data;
    this.status = status || 200;
  }

  static error(message: string, status?: number) {
    return new ErrorDTO(message, status);
  }
}

export class ErrorDTO {
  message: string;
  status: number;
  
  constructor(message: string, status?: number) {
    this.message = message;
    this.status = status || 500;
  }
}
