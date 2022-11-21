import rateLimiter from "express-rate-limit";

const apiLimiter = (max = 10, delay = 15) =>
  rateLimiter({
    windowMs: delay * 60 * 1000,
    max,
    message:
      "Too many requests from this IP address, please try again in 15 minutes",
  });

export default apiLimiter;
