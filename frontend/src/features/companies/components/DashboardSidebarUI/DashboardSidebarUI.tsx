import { Link } from "react-router";
import CompanyCalendar from "../DashboardComponents/CompanyCalendar/CompanyCalendar";
import { Trans } from "@lingui/react/macro";

type MemberDashboardSideBarProps = {
  company: any;
  localRole: string;
  companyId: string;
  setPromoteOwnershipModalOpen: (open: boolean) => void;
  setAbandonModalOpen: (open: boolean) => void;
  setLeaveModalOpen: (open: boolean) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (open: boolean) => void;
};

export function MemberDashboardSideBar(props: MemberDashboardSideBarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-kicker">Company panel</p>
        <h2>
          <Trans>Welcome to <span className="company-name">{props.company?.name}</span></Trans>
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

          {props.localRole === "admin" || props.localRole === "owner" ? (
            <li>
              <Link to={`/company/${props.companyId}/update`}>
                <Trans>Update Company</Trans>
              </Link>
            </li>
          ) : null}

          <li>
            <a href="#team-section"><Trans>Team tools</Trans></a>
          </li>
          <li>
            <a href="#jobs-section"><Trans>Jobs board</Trans></a>
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

        <div className="sidebar-divider" />
        <section
          className="sidebar-mini-calendar"
          aria-label="Company calendar"
        >
          <div className="sidebar-mini-calendar-header">
            <h3><Trans>Calendar</Trans></h3>
            <button
              type="button"
              className="sidebar-mini-calendar-toggle"
              onClick={() => props.setIsCalendarOpen(true)}
            >
              <Trans>View full calendar</Trans>
            </button>
          </div>
          <CompanyCalendar compact />
        </section>

        <div className="sidebar-extension">
          <h3><Trans>Add more options</Trans></h3>
          <p><Trans>Use this block for quick links and new tools in the future.</Trans></p>
          <div className="sidebar-extension-chips">
            <span><Trans>Analytics</Trans></span>
            <span><Trans>Reports</Trans></span>
          </div>
        </div>

        <div className="sidebar-danger-actions">
          <button
            className="sidebar-btn-danger"
            onClick={() => props.setAbandonModalOpen(true)}
          >
            <Trans>Abandon company</Trans>
          </button>

          <button
            className="sidebar-btn-danger"
            onClick={() => props.setLeaveModalOpen(true)}
          >
            <Trans>Leave company</Trans>
          </button>
        </div>
      </div>
    </div>
  );
}
