import { CompanyMember } from "../models/CompanyMember.js";
import Jobs from "../models/Jobs.js";
import { createJobService, getJobById, getJobsByCategoryName, getRecentJobs } from "../services/jobService.js";
import mongoose, { Types } from "mongoose";



export const createJob = async (req, res) => {
  try {
    const userId = req.user._id;


    const membership = await CompanyMember.findOne({ userId });
    if (!membership) {
      return res.status(403).json({ message: "You must belong to a company to post a job." });
    }

    const companyId = membership.companyId;

    const jobData = {
      ...req.body,
      createdBy: userId,
      company: companyId,
    };

    const job = await createJobService(jobData);


    const populatedJob = await Jobs.findById(job._id).populate("company");

    res.status(201).json(populatedJob);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to create job.",
    });
  }
};

export const getJobByIdController = async (req, res) => {
  try {
    const  jobId  = req.params.id.trim();
if (!jobId) {
  return res.status(400).json({ message: "Job ID is required" });
}

    if (!mongoose.Types.ObjectId.isValid(jobId)) {

      return res.status(400).json({ message: "Invalid job ID format" });
    }
    const job = await getJobById(jobId)


    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllJobsController = async (req, res) => {
  try {
    const filter = {};

    if (req.query.company) {
 
      const companyId = req.query.company.trim();  

      if (!mongoose.isValidObjectId(companyId)) {
        return res.status(400).json({ message: "Invalid company ID." });
      }

      filter.company = companyId;
    }

    const jobs = await Jobs.find(filter).populate("company").populate('createdBy', 'firstName lastName email');
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getRecentJobsController = async (req, res) => {
  try {

    const limit = parseInt(req.query.limit || "10", 10);
    const jobs = await getRecentJobs(limit);

    res.json({jobs})
  } catch (error) {
    console.error("Error in getRecentJobsController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateJobController = async (req, res) => {
  const { id } = req.params;  
  const jobData = req.body;  

  try {
 
    const job = await Jobs.findById(id).populate('category')
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

   
    Object.assign(job, jobData);  

   
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update job", error: error.message });
  }
};


export const getJobsByCategoryController = async  (req, res) => {
  try {
    const {categoryName}  = req.params;

    const decodedCategoryName = decodeURIComponent(categoryName);

    const jobs = await getJobsByCategoryName(decodedCategoryName);
    res.status(200).json(jobs)
  } catch (error) {
     console.error("Error in getJobsByCategoryController:", error);
    res.status(400).json({ message: error.message });
  }
}

export const deleteJobController = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};