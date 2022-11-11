import express from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  showStats,
  getJob,
} from "../controllers/job.controller";
import { checkPermissions, protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllJobs).post(createJob);
router.get("/stats", showStats);

router
  .route("/:jobId")
  .all(checkPermissions)
  .get(getJob)
  .patch(updateJob)
  .delete(deleteJob);

export default router;
