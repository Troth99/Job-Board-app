import { useEffect, useState } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { getUserRole } from "../../../services/companyService";
import { useParams } from "react-router";
import Spinner from "../../Spinner/Spinner";

export function MemberDashboard() {
  const { companyId } = useParams();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userRole = await getUserRole(companyId);
        setRole(userRole[0].role);
      } catch (error) {
        console.log("Failed to fetch the data.");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchRole();
    }
  }, [companyId]);

  return (
    <div className="profile-body" style={{ position: "relative" }}>
      {loading && <Spinner overlay={true} />}

      <div style={{ display: loading ? "none" : "block" }}></div>
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

          <div className="members-list">
            <div className="member-card">
              <img src="https://i.imgur.com/OqVaosK.jpeg" alt="Member 1" />
              <div className="member-info">
                <h4>John Doe</h4>
                <p>Role: Developer</p>
                <p>Status: Active</p>
              </div>
            </div>

            <div className="member-card">
              <img src="https://i.imgur.com/OqVaosK.jpeg" alt="Member 2" />
              <div className="member-info">
                <h4>Jane Smith</h4>
                <p>Role: Designer</p>
                <p>Status: Active</p>
              </div>
            </div>

            <div className="member-card">
              <img src="https://i.imgur.com/OqVaosK.jpeg" alt="Member 3" />
              <div className="member-info">
                <h4>Tom Brown</h4>
                <p>Role: Manager</p>
                <p>Status: Pending</p>
              </div>
            </div>
          </div>

          <div className="content-header">
            <h3>Jobs</h3>
            <button className="add-button">+ Post Job</button>
          </div>

          <div className="job-list">
            <div className="job-card">
              <h4>Frontend Developer</h4>
              <p>Location: Remote</p>
              <p>Status: Open</p>
            </div>
            <div className="job-card">
              <h4>UI/UX Designer</h4>
              <p>Location: New York</p>
              <p>Status: Open</p>
            </div>
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
    </div>
  );
}
