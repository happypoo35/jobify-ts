import { NextFunction, Request, Response } from "express";
import Job from "../models/job.model.js";

export const createJob = async (req: Request, res: Response) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);

  res.status(201).json(job);
};

export const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObj = {
    createdBy: req.user._id,
  };

  if (status) {
    queryObj.status = status;
  }
  if (jobType) {
    queryObj.jobType = jobType;
  }
  if (search) {
    queryObj.position = { $regex: search, $options: "i" };
  }

  let result = Job.find(queryObj);

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

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 12;
  const skip = (page - 1) * limit;

  const jobs = await result.skip(skip).limit(limit);
  const nHits = await Job.countDocuments(queryObj);
  const nPages = Math.ceil(nHits / limit);

  res.status(200).json({ nHits, nPages, jobs });
};

export const getJob = async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  res.status(200).json(job);
};

export const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findByIdAndUpdate(jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(job);
};

export const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  await Job.findByIdAndDelete(jobId, req.body);

  res.status(204).json({ msg: "Job deleted" });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: req.user._id } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, el) => {
    const { _id, count } = el;
    acc[_id] = count;
    return acc;
  }, {});

  let monthlyApplications = await Job.aggregate([
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
