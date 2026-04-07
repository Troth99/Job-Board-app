import { Types } from "mongoose";
import { Company } from "../models/Company.js";
import { createCompanyService, getCompaniesService, getCompanyByIdService } from "../services/companyService.js"
import { CompanyMember } from "../models/CompanyMember.js";
import Jobs from "../models/Jobs.js";
import Application from "../models/Application.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";



export const createCompanyController = async (req, res) => {

  try {
    const userId = req.user._id
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: no user found in request" });
    }
    const companyData = {
      ...req.body,
      createdBy: userId,
      members: [userId],
    }


    const company = await createCompanyService(companyData);
    await User.findByIdAndUpdate(userId, { $set: { company: company._id } });
    res.status(201).json(company)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCompaniesController = async (req, res) => {
  try {
    const companies = await getCompaniesService();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyByIdController = async (req, res) => {
  const companyId = req.params.id.trim()


  if (!Types.ObjectId.isValid(companyId)) {
    return res.status(400).json({ message: "Invalid company ID format" });
  }

  try {

    const company = await getCompanyByIdService(companyId);


    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }


    res.status(200).json(company);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getMyCompanyController = async (req, res) => {
  try {
    if (!req.user || !req.user._id) return res.status(401).json({ message: "Unauthorized" });

    const membership = await CompanyMember.findOne({ userId: req.user._id });
    if (!membership) {
      return res.status(200).json(null);
    }
    const company = await Company.findById(membership.companyId).populate('createdBy', 'name email');
    if (!company) {
      return res.status(200).json(null);
    }


    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMembersController = async (req, res) => {
  const { companyId } = req.params;

  try {

    const members = await CompanyMember.find({ companyId }).populate('userId', 'name email');


    if (members.length === 0) {
      return res.status(404).json({ message: "No members found in this company" });
    }


    res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCompanyMembersController = async (req, res) => {
  const { companyId } = req.params;

  try {
    const companyMembers = await CompanyMember.find({ companyId })
      .populate('userId', 'name email')
      .populate('invitedBy', 'name email');

    if (!companyMembers || companyMembers.length === 0) {
      return res.status(404).json({ message: "No members found for this company" });
    }
    res.status(200).json(companyMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addMemberToCompany = async (req, res) => {
  const { companyId } = req.params;
  const { userId } = req.body;

  const company = await Company.findById(companyId);

  if (company.members.some(id => id.toString() === userId.toString())) {
    return res.status(409).json({ message: "User is already a member" });
  }
  try {
    //Add userId to the array from the company
    await Company.findByIdAndUpdate(
      companyId,
      { $addToSet: { members: userId } }
    )

    await CompanyMember.create({
      companyId,
      userId,
      role: "member",
      invitedBy: req.user._id,
      invitedAt: new Date(),
      joinedAt: new Date(),
    })

    await User.findByIdAndUpdate(userId, { $set: { company: companyId } });
    res.status(200).json({ message: "Member added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

export const changeMemberRoleController = async (req, res) => {
  const { companyId, memberId } = req.params;
  const { role } = req.body;

  if (!role || !["admin", "owner", , "recruiter", "member"].includes(role)) {
    return res.status(400).json({ message: "Invalid or missing role" });
  }

  try {

    const actingMember = await CompanyMember.findOne({ companyId, userId: req.user._id });
    if (!actingMember || actingMember.role !== "owner") {
      return res.status(403).json({ message: "Only owner can change roles" });
    }

    if (actingMember._id.toString() === memberId) {
      return res.status(403).json({ message: "Owner cannot change their own role" });
    }

    const member = await CompanyMember.findOneAndUpdate(
      { companyId, _id: memberId },
      { $set: { role } },
      { new: true }
    ).populate('userId', 'name email');

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Role updated successfully", member });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const kickMemberFromCompanyController = async (req, res) => {
  const { companyId, memberId } = req.params;
  const userId = req.user._id

  if (!companyId || !memberId) {
    return res.status(400).json({ message: "Invalid or missing id" });
  }

  try {
    const member = await CompanyMember.findById(memberId)
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const actingMember = await CompanyMember.findOne({ companyId, userId })
    if (!actingMember) {
      return res.status(403).json({ message: "Not a member of this company." });
    }

    //To kick myself if im not an Owner
    if (actingMember.userId.toString() === member.userId.toString()) {
      if (actingMember.role === "owner") {
        return res.status(403).json({ message: "Owner cannot leave the company. Transfer ownership first." });
      }
    } else {
      //If you want to kick someone else, you have to be owner or admin

      if (actingMember.role !== "owner" && actingMember.role !== "admin") {
        return res.status(403).json({ message: "Only owner or admin can kick other members." });
      }

      // Prevent owner/admin from kicking themselves (additional protection)
      if (member.userId.toString() === req.user._id.toString()) {
        return res.status(403).json({ message: "Owners and admins cannot kick themselves" });
      }
    }

    await Company.findOneAndUpdate({ _id: companyId }, { $pull: { members: member.userId } });
    await CompanyMember.findByIdAndDelete(memberId);
    await User.findByIdAndUpdate(member.userId, { $unset: { company: '' } })

    return res.status(200).json({ message: "Member kicked successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const transferOwnershipController = async (req, res) => {
  const { companyId } = req.params;
  const { newOwnerMemberId } = req.body;
  console.log("userId from token:", req.user._id, "companyId:", companyId);
  try {

    const oldOwner = await CompanyMember.findOne({ companyId, userId: req.user._id, role: "owner" });
    if (!oldOwner) {
      return res.status(403).json({ message: "Only current owner can transfer ownership" });
    }

    const newOwner = await CompanyMember.findOne({ companyId, _id: newOwnerMemberId });
    if (!newOwner) {
      return res.status(404).json({ message: "New owner member not found" });
    }
    if (newOwner.role === "owner") {
      return res.status(400).json({ message: "Selected member is already owner" });
    }

    newOwner.role = "owner";
    await newOwner.save();

    oldOwner.role = "member";
    await oldOwner.save();

    res.status(200).json({ message: "Ownership transferred successfully", newOwner, oldOwner });
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};


export const AbandonCompanyController = async (req, res) => {
  const { companyId } = req.params;
  const userId = req.user._id;

  const owner = await CompanyMember.findOne({ companyId, userId, role: "owner" });
  if (!owner) {
    return res.status(403).json({ message: "Only the owner can abandon the company." });
  }

  const jobs = await Jobs.find({ company: companyId });
  const jobIds = jobs.map(job => job._id);

  await Application.deleteMany({ jobId: { $in: jobIds } });
  await Jobs.deleteMany({ company: companyId });
  await CompanyMember.deleteMany({ companyId });
  await Notification.deleteMany({ company: companyId });
  await Company.findByIdAndDelete(companyId);

  // Unset company field for all users who were members
  await User.updateMany({ company: companyId }, { $unset: { company: "" } });

  return res.status(200).json({ message: "Company and all related data deleted successfully." });
}