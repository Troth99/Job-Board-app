import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getAuthToken, getUserFromLocalStorage } from "../../services/auth/authService";
import { getCompanyById, getUserRole } from "../../services/companyService";
import Spinner from "../../components/Spinner/Spinner";
import { Job } from "../../components/Jobs/CreateJob/CreateJob";
import { getJobById } from "../../services/jobService";


export  function JobEditRouteGuard({ children }: {children: React.ReactNode}) {
  const navigate = useNavigate();
  const token = getAuthToken();
  const { companyId, jobId } = useParams<{ companyId: string; jobId: string }>()
  const user = getUserFromLocalStorage();
   const [loading, setLoading] = useState(true)
const [currentJob, setCurrentJob] = useState<Job>()

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
        const [company, roleResult, currentJob] = await Promise.all([
          getCompanyById(companyId),
          getUserRole(companyId),
          getJobById(jobId)
        ]);

        const role = roleResult[0]?.role;
         if (!company.members.includes(user._id)) {
          toast.error("You are not a member of this company.");
          navigate("/"); 
          return;
        }
      
          if (companyId !== currentJob.company) {
          toast.error("This job is not part of your company.");
          navigate('/')

          return;
        }

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

