import { Request } from "express";
import type { User } from "./models/user.model";

export interface RequestWithUser extends Request {
  user: User;
}

export interface Token {
  userId: string;
  iat: number;
  exp: number;
}
