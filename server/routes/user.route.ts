import express from "express";
import rateLimiter from "express-rate-limit";
import {
  register,
  login,
  updateUser,
  getUser,
  logout,
  protect,
} from "../controllers/user.controller";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Too many requests from this IP address, please try again in 15 minutes",
});

const router = express.Router();

router.post("/login", apiLimiter, login);
router.post("/register", apiLimiter, register);

router.use(protect);

router.route("/").get(getUser).patch(updateUser).delete(logout);

export default router;
