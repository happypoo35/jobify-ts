import ApiError from "../errors/custom.error";
import userModel from "../models/user.model";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
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
  if (!user) throw new ApiError("Invalid username or password", 401);

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new ApiError("Invalid username or password", 401);

  user.createAndSendJWT(user, req, res, 200);
};

export const updateUser = async (req: Request, res: Response) => {
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
