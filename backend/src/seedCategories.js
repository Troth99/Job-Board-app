import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "./models/Category.js"; 

dotenv.config();
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
  { name: "Media & Communication", shortName: "Media" }
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
