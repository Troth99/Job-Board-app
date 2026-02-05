import { Schema, Types, model } from "mongoose";

const notificationSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  actionRequired: {
    type: Boolean,
    default: false,
  },
  actionType: {
    type: String,
  },
  link: {
    type: String,
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

export default model("Notifications", notificationSchema);