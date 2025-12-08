import { Types } from "mongoose";
import { Company } from "../models/Company.js";
import { createCompanyService, getCompaniesService, getCompanyByIdService } from "../services/companyService.js"
import { CompanyMember } from "../models/CompanyMember.js";



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
      .select('role userId');

    if (!companyMembers || companyMembers.length === 0) {
      return res.status(404).json({ message: "No members found for this company" });
    }

    const membersWithRole = companyMembers.map(member => ({
      userId: member.userId,
      role: member.role
    }));

    res.status(200).json(membersWithRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addMemberToCompany = async (req, res) => {
  const { companyId } = req.params;
  const { userId } = req.body;

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
    res.status(200).json({ message: "Member added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}