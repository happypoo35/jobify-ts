import { Model, Schema, Document, Types, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export interface UserInput {
  name: string;
  email: string;
  password: string;
  lastName?: string;
  location?: string;
}

interface UserDocument extends UserInput, UserMethods, Document {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserMethods {
  createJWT(this: UserDocument): string;
  refreshJWT(user: UserDocument, req: Request, res: Response): void;
  createAndSendJWT(user: UserDocument, req: Request, res: Response): void;
  comparePassword(
    this: UserDocument,
    candidatePassword: string
  ): Promise<boolean>;
}

type UserModel = Model<UserInput, {}, UserMethods>;

const schema = new Schema<UserInput, UserModel, UserMethods>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: [validator.isEmail, "Please provide valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
    lastName: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    location: {
      type: String,
      maxlength: 20,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

schema.methods.refreshJWT = function (user, req, res) {
  const token = user.createJWT();
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
};

schema.methods.createAndSendJWT = function (user, req, res) {
  user.refreshJWT(user, req, res);
  // user.password = undefined;

  // res.status(code).json({ user });
};

schema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = model("User", schema);

export default User;
