import {Schema, model} from "mongoose";
[
  { "name": "Information Technology", "shortName": "IT" },
  { "name": "Finance & Accounting", "shortName": "Finance" },
  { "name": "Marketing & Advertising", "shortName": "Marketing" },
  { "name": "Human Resources", "shortName": "HR" },
  { "name": "Design & Creative", "shortName": "Design" },
  { "name": "Sales & Business Development", "shortName": "Sales" },
  { "name": "Customer Support", "shortName": "Support" },
  { "name": "Operations & Logistics", "shortName": "Operations" },
  { "name": "Education & Training", "shortName": "Education" },
  { "name": "Legal & Compliance", "shortName": "Legal" },
  { "name": "Healthcare & Medical", "shortName": "Healthcare" },
  { "name": "Engineering & Manufacturing", "shortName": "Engineering" },
  { "name": "Science & Research", "shortName": "Research" },
  { "name": "Consulting & Strategy", "shortName": "Consulting" },
  { "name": "Media & Communication", "shortName": "Media" }
]

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required!'],
        trim: true,
    },
    shortName: {
        type: String,
        required: [true, 'Short name is required!'],
        trim: true,
    },
});
export default model('Category', categorySchema)