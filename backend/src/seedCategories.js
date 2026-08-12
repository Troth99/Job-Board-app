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
  { name: "Information Technology", bgName: "Информационни технологии", shortName: "IT" },
  { name: "Finance & Accounting", bgName: "Финанси и счетоводство", shortName: "Finance" },
  { name: "Marketing & Advertising", bgName: "Маркетинг и реклама", shortName: "Marketing" },
  { name: "Human Resources", bgName: "Човешки ресурси", shortName: "HR" },
  { name: "Design & Creative", bgName: "Дизайн и креативни дейности", shortName: "Design" },
  { name: "Sales & Business Development", bgName: "Продажби и бизнес развитие", shortName: "Sales" },
  { name: "Customer Support", bgName: "Обслужване на клиенти", shortName: "Support" },
  { name: "Operations & Logistics", bgName: "Операции и логистика", shortName: "Operations" },
  { name: "Education & Training", bgName: "Образование и обучение", shortName: "Education" },
  { name: "Legal & Compliance", bgName: "Право и съответствие", shortName: "Legal" },
  { name: "Healthcare & Medical", bgName: "Здравеопазване и медицина", shortName: "Healthcare" },
  { name: "Engineering & Manufacturing", bgName: "Инженерство и производство", shortName: "Engineering" },
  { name: "Science & Research", bgName: "Наука и изследвания", shortName: "Research" },
  { name: "Consulting & Strategy", bgName: "Консултиране и стратегия", shortName: "Consulting" },
  { name: "Media & Communication", bgName: "Медии и комуникация", shortName: "Media" },
  { name: "Data Science & Analytics", bgName: "Данни и анализи", shortName: "Data Science" },
  { name: "Retail & E-commerce", bgName: "Търговия и електронна търговия", shortName: "Retail" },
  { name: "Hospitality & Tourism", bgName: "Хотелиерство и туризъм", shortName: "Hospitality" },
  { name: "Real Estate & Property", bgName: "Недвижими имоти", shortName: "Real Estate" },
  { name: "Food & Beverage", bgName: "Храни и напитки", shortName: "F&B" },
  { name: "Transportation & Delivery", bgName: "Транспорт и доставки", shortName: "Transport" },
  { name: "Non-Profit & NGO", bgName: "НПО и неправителствен сектор", shortName: "Non-Profit" }
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
