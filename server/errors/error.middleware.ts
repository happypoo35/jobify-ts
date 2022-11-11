import { NextFunction, Request, Response } from "express";
import ApiError from "./custom.error.js";

interface ErrorObj {
  code: number;
  msg: string;
  errors?: Record<string, any>;
  _error?: any;
  _stack?: string;
}

export const notFound = () => {
  throw new ApiError("Route does not exist", 404);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ErrorObj = {
    code: err.code || 500,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.name === "ValidationError") {
    error.code = 400;
    error.msg = err._message;
    error.errors = Object.keys(err.errors).map((el) => ({
      key: el,
      msg: err.errors[el].message,
    }));
  }
  if (err.code === 11000) {
    error.code = 400;
    error.msg = "Duplicate key error";
    error.errors = Object.keys(err.keyValue).map((el) => ({
      key: el,
      msg: `User with this ${el} already exists`,
    }));
  }
  if (err.name === "CastError") {
    error.code = 400;
    error.msg = `Invalid ${err.path}: ${err.value}`;
  }
  if (process.env.NODE_ENV === "development") {
    error._error = err;
    error._stack = err.stack;
  }

  res.status(error.code).json(error);
};
