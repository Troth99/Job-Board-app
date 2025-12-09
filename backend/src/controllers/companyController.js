import { Types } from "mongoose";
import { Company } from "../models/Company.js";
import { createCompanyService, getCompaniesService, getCompanyByIdService } from "../services/companyService.js"
import { CompanyMember } from "../models/CompanyMember.js";
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

    const company = await Company.findOne({ createdBy: req.user._id }).populate('createdBy', 'name email');
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
