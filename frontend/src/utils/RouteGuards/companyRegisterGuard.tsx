import { JSX } from "react";
import { getMyCompany } from "../../services/companyService";


export async function CompanyRegisterGuard(){

    const {company} = await getMyCompany()
    console.log()
    
}