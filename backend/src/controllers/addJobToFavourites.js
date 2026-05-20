import Job from "../models/Jobs.js";
import User from "../models/User.js";
import mongoose from "mongoose";


export const addJobToFavourites = async (req, res) => {
    try {
        const rawJobId = req.params.jobId;
        const jobId = (rawJobId || "").trim();
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid jobId" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isAlreadySaved = user.savedJobs.some(
            (savedJob) => savedJob.job && savedJob.job.toString() === jobId
        );


        if (isAlreadySaved) {

            const populatedUser = await User.findById(userId).populate('savedJobs.job');
            return res.status(200).json({ savedJobs: populatedUser.savedJobs });
        }
        user.savedJobs.push({ job: jobId, addedAt: new Date() });
        await user.save();

        const populatedUser = await User.findById(userId).populate('savedJobs.job');

        res.status(200).json({ savedJobs: populatedUser.savedJobs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const removeJobFromFavourites = async (req, res) => {
    try {
        const rawJobId = req.params.jobId;
        const jobId = (rawJobId || "").trim();
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid jobId" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isSaved = user.savedJobs.some(
            (savedJob) => savedJob.job && savedJob.job.toString() === jobId
        );

        if (!isSaved) {
            return res.status(200).json({
                message: "Job is not in favourites",
                savedJobs: user.savedJobs,
            });
        }

        user.savedJobs = user.savedJobs.filter(
            (savedJob) => savedJob.job && savedJob.job.toString() !== jobId
        );
        await user.save();

        const populatedUser = await User.findById(userId).populate('savedJobs.job');

        res.status(200).json({
            message: "Job removed from favourites",
            savedJobs: populatedUser.savedJobs,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getSavedJobs = async (req, res) => {

    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        //Find User and populate savedJobs with pagination
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //Sort the jobs by addedAt
        const sortedSavedJobs = [...user.savedJobs].sort(
            (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        );


        const totalFavourites = user.savedJobs.length;
        const totalPages = Math.ceil(totalFavourites / limit);

        //Get the paginated saved jobs for the user
        const paginatedSavedJobs = sortedSavedJobs.slice(skip, skip + limit);

        //Fill the job details for each saved job
        const populatedSavedJobs = await User.populate(paginatedSavedJobs, { path: "job" });


        res.json({
            savedJobs: populatedSavedJobs,
            totalFavourites,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error("Error in getFavouriteJobs:", error);

        res.status(500).json({ message: "Server error", error: error.message });

    }
}

