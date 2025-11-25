import { CompanyMember } from "../models/CompanyMember.js";
import Jobs from "../models/Jobs.js";
import { createJobService, getAllJobs, getJobById, getRecentJobs } from "../services/jobService.js";
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


    if (!mongoose.Types.ObjectId.isValid(jobId)) {

      return res.status(400).json({ message: "Invalid job ID format" });
    }
    const job = await getJobById(jobId);


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

    const companyId = req.query.company.trim();

    if (!mongoose.isValidObjectId(companyId)) {
      return res.status(400).json({ message: "Invalid company ID." });
    }

    filter.company = companyId;

    const jobs = await Jobs.find(filter).populate("company");
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getRecentJobsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "5", 10);
    console.log("Limit received:", limit);

    const jobs = await getRecentJobs(limit);
    console.log("Jobs from service:", jobs);

    res.json({ jobs });
  } catch (error) {
    console.error("Error in getRecentJobsController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateJobController = async (req, res) => {
  const { id } = req.params;  
  const jobData = req.body;  

  try {
 
    const job = await Jobs.findById(id);
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