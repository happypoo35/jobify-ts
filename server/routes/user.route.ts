import express from "express";
import {
  register,
  login,
  updateUser,
  getUser,
  logout,
  deleteUser,
} from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";
import apiLimiter from "../middlewares/limiter.middleware";

const router = express.Router();

router.post("/login", apiLimiter(), login);
router.post("/register", apiLimiter(), register);

router.use(protect);

router.delete("/delete", deleteUser);
router.route("/").get(getUser).patch(updateUser).delete(logout);

export default router;
