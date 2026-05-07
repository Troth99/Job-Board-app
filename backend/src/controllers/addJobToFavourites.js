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
            (savedJobId) => savedJobId.toString() === jobId
        );

        if (isAlreadySaved) {
            return res.status(200).json({
                message: "Job already added to favourites",
                savedJobs: user.savedJobs,
            });
        }

        user.savedJobs.push(jobId);
        await user.save();

        res.status(200).json({
            message: "Job added to favourites",
            savedJobs: user.savedJobs,
        });

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
            (savedJobId) => savedJobId.toString() === jobId
        );

        if (!isSaved) {
            return res.status(200).json({
                message: "Job is not in favourites",
                savedJobs: user.savedJobs,
            });
        }

        user.savedJobs = user.savedJobs.filter(
            (savedJobId) => savedJobId.toString() !== jobId
        );
        await user.save();

        res.status(200).json({
            message: "Job removed from favourites",
            savedJobs: user.savedJobs,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getSavedJobs = async (req, res) => {
    //Todo
}