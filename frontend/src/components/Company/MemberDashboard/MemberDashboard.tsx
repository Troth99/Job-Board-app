import { useEffect, useState } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { Link, useNavigate, useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import { CompanyJobsList } from "../CompanyJobList/CompanyJobList";
import Spinner from "../../Spinner/Spinner";
import { CompanyMembers } from "../CompanyMembers/CompanyMembers";
import { SendMessage } from "../SendMessage/SendMessage";
import { AbandonCompanyModal } from "../DangerButtons/AbandonCompany/AbandonCompanyModal";
import { LeaveCompanyModal } from "../DangerButtons/LeaveCompany/LeaveCompanyModal";


export default function MemberDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const {
    company,
    getCompanyById,
    getUserRole,
    loading: loadingRole,
  } = useCompany();
  const [localRole, setLocalRole] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);


  const [abandonModalOpen, setAbandonModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    getCompanyById(companyId);
    getUserRole(companyId).then(setLocalRole);
  }, [companyId]);

  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
  };


  //TODO: implement the actual abandon company logic, this is just a placeholder for now
  const handleAbandonCompany = () => {
    // Here you would typically call an API to abandon the company
  }

  const canPostJob =
    localRole === "admin" || localRole === "owner" || localRole === "recruiter";

  if (loadingRole) {
    return <Spinner inline={true} />;
  }
  return (
    <>
      {success && (
        <div className="success-message">
          <span>Your message has been sent successfully!</span>
          <button className="success-close" onClick={() => setSuccess(false)}>
            ×
          </button>
        </div>
      )}
      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>
              Welcome to <span className="company-name">{company?.name}</span>{" "}
              dashboard.
            </h2>
            <p className="user-role">Role: {localRole}</p>
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
                <Link to={`/company/${companyId}/members`}>Members</Link>
              </li>
           {/* Here can be added more menu items */}
            </ul>
            <div className="sidebar-danger-actions">
              <button
                className="sidebar-btn-danger"
                onClick={() => setAbandonModalOpen(true)  }
              >
                Abandon company
              </button>

              <button className="sidebar-btn-danger"
                onClick={() => setLeaveModalOpen(true)}
              >Leave company</button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {/* Members Section */}
          <div className="content-header">
            <CompanyMembers />
            <SendMessage onSuccess={() => setSuccess(true)} />
          </div>

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

      <AbandonCompanyModal
        isOpen={abandonModalOpen}
        onClose={() => setAbandonModalOpen(false)}
        onConfirm={() => {
    
          setAbandonModalOpen(false);
          navigate("/"); 
        }}
        isOwner={localRole === "owner"}
      />

      <LeaveCompanyModal 
        isOpen={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        onConfirm={() => {
          setLeaveModalOpen(false);
          navigate("/")
        }}
        isOwner={localRole === "owner"}
    
      />
    </>
  );
}
