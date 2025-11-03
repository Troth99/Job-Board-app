import Jobs from "../models/Jobs.js"
import mongoose from "mongoose";


export const createJobService = async (jobData) => {
    const job = await Jobs.create(jobData)
    return job;
};



export const getAllJobs = async (filters = {}) => {
    const jobs = await Jobs.find(filters).populate('createBy', 'name email role')
    return jobs;
}

export const getJobById = async (jobId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    throw new Error('Invalid job ID format');
  }
  const job = await Jobs.findById(jobId).populate("createdBy", "name email role");
  return job;
};

export const updateJob = async (req, res) => {
    try {
        const job = await updateJobService(req.params.id, req.body, req.user._id);
        if (!job) return res.status(404).json({ message: "Job not found or not authorized" });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};