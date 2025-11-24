import { useEffect, useState, useCallback } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  getAuthToken,
  getUserFromLocalStorage,
} from "../../services/auth/authService";
import {
  getCompanyById,
  getCompanyFromLocalStorage,
  getUserRole,
} from "../../services/companyService";
import Spinner from "../../components/Spinner/Spinner";

export default function JobEditRouteGuard() {
  const { jobId } = useParams<{ companyId: string; jobId: string }>();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const companyId = getCompanyFromLocalStorage();
  const token = getAuthToken();
  const user = getUserFromLocalStorage();

  // Validate company and job IDs
  const isValidId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

  // Check user role for access
  const hasValidRole = (role: string) =>
    ["admin", "owner", "recruiter"].includes(role);

  // Fetch company and role data
  const fetchCompanyAndRole = useCallback(async () => {
    try {
      const [company, role] = await Promise.all([
        getCompanyById(companyId),
        getUserRole(companyId),
      ]);
      return { company, role: role[0]?.role };

    } catch (error) {

      console.error("Failed to fetch the data.");

      return { company: null, role: null };
    }
  }, [companyId]);

  useEffect(() => {
    if (!companyId || !isValidId(companyId) || !jobId || !isValidId(jobId)) {
      toast.error("Invalid ID format.");
      navigate("/");
      return;
    }

    if (!token) {
      navigate("/login");
      return;
    }

    const jobAndCompanyGuard = async () => {
      const { company, role } = await fetchCompanyAndRole();

        if (company.members.includes(user._id) && hasValidRole(role)) {
        setUserRole(role);
        setHasAccess(true);
      } else {
        toast.error("You do not have access to this company or job.");
        navigate("/");
      }
      setLoading(false);
    };

    jobAndCompanyGuard();
  }, [companyId, jobId, token, user._id, navigate, fetchCompanyAndRole]);

  if (loading) return <Spinner />;

  return hasAccess ? <Outlet /> : null;
}
