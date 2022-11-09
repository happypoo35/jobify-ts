import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: {
        values: ["interview", "declined", "pending"],
        message: "Status should be either: pending, interview or declined",
      },
      default: "pending",
    },
    jobType: {
      type: String,
      enum: {
        values: ["full-time", "part-time", "remote", "internship"],
        message:
          "Job type should be either: full-time, part-time, remote or internship",
      },
      default: "full-time",
    },
    jobLocation: {
      type: String,
      required: [true, "Please provide job location"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Job = mongoose.model("Job", schema);

export default Job;
