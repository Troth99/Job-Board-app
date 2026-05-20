import { Link, useNavigate } from "react-router";
import { useFavoritesContext } from "../../../context/FavouritesJobsContext";
import "./ProfileRightPanel.css";

interface RoleAndCompanySectionProps {
  userRole: string | null | undefined;
  company: any;
  companyLoading: boolean;
  hasCompanyId: boolean;
}

export function RoleAndCompanySection({
  userRole,
  company,
  hasCompanyId,
}: RoleAndCompanySectionProps) {
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
          <h3>Role:</h3>
          <p>
            {hasCompanyId && userRole
              ? `${userRole} of ${company?.name}`
              : "Not part of a company yet."}
          </p>
        </div>
        <div className="company-registration">
          {hasCompanyId && company ? (
            <>
              <h3>{company.name}</h3>
              <p>Industry: {company.industry}</p>
              <p>Location: {company.location}</p>
              <button
                className="create-company-button-f1"
                onClick={() => navigate(`/company/${company._id}/dashboard`)}
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <>
              <h3>Company Registration</h3>
              <p>Status: Not Registered</p>
            </>
          )}
        </div>

        {/*To implement 2 recent jobs in favourites added to profile page with button view all saved jobs*/}

        <div className="recent-saved-jobs">
          <h3>
            <i className="fa-solid fa-briefcase recent-jobs-icon" style={{ marginRight: '0.5rem', color: 'var(--pf-primary)' }}></i>
            Recent Saved Jobs
          </h3>
          {recentSavedJobs.length === 0 ? (
            <p className="no-saved-jobs">No saved jobs yet.</p>
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
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && fav.job?._id) {
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
            View All Saved Jobs
          </button>
        </div>
        <div className="recent-saved-jobs-btn"></div>
      </>
    </div>
  );
}
