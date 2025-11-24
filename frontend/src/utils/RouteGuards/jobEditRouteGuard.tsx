import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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

  const hasValidRole = (role: string) => ["admin", "owner"].includes(role);

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

