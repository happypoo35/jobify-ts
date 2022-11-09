import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./routers/_app";
import mongoose from "mongoose";
// import { createContext } from "./trpc";

const app = express();
const port = 8000;

dotenv.config();

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello from server");
// });

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    // createContext,
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
