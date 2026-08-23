import "dotenv/config";
import mongoose from "mongoose";

async function run() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const jobsCollection = mongoose.connection.collection("jobs");

    const result = await jobsCollection.updateMany(
      {
        $or: [{ skills: { $exists: false } }, { skills: null }],
      },
      {
        $set: { skills: [] },
      },
    );

    console.log(
      `Skills migration completed: matched=${result.matchedCount}, modified=${result.modifiedCount}`,
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Skills migration failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

run();