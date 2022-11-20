import express from "express";
import { mainPage } from "../controllers/static.controller";

const router = express.Router();

router.get("/", mainPage);

export default router;
