import { Schema, Types, model } from "mongoose";


const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    industry: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    foundedYear: {
      type: Number,
    },
    members: [
      { 
      type: Types.ObjectId, 
      ref: "User" }
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Company = model('Company', companySchema)