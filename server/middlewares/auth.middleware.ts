import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/custom.error";
import jobModel from "../models/job.model";
import userModel from "../models/user.model";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token }: { token: string | undefined } = req.cookies;

  if (!token)
    throw new ApiError("Unauthorized. Please log in to gain access", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") throw new ApiError("Invalid token", 401);

    const user = await userModel.findById(decoded.userId);

    if (!user)
      throw new ApiError(
        "The user belonging to this token no longer exists",
        401
      );

    user.refreshJWT(req, res);
    req.user = user;

    next();
  } catch (err) {
    throw new ApiError("Token expired. Please log in to gain access", 401);
  }
};

export const checkPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jobId } = req.params;
  const job = await jobModel.findById(jobId);

  if (!job) throw new ApiError(`No job with id ${jobId}`, 404);

  if (req.user._id.toString() !== job.createdBy.toString())
    throw new ApiError("Not authorized to access this route", 401);

  next();
};
