declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_URL: string;
      JWT_SECRET: string;
      NEXT_PUBLIC_GOOGLE_API_KEY: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_SECRET_KEY: string;
      NEXT_PUBLIC_REDUX_PERSIST_STORE_KEY: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_NODE_ENV: string
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}