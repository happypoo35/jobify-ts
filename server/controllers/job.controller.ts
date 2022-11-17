import { Request, Response } from "express";
import jobModel from "../models/job.model";

interface QueryObj<T, K> {
  [key: string]: T | K;
}

export const createJob = async (req: Request, res: Response) => {
  req.body.createdBy = req.user._id;
  const job = await jobModel.create(req.body);

  res.status(201).json(job);
};

export const getAllJobs = async (req: Request, res: Response) => {
  const { search, status, jobType, sort } = req.query;

  const queryObj: QueryObj<typeof req.user._id, typeof req.query[0]> = {
    createdBy: req.user._id,
  };

  if (status) queryObj.status = status;
  if (jobType) queryObj.jobType = jobType;
  if (search) queryObj.position = { $regex: search, $options: "i" };

  let result = jobModel.find(queryObj);

  switch (sort) {
    case "oldest":
      result = result.sort("createdAt");
      break;
    case "a-z":
      result = result.sort("position");
      break;
    case "z-a":
      result = result.sort("-position");
      break;
    default:
      result = result.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const jobs = await result.skip(skip).limit(limit);
  const nHits = await jobModel.countDocuments(queryObj);
  const nPages = Math.ceil(nHits / limit);

  res.status(200).json({ nHits, nPages, page, limit, jobs });
};

export const getJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = await jobModel.findById(jobId);

  res.status(200).json(job);
};

export const updateJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = await jobModel.findByIdAndUpdate(jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(job);
};

export const deleteJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  await jobModel.findByIdAndDelete(jobId, req.body);

  res.status(204).json({ msg: "Job deleted" });
};

export const showStats = async (req: Request, res: Response) => {
  let stats = await jobModel.aggregate([
    { $match: { createdBy: req.user._id } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, el) => {
    const { _id, count } = el;
    acc[_id] = count;
    return acc;
  }, {});

  let monthlyApplications = await jobModel.aggregate([
    { $match: { createdBy: req.user._id } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((el) => {
      const {
        _id: { year, month },
        count,
      } = el;
      const date = new Date(`${month}.01.${year}`).toLocaleString("en-EN", {
        year: "numeric",
        month: "short",
      });
      return { date, count };
    })
    .reverse();

  res.status(200).json({ stats, monthlyApplications });
};
