import { useEffect } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { useNavigate, useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import { CompanyJobsList } from "../CompanyJobList/CompanyJobList";
import Spinner from "../../Spinner/Spinner";

export default function MemberDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { company, getCompanyById, getUserRole, userRole, loading: loadingRole } = useCompany();

  useEffect(() => {
    if (!companyId) return;
    getCompanyById(companyId);
    getUserRole(companyId);
  }, [companyId]);

  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
  };

  const canPostJob =
    userRole === "admin" || userRole === "owner" || userRole === "recruiter";

  if (loadingRole) {
    return <Spinner inline={true} />;
  }
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>
            Welcome to <span className="company-name">{company?.name}</span>{" "}
            dashboard.
          </h2>
          <p className="user-role">Role: {userRole}</p>
        </div>
        <div className="sidebar-nav">
          <div className="job-card-dashboard-image">
            <img
              src={
                company?.logo && company.logo.trim().startsWith("http")
                  ? company.logo
                  : "/assets/defaultCompany.png"
              }
              alt={
                company?.logo && company.logo.trim() !== ""
                  ? company.name
                  : "Default Company Logo"
              }
              className="company-logo"
            />
          </div>
          <ul>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">


        {/* Jobs Section */}
        <CompanyJobsList
          companyId={companyId!}
          canPostJob={canPostJob}
          onPostJob={postJobHandlerNavigate}
        />
  {/*announcements section 
  
  <div className="content-header">
    <h3>Announcements</h3>
  </div>

  <div className="announcement-list">
    <div className="announcement-card">
 
    </div>
    </div>
  
  

  */}
      </div>
    </div>
  );
}
