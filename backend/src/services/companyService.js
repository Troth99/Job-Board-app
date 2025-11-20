import { Company } from "../models/Company.js";
import { CompanyMember } from "../models/CompanyMember.js";

export const createCompanyService = async (data) => {
  const company = await Company.create(data);


  await CompanyMember.create({
    companyId: company._id,
    userId: data.createdBy,
    role: "owner",
    invitedBy: data.createdBy,
    invitedAt: new Date(),
    joinedAt: new Date(),
  });

  return company;
};

export const getCompaniesService = async () => {
    return await Company.find().populate('owner', 'name email')
}

export const getCompanyByIdService = async (id) => {
    return await Company.findById(id).populate('owner', 'name email')
}