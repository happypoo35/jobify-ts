import jwt from "jsonwebtoken";
import ApiError from "../errors/custom.error.js";
import userModel from "../models/user.model.js";
import Job from "../models/job.model.js";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser, Token } from "../types.js";

// Middleware
export const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError("Unauthorized. Please log in to gain access", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      throw new ApiError(
        "The user belonging to this token no longer exists",
        401
      );
    }

    user.refreshJWT(req, res);
    req.user = user;

    next();
  } catch (err) {
    throw new ApiError("Token expired. Please log in to gain access", 401);
  }
};

export const checkPermissions = async (
  req: RequestWithUser,
  next: NextFunction
) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(`No job with id ${jobId}`, 404);
  }

  if (req.user._id.toString() !== job.createdBy.toString()) {
    throw new ApiError("Not authorized to access this route", 401);
  }

  next();
};

// Routes
export const getUser = async (req: RequestWithUser, res: Response) => {
  const user = await userModel.findById(req.user._id);

  res.status(200).json({ user });
};

export const register = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;
  const user = await userModel.create({ name, email, password });

  user.createAndSendJWT(user, req, res, 201);
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    throw new ApiError("Please provide email and password", 400);
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError("Invalid username or password", 401);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError("Invalid username or password", 401);
  }

  user.createAndSendJWT(user, req, res, 200);
};

export const updateUser = async (req: RequestWithUser, res: Response) => {
  const { name, lastName, email, location } = req.body;

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      name,
      lastName,
      email,
      location,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ user });
};

export const logout = (req: Request, res: Response) => {
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";

  res.cookie("token", "", {
    maxAge: 0,
    secure,
    httpOnly: true,
  });

  res.status(204).json({ msg: "Logged out" });
};
