import type { User } from "./models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: string;
      readonly PORT: string;
      readonly JWT_SECRET: string;
      readonly JWT_LIFETIME: string;
      readonly MONGO_URI: string;
    }
  }
}
