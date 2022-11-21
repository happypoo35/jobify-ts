import express from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  showStats,
  getJob,
  createMockJobs,
} from "../controllers/job.controller";
import { checkPermissions, protect } from "../middlewares/auth.middleware";
import apiLimiter from "../middlewares/limiter.middleware";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllJobs).post(apiLimiter(24), createJob);
router.get("/stats", showStats);
router.post("/add-mock-jobs", createMockJobs);

router
  .route("/:jobId")
  .all(checkPermissions)
  .get(getJob)
  .patch(updateJob)
  .delete(deleteJob);

export default router;
