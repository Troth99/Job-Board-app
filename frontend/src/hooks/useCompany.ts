import useCompaniesDefault, { type Company, type Member } from "./companies/useCompanies";
import { useMembers as useMembersHook } from "./members";

export { default as useCompanies, type Company, type Member } from "./companies/useCompanies";
export { useMembers } from "./members";

export default function useCompany() {
  const companiesMethods = useCompaniesDefault();
  const membersMethods = useMembersHook();

  return {
    // Companies
    loading: companiesMethods.loading,
    error: companiesMethods.error,
    company: companiesMethods.company,
    companies: companiesMethods.companies,
    createCompany: companiesMethods.createCompany,
    getCompanies: companiesMethods.getCompanies,
    getCompanyById: companiesMethods.getCompanyById,
    getCompanyFromLocalStorage: companiesMethods.getCompanyFromLocalStorage,
    getMyCompany: companiesMethods.getMyCompany,
    checkUser: companiesMethods.checkUser,
    transferOwnership: companiesMethods.transferOwnership,
    abandonCompany: companiesMethods.abandonCompany,
    // Members
    userRole: membersMethods,
    getUserRole: membersMethods.getUserRole,
    addMemberToCompany: membersMethods.addMemberToCompany,
    getCompanyMembers: membersMethods.getCompanyMembers,
    changeMemberRole: membersMethods.changeMemberRole,
    kickMemberFromCompany: membersMethods.kickMemberFromCompany,
  };
}
