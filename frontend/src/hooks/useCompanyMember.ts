import { useEffect, useState } from "react";
import useCompany from "./useCompany";
import { CompanyMember } from "../interfaces/CompanyMember.model";



export function useCompanyMember(companyId? :string | undefined) {
 const { getCompanyById, getUserRole, getCompanyMembers } = useCompany();
  const [members, setMembers] = useState<CompanyMember[]>([]);
  const [localRole, setLocalRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


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

  return { members, localRole, loading, refresh };

}