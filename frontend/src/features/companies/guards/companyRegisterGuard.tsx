import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";

export default function CompanyRegisterGuard() {
  // Direct localStorage check without using hook
  const userStr = localStorage.getItem('user');
  let companyId = null;
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      companyId = user.company || null;
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  if (companyId) {
    toast.warn('You are part of a company, so was not able to navigate to register.');
    return <Navigate to={`/company/${companyId}/dashboard`} replace />;
  }

  return <Outlet />;
}
