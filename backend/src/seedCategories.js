import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "./models/Category.js"; 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log(process.env.MONGO_URI);

const categories = [
  { name: "Information Technology", shortName: "IT" },
  { name: "Finance & Accounting", shortName: "Finance" },
  { name: "Marketing & Advertising", shortName: "Marketing" },
  { name: "Human Resources", shortName: "HR" },
  { name: "Design & Creative", shortName: "Design" },
  { name: "Sales & Business Development", shortName: "Sales" },
  { name: "Customer Support", shortName: "Support" },
  { name: "Operations & Logistics", shortName: "Operations" },
  { name: "Education & Training", shortName: "Education" },
  { name: "Legal & Compliance", shortName: "Legal" },
  { name: "Healthcare & Medical", shortName: "Healthcare" },
  { name: "Engineering & Manufacturing", shortName: "Engineering" },
  { name: "Science & Research", shortName: "Research" },
  { name: "Consulting & Strategy", shortName: "Consulting" },
  { name: "Media & Communication", shortName: "Media" },
  { name: "Data Science & Analytics", shortName: "Data Science" },
  { name: "Retail & E-commerce", shortName: "Retail" },
  { name: "Hospitality & Tourism", shortName: "Hospitality" },
  { name: "Real Estate & Property", shortName: "Real Estate" },
  { name: "Food & Beverage", shortName: "F&B" },
  { name: "Transportation & Delivery", shortName: "Transport" },
  { name: "Non-Profit & NGO", shortName: "Non-Profit" }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("Categories seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCategories();
