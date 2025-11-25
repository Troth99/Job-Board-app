import { Schema, Types, model } from "mongoose";


const jobSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  salary: { type: String, trim: true },
  logo: { type: String },

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

  applicationDeadline: { type: Date },

  tags: [{ type: String }],

  skills: [{type: String}],

  email: {
    type: String,
  },

  views: { type: Number, default: 0 },

  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default model("Job", jobSchema);
