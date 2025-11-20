import { Schema, model, Types } from "mongoose";

export const COMPANY_ROLES = ["owner", "admin", "recruiter", "viewer"]


const companyMemberSchema = new Schema(
  {
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: COMPANY_ROLES,
      required: true,
    },
    invitedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    invitedAt: {
      type: Date,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

companyMemberSchema.index({ companyId: 1, userId: 1 }, { unique: true });

export const CompanyMember = model("CompanyMember", companyMemberSchema);
