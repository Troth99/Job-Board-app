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

    if(categoryId) {
        filter.category = categoryId;
    }

    const jobs = await Jobs.find(filter)
     .populate("category", "name")
    .populate("company", "name");

    return jobs
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