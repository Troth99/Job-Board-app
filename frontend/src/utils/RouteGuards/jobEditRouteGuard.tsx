import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getAuthToken, getUserFromLocalStorage } from "../../services/auth/authService";
import { getCompanyById, getUserRole } from "../../services/companyService";
import Spinner from "../../components/Spinner/Spinner";


export  function JobEditRouteGuard({ children }: {children: React.ReactNode}) {
  const navigate = useNavigate();
  const token = getAuthToken();
  const { companyId, jobId } = useParams<{ companyId: string; jobId: string }>()
  const user = getUserFromLocalStorage();
   const [loading, setLoading] = useState(true)

  const hasValidRole = (role: string) => ["admin", "owner", "recruiter"].includes(role);

  //check the current URL location for the user, redirect if its recruiter but allow him to view the page.
   const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  
  useEffect(() => {

    const checkAccess = async () => {
      if (!companyId || !jobId) {
        toast.error("You do not have access to this company or job.");
        navigate("/"); 
        return;
      }

      if (!token) {
        navigate("/login");  
        return;
      }

      try {
        const [company, roleResult] = await Promise.all([
          getCompanyById(companyId),
          getUserRole(companyId),
        ]);

        const role = roleResult[0]?.role;

       if (role === "recruiter" && isEditPage) {
          toast.error("Recruiters cannot edit jobs.");
          navigate(`/company/${companyId}/job/${jobId}/details`); 
          return;
        }

        if (!company.members.includes(user._id) || !hasValidRole(role)) {
          toast.error("You do not have access to this company or job.");
         navigate('/')
          return;
        }
      } catch (error) {
        console.error("Error loading data.");
        navigate("/");  
      }

      setLoading(false)
    };

    checkAccess();

   
  }, [companyId, jobId, token, user._id, navigate]);

if (loading) {
  return (

      <Spinner overlay={true} />
    
  );
}
  return <>{children}</>; 
};

