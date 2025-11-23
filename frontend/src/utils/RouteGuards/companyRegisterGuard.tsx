import { Navigate, Outlet } from "react-router";
import { getCompanyFromLocalStorage } from "../../services/companyService";
import { toast } from "react-toastify";


export default function CompanyRegisterGuard() {
  const companyId = getCompanyFromLocalStorage();

  if (companyId) {
      toast.warn('You are part of a company, so was not able to navigate to register.')
      return <Navigate to={`/company/${companyId}/dashboard`} replace />;
    }

  return <Outlet />;
}