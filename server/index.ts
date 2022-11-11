import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as trpcExpress from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { appRouter } from "./routers/_app";
import { createContext } from "./trpc";

const app = express();
const port = 8000;

dotenv.config();

app.use(
  cors({
    // origin: [
    //   "http://localhost:8000",
    //   "http://192.168.50.139:3000",
    //   "http://127.0.0.1:5173/",
    // ],
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello from server");
// });

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    // onError({ error }) {
    //   console.log(error.cause);
    // },
  })
);

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
