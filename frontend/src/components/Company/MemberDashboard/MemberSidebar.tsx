import { Link } from "react-router";

type MemberDashboardSideBarProps = {
  company: any;
  localRole: string;
  companyId: string;
  setPromoteOwnershipModalOpen: (open: boolean) => void;
  setAbandonModalOpen: (open: boolean) => void;
  setLeaveModalOpen: (open: boolean) => void;
};

export function MemberDashboardSideBar(props: MemberDashboardSideBarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-kicker">Company panel</p>
        <h2>
          Welcome to <span className="company-name">{props.company?.name}</span>
        </h2>
        <p className="user-role">Role: {props.localRole}</p>
      </div>
      <div className="sidebar-nav">
        <div className="job-card-dashboard-image">
          <img 
          src={props.company?.logo}
          alt={props.company?.name || "./default-logo.png"}
          className="company-logo"
          />
        </div>
        <ul className="sidebar-nav-list">
          <li>
            <a href="#overview-section">Overview</a>
          </li>
          <li>
            <a href="#team-section">Team tools</a>
          </li>
          <li>
            <a href="#jobs-section">Jobs board</a>
          </li>
          <li>
            <Link to={`/company/${props.companyId}/members`}>Members</Link>
          </li>

          {props.localRole === "owner" && (
            <li>
              <button
                className="promote-ownership-btn"
                onClick={() => props.setPromoteOwnershipModalOpen(true)}
              >
                Promote ownership
              </button>
            </li>
          )}
          {/* Here can be added more menu items */}
        </ul>

        <div className="sidebar-extension">
          <h3>Add more options</h3>
          <p>Use this block for quick links and new tools in the future.</p>
          <div className="sidebar-extension-chips">
            <span>Analytics</span>
            <span>Calendar</span>
            <span>Reports</span>
          </div>
        </div>

        <div className="sidebar-danger-actions">
          <button
            className="sidebar-btn-danger"
            onClick={() => props.setAbandonModalOpen(true)}
          >
            Abandon company
          </button>

          <button
            className="sidebar-btn-danger"
            onClick={() => props.setLeaveModalOpen(true)}
          >
            Leave company
          </button>
        </div>
      </div>
    </div>
  );
}
