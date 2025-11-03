import { createJobService, getJobById } from "../services/jobService.js";


export const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      createdBy: req.user._id,
    };

    if (req.user.company) {
      jobData.company = req.user.company;
    }

    const job = await createJobService(jobData);
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};


export const getJobByIdController = async (req, res) => {
  try {

    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await getJobById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {

    if (error.message === 'Invalid job ID format') {
      return res.status(400).json({ message: "Invalid job ID format" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
