import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify"; 
import { getAuthToken, getUserFromLocalStorage } from "../../services/auth/authService"; 
import { getCompanyById } from "../../services/companyService"; 
import { Navigate, Outlet } from "react-router";
import { showCompanySuccess, showCompanyWarning } from "../toast";
import Spinner from "../../components/Spinner/Spinner";

export default function CompanyRouteGuard() {
  let { companyId } = useParams<{ companyId: string }>(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [toastShown, setToastShown] = useState<boolean>(false);

  const token = getAuthToken(); 
  const user = getUserFromLocalStorage(); 

    //CompanyId has 24 characters from mongoose db, this one checks if its the correct characters in case someone type incorrect Id.
  const isValidCompanyId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);
  companyId = companyId?.trim()
  
  useEffect(() => {
    if (!companyId || !isValidCompanyId(companyId)) {
      toast.error("Invalid company ID format.");
      navigate("/");  
      return; 
    }

    const fetchUserCompany = async () => {
      if (!token || !user) {
        toast.error("You do not have access to this page.");
        navigate("/login"); 
        setLoading(false);
        return;
      }

      try {
        const company = await getCompanyById(companyId); 
        if (company.members.includes(user._id)) {
          setHasAccess(true);
        } else {
          if (!toastShown) {
            showCompanyWarning("You do not have access to this company.");
            setToastShown(true); 
            navigate("/"); 
          }
        }
      } catch (error) {
        console.error(error);
        showCompanyWarning("Error fetching company data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCompany();
  }, [companyId, token, user, navigate, toastShown]); 

 if (loading) {
  return (
    <div className="profile-body" style={{ position: "relative" }}>
      <Spinner overlay={true} /> 
    </div>
  );
}
  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
