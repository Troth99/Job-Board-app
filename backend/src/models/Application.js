import { Schema, Types, model } from "mongoose";

const applicationSchema = new Schema({
  jobId: {
    type: Types.ObjectId,
    ref: "Jobs",
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true, 
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  cv: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["new", "reviewed", "rejected", "accepted"],
    default: "new",
  },
});

export default model("Application", applicationSchema);