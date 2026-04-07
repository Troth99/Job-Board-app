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
        <h2>
          Welcome to <span className="company-name">{props.company?.name}</span>{" "}
          dashboard.
        </h2>
        <p className="user-role">Role: {props.localRole}</p>
      </div>
      <div className="sidebar-nav">
        <div className="job-card-dashboard-image">
          <img
            src={
              props.company?.logo &&
              props.company.logo.trim().startsWith("http")
                ? props.company.logo
                : "/assets/defaultCompany.png"
            }
            alt={
              props.company?.logo && props.company.logo.trim() !== ""
                ? props.company.name
                : "Default Company Logo"
            }
            className="company-logo"
          />
        </div>
        <ul>
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
