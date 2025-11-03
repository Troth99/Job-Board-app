import {Schema, Types, model} from "mongoose";


const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  logo: {
    type: String,
  },

  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

company: {
  type: Types.ObjectId,
  ref: "Company",
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Job", jobSchema);