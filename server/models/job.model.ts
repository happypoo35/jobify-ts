import { model, Schema, Types } from "mongoose";

export interface Job {
  _id: Types.ObjectId;
  company: string;
  position: string;
  status: "interview" | "declined" | "pending";
  jobType: "full-time" | "part-time" | "remote" | "internship";
  jobLocation: string;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Job>(
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true, versionKey: false }
);

const jobModel = model<Job>("Job", schema);

export default jobModel;
