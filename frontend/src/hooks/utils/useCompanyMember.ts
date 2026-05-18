import { useEffect, useState } from "react";
import { useCompanies } from "../companies";
import { useMembers } from "../members";
import { CompanyMember } from "../../interfaces/CompanyMember.model";
import type { Company } from "../companies/useCompanies";

export function useCompanyMember(companyId?: string | undefined) {
  const companiesMethods = useCompanies();
  const membersMethods = useMembers();
  const [members, setMembers] = useState<CompanyMember[]>([]);
  const [localRole, setLocalRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!companyId) return;
    setLoading(true);
    await companiesMethods.getCompanyById(companyId);
    const membersResult = await membersMethods.getCompanyMembers(companyId);
    setMembers(membersResult);
    const role = await membersMethods.getUserRole(companyId);
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