import Jobs from "../models/Jobs.js";
import User from "../models/User.js";
import Company from "../models/Company.js";


export const getStats = async (req, res) => {

      
    try {
        const jobsCount = await Jobs.countDocuments();
        const usersCount = await User.countDocuments();
        const companiesCount = await Company.countDocuments();

        res.status(200).json({ jobsCount, usersCount, companiesCount });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

