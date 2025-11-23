import { useEffect, useState } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { getUserRole } from "../../../services/companyService";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../Spinner/Spinner";
import { ShowJobs } from "../showJobs/showCompanyJobs";
import { Job } from "../../Jobs/CreateJob/CreateJob";
import { getJobsByCompany } from "../../../services/jobService";

export function MemberDashboard() {
  const { companyId } = useParams();
  const [role, setRole] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState<boolean>(true); 
  const [loadingRole, setLoadingRole] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  const fetchCompanyJobs = async () => {
    if (companyId) {
      try {
      
        const response = await getJobsByCompany(companyId);
        if (response.length > 0) {
          const sortedJobs = response.sort(
            (a: Job, b: Job) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setJobs(sortedJobs.slice(0, 5));
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    }
  };

  const fetchUserRole = async () => {
    try {
 
      if (companyId) {
        const userRole = await getUserRole(companyId);
        setRole(userRole[0].role);
      }
    } catch (error) {
      console.log("Failed to fetch the role data.");
    } finally {
      setLoadingRole(false);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchCompanyJobs();
      fetchUserRole();
    }
  }, [companyId]);

  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
  };

   const isLoading = loadingJobs || loadingRole;
  return (
    <div className="profile-body" style={{ position: "relative" }}>
      {isLoading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="dashboard">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h2>Company Dashboard</h2>
              <p className="user-role">Role: {role}</p>
            </div>
            <div className="sidebar-nav">
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
            <div className="content-header">
              <h3>Jobs</h3>
              <button className="add-button" onClick={postJobHandlerNavigate}>
                + Post Job
              </button>
            </div>

            <div className="job-list">
           
              <ShowJobs jobs={jobs} />
            </div>

       
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
      )}
    </div>
  );
}
