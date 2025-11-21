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
export const getMemberRole = async (req, res) => {
  const { companyId, userId } = req.params;


  if (!mongoose.Types.ObjectId.isValid(companyId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid companyId or userId' });
  }

  try {
   
    const member = await CompanyMember.findOne({ companyId, userId });

   
    if (!member) {
      return res.status(404).json({ message: 'User not found in this company' });
    }

  
    return res.status(200).json({ role: member.role });

  } catch (error) {
    
    return res.status(500).json({ message: 'Error fetching user role' });
  }
};
export const getCompaniesService = async () => {
    return await Company.find().populate('createdBy', 'name email')
}

export const getCompanyByIdService = async (id) => {
    return await Company.findById(id).populate('createdBy', 'name email')
}