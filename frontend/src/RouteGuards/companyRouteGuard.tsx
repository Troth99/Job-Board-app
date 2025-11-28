import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify"; 
import { getAuthToken, getUserFromLocalStorage } from "../hooks/useAuth"; 
import { Navigate, Outlet } from "react-router";
import { showCompanyWarning } from "../utils/toast";
import Spinner from "../components/Spinner/Spinner";
import useCompany from "../hooks/useCompany";

export default function CompanyRouteGuard() {
  let { companyId } = useParams<{ companyId: string }>(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [toastShown, setToastShown] = useState<boolean>(false);
  const { getCompanyById, company } = useCompany();

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

    let isMounted = true;

    const fetchUserCompany = async () => {
      if (!token || !user) {
        toast.error("You do not have access to this page.");
        navigate("/login"); 
        setLoading(false);
        return;
      }

      try {
        if (isMounted) {
          await getCompanyById(companyId);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          showCompanyWarning("Error fetching company data.");
          setLoading(false);
        }
      }
    };

    fetchUserCompany();

    return () => {
      isMounted = false;
    };
  }, [companyId]); 

  // Check access when company data is loaded
  useEffect(() => {
    if (company && user) {
      if (company.members?.includes(user._id)) {
        setHasAccess(true);
      } else {
        if (!toastShown) {
          showCompanyWarning("You do not have access to this company.");
          setToastShown(true);
          navigate("/");
        }
      }
      setLoading(false);
    }
  }, [company, user, toastShown, navigate]);

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
