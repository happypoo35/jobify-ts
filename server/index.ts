import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import express, { Request, Response } from "express";
import "express-async-errors";

import userRouter from "./routes/user.route";
import jobRouter from "./routes/job.route";
import { errorHandler, notFound } from "./middlewares/error.middleware";

const app = express();
const staticPath =
  process.env.NODE_ENV === "production" ? "../client" : "../client/dist";

app.use(compression());
app.use(express.static(path.resolve(__dirname, staticPath)));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, staticPath, "index.html"));
});

// Errors
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
