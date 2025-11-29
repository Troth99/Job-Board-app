import { useEffect, useState } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../Spinner/Spinner";
import { Job } from "../../Jobs/CreateJob/CreateJob";
import useJobs from "../../../hooks/useJobs";
import useCompany from "../../../hooks/useCompany";
import { CompanyJobsList } from "../CompanyJobList.tsx/CompanyJobList";

export function MemberDashboard() {
  const { companyId } = useParams();
  const [loadingJobs, setLoadingJobs] = useState<boolean>(true); 
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();
  const {company, getUserRole, userRole, loading: loadingRole, getMyCompany} = useCompany();
  const { getJobsByCompany } = useJobs();


  const fetchCompanyJobs = async () => {
    if (companyId) {
      try {
      
        const response = await getJobsByCompany(companyId);
        if (response.length > 0) {
          const sortedJobs = response.sort((a: Job, b:Job) => {
            const aCreatedAt = a.createdAt ? new Date(a.createdAt).getTime(): 0;
            const bCreatedAt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bCreatedAt - aCreatedAt

          })
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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!companyId) return;

      try {
        await Promise.all([
          fetchCompanyJobs(),
          getUserRole(companyId)
        ]);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching dashboard data:", error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [companyId]);

  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
  };

 const canPostJob = userRole === "admin" || userRole === "owner" || userRole === "recruiter";

   const isLoading = loadingJobs || loadingRole;
  return (
    <>
    {isLoading ? (
        <Spinner overlay={true} />
      ) : (
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
            setLoadingJobs={setLoadingJobs} 
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
      )}
  </>
  );
}
