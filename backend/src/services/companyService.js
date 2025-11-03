import { Company } from "../models/Company.js"



export const createCompanyService = async (data) => {
    return await Company.create(data)
};


export const getCompaniesService = async () => {
    return await Company.find().populate('owner', 'name email')
}

export const getCompanyByIdService = async (id) => {
    return await Company.findById(id).populate('owner', 'name email')
}