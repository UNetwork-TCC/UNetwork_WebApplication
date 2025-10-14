/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Container de injeção de dependência
class Container {
  private static instance: Container;
  private dependencies: Map<string, any> = new Map();
  
  // Singleton
  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
  
  // Registrar uma dependência
  public register<T>(key: string, instance: T): void {
    this.dependencies.set(key, instance);
  }
  
  // Registrar uma dependência como singleton
  public registerSingleton<T>(key: string, classConstructor: new (...args: any[]) => T): void {
    const instance = new classConstructor();
    this.dependencies.set(key, instance);
  }
  
  // Registrar uma dependência como factory
  public registerFactory<T>(key: string, factory: () => T): void {
    this.dependencies.set(key, factory);
  }
  
  // Resolver uma dependência
  public resolve<T>(key: string): T {
    const dependency = this.dependencies.get(key);
    
    if (!dependency) {
      throw new Error(`Dependência não encontrada: ${key}`);
    }
    
    // Se a dependência for uma função e não for um construtor, executá-la
    if (typeof dependency === 'function' && !dependency.prototype) {
      return dependency();
    }
    
    return dependency;
  }
  
  // Resolver automaticamente dependências pelo tipo
  public resolveClass<T>(classConstructor: new (...args: any[]) => T): T {
    // Verificar se já temos uma instância registrada pelo nome da classe
    const className = classConstructor.name;
    
    if (this.dependencies.has(className)) {
      return this.dependencies.get(className);
    }
    
    // Se não encontrou pelo nome, procura por tipo na coleção de dependências
    for (const [, dependency] of this.dependencies) {
      if (dependency instanceof classConstructor) {
        return dependency;
      }
    }
    
    // Se não encontrou, cria uma nova instância
    const instance = new classConstructor();
    
    // Registra para uso futuro
    this.dependencies.set(className, instance);
    
    return instance;
  }
  
  // Limpar todas as dependências
  public clear(): void {
    this.dependencies.clear();
  }
}

// Decorador para injetar dependências
export function Inject(key: string) {
  return function(target: any, propertyKey: string) {
    // Definir um getter que resolverá a dependência quando acessada
    Object.defineProperty(target, propertyKey, {
      get: function() {
        return Container.getInstance().resolve(key);
      },
      enumerable: true,
      configurable: true
    });
  };
}

// Decorador para injetar dependências pelo tipo
export function InjectRepository(repositoryClass: any) {
  return function(target: any, propertyKey: string) {
    // Definir um getter que resolverá a dependência quando acessada
    Object.defineProperty(target, propertyKey, {
      get: function() {
        try {
          return Container.getInstance().resolveClass(repositoryClass);
        } catch (error) {
          // Se não encontrou, cria uma nova instância
          const instance = new repositoryClass();
          
          // Registra para uso futuro
          Container.getInstance().register(repositoryClass.name, instance);
          
          return instance;
        }
      },
      enumerable: true,
      configurable: true
    });
  };
}

// Função auxiliar para registrar uma dependência
export function register<T>(key: string, instance: T): void {
  Container.getInstance().register(key, instance);
}

// Função auxiliar para registrar uma dependência como singleton
export function registerSingleton<T>(key: string, classConstructor: new (...args: any[]) => T): void {
  Container.getInstance().registerSingleton(key, classConstructor);
}

// Inicializar repositories automaticamente
export function initializeRepositories(repositories: any[]): void {
  repositories.forEach(repository => {
    registerSingleton(repository.name, repository);
  });
}

// Exportar o container para uso avançado
export const DI = Container.getInstance();
