import Category from "../models/Category.js";
import Jobs from "../models/Jobs.js"
import mongoose from "mongoose";


export const createJobService = async (jobData) => {

    if (jobData.category) {
        let category = await Category.findOne({ name: jobData.category });

        if (!category) {
            category = await Category.create({
                name: jobData.category,
                shortName: jobData.category.toLowerCase().replace(/\s+/g, '-')
            });
        }
        jobData.category = category._id
    }
    const job = await Jobs.create(jobData)

    return job;
};



export const getAllJobs = async (categoryId) => {
    const filter = {};

    if (categoryId) {
        filter.category = categoryId;
    }

    const jobs = await Jobs.find(filter)
        .populate("category", "name")
        .populate("company", "name");

    return jobs
}


export const getJobById = async (jobId) => {
  try {
   

    const job = await Jobs.findById(jobId).populate("createdBy", "name email role").populate('category', 'name shortName');  

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
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

export const getRecentJobs = async (limit = 5) => {
  try {
    const jobs = await Jobs.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("company", "name logo website")
      .populate("category", "name")
       .populate("createdBy", "firstName lastName")
      .lean();

    return jobs
  } catch (error) {
    console.error("Error in getRecentJobs service:", error);
    return [];
  }
};