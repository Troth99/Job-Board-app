import { useEffect } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { useNavigate, useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import { CompanyJobsList } from "../CompanyJobList.tsx/CompanyJobList";
import Spinner from "../../Spinner/Spinner";
import { useCompanyContext } from "../../../context/CompanyContext";

export function MemberDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { getUserRole, userRole, loading: loadingRole } = useCompany();
  const {company} = useCompanyContext()

  useEffect(() => {
   
    const fetchData = async () => {
      if (!companyId) return;

      try {
        await getUserRole(companyId);
      } catch (error) {
      console.error('Failed to load member dasbharod.')
      }
    };

    fetchData();

  
  }, [companyId]);

  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
  };

 const canPostJob = userRole === "admin" || userRole === "owner" || userRole === "recruiter";

 if(loadingRole) {
  return <Spinner inline={true} />;
 }
  return (

    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
            <div className="sidebar-header">
              <h2>Welcome to <span className="company-name">{company?.name}</span> dashboard.</h2>
              <p className="user-role">Role: {userRole}</p>
            </div>
            <div className="sidebar-nav">
                  <div className="job-card-dashboard-image">
                  <img
                    src={company ?company.logo : "/assets/defaultCompany.png"}
                    alt={company ? company.name : "No image"}
                    className="company-logo"
                  />
                </div>
              <ul>
                <li>
                  <a href="#">Members</a>
                </li>
                <li>
                  <a href="#">Settings</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="main-content">
            <div className="content-header">
              <h3>Members</h3>
              <button className="add-button">+ Add Member</button>
            </div>

            {/* Displaying Member List */}
            <div className="members-list">
              <div className="member-card">
                <img
                  src="https://i.imgur.com/OqVaosK.jpeg"
                  alt="Member 1"
                />
                <div className="member-info">
                  <h4>John Doe</h4>
                  <p>Role: Developer</p>
                  <p>Status: Active</p>
                </div>
              </div>

              <div className="member-card">
                <img
                  src="https://i.imgur.com/OqVaosK.jpeg"
                  alt="Member 2"
                />
                <div className="member-info">
                  <h4>Jane Smith</h4>
                  <p>Role: Designer</p>
                  <p>Status: Active</p>
                </div>
              </div>

              <div className="member-card">
                <img
                  src="https://i.imgur.com/OqVaosK.jpeg"
                  alt="Member 3"
                />
                <div className="member-info">
                  <h4>Tom Brown</h4>
                  <p>Role: Manager</p>
                  <p>Status: Pending</p>
                </div>
              </div>
            </div>

            {/* Jobs Section */}
            <CompanyJobsList
            companyId={companyId!}
            canPostJob={canPostJob}
            onPostJob={postJobHandlerNavigate}
            />
       
            <div className="content-header">
              <h3>Announcements</h3>
            </div>

            <div className="announcement-list">
              <div className="announcement-card">
                <h4>Company Meeting on Friday</h4>
                <p>Date: 23rd July 2025</p>
                <p>Join us for the quarterly review meeting. It's important!</p>
              </div>
              <div className="announcement-card">
                <h4>New Project Launch</h4>
                <p>Date: 15th August 2025</p>
                <p>
                  Our new project is launching soon. Stay tuned for more info!
                </p>
              </div>
            </div>
          </div>
    </div>
  );
}
