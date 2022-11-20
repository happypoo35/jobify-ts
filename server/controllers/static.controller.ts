import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export const mainPage = async (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
};
