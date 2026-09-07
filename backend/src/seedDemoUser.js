import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const DEMO_EMAIL = process.env.DEMO_USER_EMAIL || "demo@jobboard.com";
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD || "Demo12345!";

const seedDemoUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Remove any previous demo account so re-running this script always resets it to a clean state.
    await User.deleteOne({ email: DEMO_EMAIL });

    await User.create({
      firstName: "Demo",
      lastName: "User",
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      isDemo: true,
    });

    console.log(`Demo user seeded successfully! (${DEMO_EMAIL})`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDemoUser();
