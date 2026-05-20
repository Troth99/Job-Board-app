import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { getAuthToken, getUserFromLocalStorage } from "../hooks/shared/useAuth";
import useJobs from "../hooks/utils/useJobs";
import useCompany from "../hooks/utils/useCompany";
import { Job } from "../interfaces/Job.model";
import FullPageSpinner from "../components/FullPageSpinner/FullPageSpinner";

export function JobDetailsRouteGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const token = getAuthToken();
  const { companyId, jobId } = useParams<{ companyId: string; jobId: string }>();
  const user = getUserFromLocalStorage();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job>();
  const [resolvedUserRole, setResolvedUserRole] = useState<string | null>(null);
  const { getCompanyById, getUserRole, company } = useCompany();
  const { getJobById } = useJobs();

  const hasValidRole = (role: string) => ["admin", "owner", "recruiter"].includes(role);

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
        await getCompanyById(companyId);
        const role = await getUserRole(companyId);
        const job = await getJobById(jobId);

        if (!isMounted) return;

        setResolvedUserRole(role);
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

  useEffect(() => {
    if (loading || !company || !currentJob || !user?._id) return;

    const isUserInCompany = Boolean(
      company?.members?.some((member: any) => {
        const memberId =
          typeof member === "string"
            ? member
            : member?._id || member?.userId?._id || member?.userId;
        return String(memberId) === String(user._id);
      })
    );

    if (!isUserInCompany) {
      toast.error("You are not part of this company.");
      navigate("/");
      return;
    }

    if (companyId !== currentJob.company?._id) {
      toast.error("This job is not part of your company.");
      navigate("/");
      return;
    }

    if (!hasValidRole(resolvedUserRole || "")) {
      toast.error("You do not have access to this job.");
      navigate("/");
      return;
    }

    setIsAuthorized(true);
  }, [company, resolvedUserRole, currentJob, loading, user?._id]);

  if (loading || !isAuthorized) return <FullPageSpinner />;

  return <>{children}</>;
}
