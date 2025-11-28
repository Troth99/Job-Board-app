import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getAuthToken, getUserFromLocalStorage } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";
import { Job } from "../../components/Jobs/CreateJob/CreateJob";
import useJobs from "../../hooks/useJobs";
import useCompany from "../../hooks/useCompany";


export  function JobEditRouteGuard({ children }: {children: React.ReactNode}) {
  const navigate = useNavigate();
  const token = getAuthToken();
  const { companyId, jobId } = useParams<{ companyId: string; jobId: string }>()
  const user = getUserFromLocalStorage();
  const [loading, setLoading] = useState(true)
  const [currentJob, setCurrentJob] = useState<Job>()
  const { getCompanyById, getUserRole, company, userRole } = useCompany();
  const { getJobById } = useJobs();

  const hasValidRole = (role: string) => ["admin", "owner", "recruiter"].includes(role);


  //check the current URL location for the user, redirect if its recruiter but allow him to view the page.
   const location = useLocation();
  const isEditPage = location.pathname.includes("/edit");
  
  useEffect(() => {
    let isMounted = true;

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
        // Fetch all data first
        await getCompanyById(companyId);
        await getUserRole(companyId);
        const job = await getJobById(jobId);
        
        if (!isMounted) return;
        
        setCurrentJob(job);
      } catch (error) {
        console.error("Error loading data.", error);
        if (isMounted) {
          toast.error("Failed to load job or company data.");
          navigate("/");  
        }
        return;
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [companyId, jobId]);

  // Check access after company and role data loads
  useEffect(() => {
    if (loading || !company || !currentJob || userRole === null) return;

    if (!company?.members?.includes(user._id)) {
      toast.error("You are not a member of this company.");
      navigate("/"); 
      return;
    }
  
    if (companyId !== currentJob.company) {
      toast.error("This job is not part of your company.");
      navigate('/')
      return;
    } 

    if (userRole === "recruiter" && isEditPage) {
      toast.error("Recruiters cannot edit jobs.");
      navigate(`/company/${companyId}/job/${jobId}/details`); 
      return;
    }

    if (!hasValidRole(userRole || '')) {
      toast.error("You do not have access to this job.");
      navigate('/')
      return;
    }
  }, [company, userRole, currentJob, loading]);

if (loading) {
  return (

      <Spinner overlay={true} />
    
  );
}
  return <>{children}</>; 
};

