import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";
import useCompany from "../../hooks/useCompany";


export default function CompanyRegisterGuard() {
  const { getCompanyFromLocalStorage } = useCompany();
  const companyId = getCompanyFromLocalStorage();

  if (companyId) {
      toast.warn('You are part of a company, so was not able to navigate to register.')
      return <Navigate to={`/company/${companyId}/dashboard`} replace />;
    }

  return <Outlet />;
}