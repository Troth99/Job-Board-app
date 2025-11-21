import { Company } from "../models/Company.js";
import { CompanyMember } from "../models/CompanyMember.js";

export const createCompanyService = async (companyData, userId) => {
  try {
  
    const company = new Company({
      ...companyData,
      createdBy: userId,
      members: [userId], 
    });

    await company.save();
    return company;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating company");
  }
};
export const getCompaniesService = async () => {
    return await Company.find().populate('createdBy', 'name email')
}

export const getCompanyByIdService = async (id) => {
    return await Company.findById(id).populate('createdBy', 'name email')
}