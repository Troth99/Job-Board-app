import { CompanyMember } from "../models/CompanyMember.js";
import Jobs from "../models/Jobs.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";
import { createJobService, getJobById, getJobsByCategoryName, getRecentJobs } from "../services/jobService.js";

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
    const jobId = req.params.id.trim();
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;


    if (req.query.company) {

      const companyId = req.query.company.trim();

      if (!mongoose.isValidObjectId(companyId)) {
        return res.status(400).json({ message: "Invalid company ID." });
      }

      filter.company = companyId;
    }

    const jobs = await Jobs.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("company")
      .populate('createdBy', 'firstName lastName email');

    const totalJobs = await Jobs.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / limit);
    console.log("Fetched jobs:", jobs);
    res.json({ jobs, totalJobs, totalPages, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getRecentJobsController = async (req, res) => {
  try {

    const limit = parseInt(req.query.limit || "10", 10);
    const jobs = await getRecentJobs(limit);

    res.json({ jobs })
  } catch (error) {
    console.error("Error in getRecentJobsController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMostRecentJobsByCompanyController = async (req, res) => {

  try {
    const companyId = req.params.companyId.trim();

    if (!mongoose.isValidObjectId(companyId)) {
      return res.status(400).json({ message: "Invalid company ID." });
    }

    const recentJobs = await Jobs.find({ company: companyId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("company")
      .populate('createdBy', 'firstName lastName email');

    res.status(200).json({ recentJobs });
  }
  catch (error) {
    console.error("Error in getMostRecentJobsByCompanyController:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const updateJobController = async (req, res) => {
  const { id } = req.params;
  const jobData = { ...req.body };

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const job = await Jobs.findById(id).populate('category')
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Normalize category payload: accepts object, ObjectId string, or category name.
    if (jobData.category) {
      if (typeof jobData.category === "object") {
        jobData.category = jobData.category._id || jobData.category.id;
      }

      if (typeof jobData.category === "string") {
        const trimmedCategory = jobData.category.trim();
        if (trimmedCategory.length > 0) {
          if (mongoose.Types.ObjectId.isValid(trimmedCategory)) {
            jobData.category = trimmedCategory;
          } else {
            let category = await Category.findOne({ name: trimmedCategory });
            if (!category) {
              category = await Category.create({
                name: trimmedCategory,
                shortName: trimmedCategory.toLowerCase().replace(/\s+/g, "-"),
              });
            }
            jobData.category = category._id;
          }
        }
      }
    }

    if (jobData.applicationDeadline === "") {
      jobData.applicationDeadline = undefined;
    }

    // Prevent sensitive ownership fields from being overwritten.
    delete jobData.createdBy;
    delete jobData.company;


    Object.assign(job, jobData);


    await job.save();

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to update job", error: error.message });
  }
};


export const getJobsByCategoryController = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const { categoryName } = req.params;

    const decodedCategoryName = decodeURIComponent(categoryName);

    const { jobs, totalCount } = await getJobsByCategoryName(decodedCategoryName, skip, limit);

    res.status(200).json({ jobs, totalCount });
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
export const getCalendarEventsForJobsController = async (req, res) => {
  try {
    const companyId = req.params.companyId.trim();
    const { startDate, endDate } = req.query;

    if (!companyId || !startDate || !endDate) {
      return res.status(400).json({ message: "Company ID, startDate, and endDate are required." });
    };

    const deadlineFilter = { $ne: null };

    //Validate and parse the inputs
    if (startDate) {
      const paredStartDate = new Date(startDate);
      if (Number.isNaN(paredStartDate.getTime())) {
        return res.status(400).json({ message: "Invalid startDate format. Use ISO string." });
      }
      deadlineFilter.$gte = paredStartDate;
    }

    if (endDate) {
      const paredEndDate = new Date(endDate);
      if (Number.isNaN(paredEndDate.getTime())) {
        return res.status(400).json({ message: "Invalid endDate format. Use ISO string." });
      }
      deadlineFilter.$lte = paredEndDate;
    }

    // Find jobs for the company with application deadlines within the specified range
    const jobs = await Jobs.find({
      company: companyId,
      applicationDeadline: deadlineFilter,
    }).select("_id title applicationDeadline location company isActive")
      .sort({ applicationDeadline: 1 });

      //Map jobs to callendar format
    const events = jobs.map((job) => ({
      id: job._id.toString(),
      title: "Deadline: " + job.title,
      date: job.applicationDeadline,
      allDay: true,
      extendedProps: {
        jobId: job._id.toString(),
        companyId: job.company?.toString(),
        location: job.location,
        isActive: job.isActive,
      },
    }));

    res.status(200).json({ events, total: events.length });
  } catch (error) {
    console.error("Error in getCalendarEventsForJobsController:", error);
    res.status(500).json({ message: "Server error" });
  }
}