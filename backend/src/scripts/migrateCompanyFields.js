import "dotenv/config";
import mongoose from "mongoose";
import Company from "../models/Company.js";

async function run() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Полетата, които трябва да добавим
    const fieldsToAdd = {
      phone: "",
      email: "",
      officeLocation: "",
      sector: "",
      whyWorkHere: "",
    };

    console.log("\n🔄 Starting migration...\n");

    // За всяко поле, добави го ако липсва
    for (const [field, defaultValue] of Object.entries(fieldsToAdd)) {
      const result = await Company.updateMany(
        { [field]: { $exists: false } },
        { $set: { [field]: defaultValue } }
      );
      console.log(
        `✓ ${field}: matched=${result.matchedCount}, modified=${result.modifiedCount}`
      );
    }

    console.log("\n✅ Migration completed successfully!");
    console.log("All existing companies now have the new fields.\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

run();
