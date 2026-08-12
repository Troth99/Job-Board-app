import {  useNavigate } from "react-router";
import { useFavoritesContext } from "../../../../context/FavouritesJobsContext";
import "./ProfileRightPanel.css";
import { ProfileRightPanelProps } from "../../types/profileRightPanelProps";
import { Trans } from "@lingui/react/macro";


export function ProfileRightPanel({
  userRole,
  company,
  hasCompanyId,
}: ProfileRightPanelProps) {
  const { savedJobs } = useFavoritesContext();

  const recentSavedJobs = [...savedJobs]
    .sort(
      (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
    )
    .slice(0, 2);

  const navigate = useNavigate();

  return (
    <div className="Profile-Data-info">
      <>
        <div className="role-change">
          <h3><Trans>Role:</Trans></h3>
          <p>
            {hasCompanyId && userRole
              ? (
                <>
                  <Trans>{userRole.toUpperCase()}</Trans> <Trans>of</Trans> {company?.name}
                </>
              )
              : <Trans>Not part of a company yet.</Trans>}
          </p>
        </div>
        <div className="company-registration">
          {hasCompanyId && company ? (
            <>
              <h3>{company.name}</h3>
              <p><Trans>Industry:</Trans> {company.industry}</p>
              <p><Trans>Location:</Trans> {company.location}</p>
              <button
                className="create-company-button-f1"
                onClick={() => navigate(`/company/${company._id}/dashboard`)}
              >
                <Trans>Go to Dashboard</Trans>
              </button>
            </>
          ) : (
            <>
              <h3><Trans>Company Registration</Trans></h3>
              <p><Trans>Status: Not Registered</Trans></p>
            </>
          )}
        </div>

        {/*To implement 2 recent jobs in favourites added to profile page with button view all saved jobs*/}

        <div className="recent-saved-jobs">
          <h3>
            <i className="fa-solid fa-briefcase recent-jobs-icon" style={{ marginRight: '0.5rem', color: 'var(--pf-primary)' }}></i>
            <Trans>Recent Saved Jobs</Trans>
          </h3>
          {recentSavedJobs.length === 0 ? (
            <p className="no-saved-jobs"><Trans>No saved jobs yet.</Trans></p>
          ) : (
            <ul className="recent-jobs-list">
              {recentSavedJobs.map((fav) => (
                <li
                  key={fav.job?._id || fav._id}
                  className="recent-job-item"
                  onClick={() => {
                    if (fav.job?._id) {
                      navigate(`/job/${fav.job._id}`);
                    }
                  }}
                
                  aria-label={`View job ${fav.job?.title || ''}`}
                  role="button"
                >
                  <div className="recent-job-title">
                    <i className="fa-solid fa-briefcase recent-jobs-icon" style={{ marginRight: '0.4rem', color: 'var(--pf-primary)' }}></i>
                    {fav.job?.title || "-"}
                  </div>
                  <div className="recent-job-meta">
                    <span className="recent-job-company">
                      {fav.job?.company?.name || "-"}
                    </span>
                    <span className="recent-job-date">
                      {fav.addedAt
                        ? new Date(fav.addedAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            className="view-all-saved-btn"
            onClick={() => navigate("/favourite-jobs")}
          >
            <i className="fa-solid fa-briefcase recent-jobs-icon" style={{ marginRight: '0.4rem', color: '#fff' }}></i>
            <Trans>View All Saved Jobs</Trans>

          </button>
        </div>
        <div className="recent-saved-jobs-btn"></div>
      </>
    </div>
  );
}
