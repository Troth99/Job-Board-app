import { Link } from "react-router";
import { formatDate } from "../../../../../utils/formData";
import AddToFavourites from "../../AddToFavourites/FavoriteButton";
import { QuickInfoSectionProps } from "./QuickInfoSection.types";



export function QucikInfoSection( { jobData, isLoggedIn, isCompanyMember, setShowApplyModal, jobId, location }: QuickInfoSectionProps) {

    return (
            <section className="job-card job-card--compact job-card--sticky">
              <h2>Quick info</h2>
              <ul className="summary-list">
                <li className="summary-item">
                  <span className="summary-label">Status</span>
                  <span
                    className={
                      jobData?.isActive ? "job-status-pill is-active" : "job-status-pill is-closed"
                    }
                  >
                    {jobData?.isActive ? "Active vacancy" : "Closed vacancy"}
                  </span>
                </li>
                <li className="summary-item">
                  <span className="summary-label">Posted</span>
                  <span>{formatDate(jobData?.createdAt ?? "") || "N/A"}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label">Category</span>
                  <span>{jobData?.category?.name || "N/A"}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label">Type</span>
                  <span>{jobData?.employmentType || "N/A"}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label">Location</span>
                  <span>{jobData?.location || "N/A"}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label">Salary</span>
                  <span>{jobData?.salary || "N/A"}</span>
                </li>
              </ul>

              <div className="job-top-actions">
                <AddToFavourites jobId={jobId} />
              </div>

              <section className="job-apply">
                {isLoggedIn ? (
                  !isCompanyMember ? (
                    <button className="apply-button" onClick={() => setShowApplyModal(true)}>
                      Apply now
                    </button>
                  ) : (
                    <button className="apply-button" disabled>
                      Company members cannot apply
                    </button>
                  )
                ) : (
                  <div className="auth-cta">
                    <button className="apply-button" disabled>
                      You need an account to apply
                    </button>
                    <Link to="/login" state={{ from: location.pathname }} className="login-btn">
                      Log in and continue
                    </Link>
                  </div>
                )}
              </section>
            </section>
    )
}
