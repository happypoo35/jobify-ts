export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
      MONGO_URI: string;
    }
  }
}
