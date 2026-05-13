import { Schema, Types, model } from "mongoose";


const jobSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  salary: { type: String, trim: true },

  workMode: { 
    type: String, 
    default: "", 
    required: true 
  },

  category: { 
    type: Types.ObjectId, 
    ref: "Category", 
    required: true 
  },

  employmentType: { 
    type: String, 
    default: "Full-time", 
    required: true 
  },

  experienceRequirement: { 
    type: String,
     default: "",
      trim: true, 
      required: true 
    },

  requiredExperience: {
    type: String,
    default: "",
    trim: true,
    required: true
  },

  applicationDeadline: {
    type: Date
  },

  openPositions: {
    type: Number,
    default: 1,
    min: 1
  },

  contractkType: {
    type: String,
    default: "",
    trim: true,
  },
  
  workSchedule: {
    type: String,
    default: "",
    trim: true,
  },

  languageRequirements: {
    type: [String],
    default: [],
  },

  educationLevel: {
    type: String,
    default: "",
    trim: true,
    required: true
  },

  requirements: {
    type: [String],
    default: [],
    required: true
  },

  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  company: {
    type: Types.ObjectId,
    ref: "Company",
    required: true,
  },


  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },

  employmentType: {
    type: String,
    default: "Full-time",
  },

  benefits: [{ type: String }],

  email: {
    type: String,
  },

  views: { type: Number, default: 0 },

  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default model("Job", jobSchema);
