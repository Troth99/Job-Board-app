import { useEffect, useState } from "react";
import useCompanies from "./useCompanyAPI";
import useMembers from "../../../features/companies/hooks/useMembers";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import { Company } from "../types/companyTypes";


export function useCompanyMember(companyId?: string | undefined) {
  const { getCompanyMembers, getUserRole } = useMembers();
  const [members, setMembers] = useState<CompanyMember[]>([]);
  const [localRole, setLocalRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const companiesMethods = useCompanies();
  const { getCompanyById } = companiesMethods;

  const refresh = async () => {
    if (!companyId) return;
    setLoading(true);
    await getCompanyById(companyId);
    const membersResult = await getCompanyMembers(companyId);
    setMembers(membersResult);
    const role = await getUserRole(companyId);
    setLocalRole(role);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [companyId]);

  return {
    members,
    localRole,
    loading,
    refresh,
    company: companiesMethods.company as Company | null,
  };
}