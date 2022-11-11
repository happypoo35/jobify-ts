import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import express from "express";
import "express-async-errors";

import userRouter from "./routes/user.route";
import { errorHandler, notFound } from "./errors/error.middleware";

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

// Errors
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
