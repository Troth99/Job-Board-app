import { Link } from "react-router";
import { formatDate } from "../../../../../shared/utils/formData";

import { QuickInfoSectionProps } from "../../../types/QuickInfoSection.types";
import AddToFavourites from "../../../components/SaveJobButton/SaveJobButton";
import { Trans } from "@lingui/react/macro";



export function QucikInfoSection( { jobData, isLoggedIn, isCompanyMember, setShowApplyModal, jobId, location }: QuickInfoSectionProps) {
   

    return (
            <section className="job-card job-card--compact job-card--sticky">
              <h2><Trans>Quick info</Trans></h2>
              <ul className="summary-list">
                <li className="summary-item">
                  <span className="summary-label"><Trans>Status</Trans></span>
                  <span
                    className={
                      jobData?.isActive ? "job-status-pill is-active" : "job-status-pill is-closed"
                    }
                  >
                    {jobData?.isActive ? <Trans>Active vacancy</Trans> : <Trans>Closed vacancy</Trans>}
                  </span>
                </li>
                <li className="summary-item">
                  <span className="summary-label"><Trans>Posted</Trans></span>
                  <span>{formatDate(jobData?.createdAt ?? "") || "N/A"}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label"><Trans>Category</Trans></span>
                  <span>{jobData?.category?.name}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label"><Trans>Type</Trans></span>
                  <span>{jobData?.employmentType || "N/A"}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label"><Trans>Location</Trans></span>
                  <span>{jobData?.location || "N/A"}</span>
                </li>
                <li className="summary-item">
                  <span className="summary-label"><Trans>Salary</Trans></span>
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
                      <Trans>Apply now</Trans>
                    </button>
                  ) : (
                    <button className="apply-button" disabled>
                      <Trans>Company members cannot apply</Trans>
                    </button>
                  )
                ) : (
                  <div className="auth-cta">
                    <button className="apply-button" disabled>
                      <Trans>You need an account to apply</Trans>
                    </button>
                    <Link to="/login" state={{ from: location.pathname }} className="login-btn">
                      <Trans>Log in and continue</Trans>
                    </Link>
                  </div>
                )}
              </section>
            </section>
    )
}
