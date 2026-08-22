import "../../styles/detailsJobMainSection.css";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";
import { Job } from "../../types/Job.model";
import { formatDate } from "../../../../shared/utils/formData";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";

const splitToList = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getDisplayValue = (value?: string | number | null) => {
  if (value === undefined || value === null || value === "") {
    return t`Not specified`;
  }

  return String(value);
};

function DetailsJobMainSection({
  jobDetails,
}: {
  jobDetails: Job | undefined;
}) {
  const skills = splitToList(jobDetails?.skills);
  const benefits = splitToList(jobDetails?.benefits);
  const title = jobDetails?.title || "Untitled position";
  const description =
    jobDetails?.description?.trim() ||
    t`No public description has been added for this role yet.`;

  const statusLabel = jobDetails?.isActive ? t`Active` : t`Closed`;

  // Format the updatedAt date or provide a default message if not available
  const updatedAt = jobDetails?.updatedAt
    ? formatDate(jobDetails.updatedAt, "en-US")
    : t`Not updated yet`;

    // Format the applicationDeadline date or provide a default message if not available
  const deadline = jobDetails?.applicationDeadline
    ? formatDate(jobDetails.applicationDeadline, "en-US")
    : t`Open until filled`;

  const seo = () => generateSeoConfig("jobDetails", jobDetails?.title || "Job Details");
  return (
    <>
     <MetaData seo={seo()} />
    <section className="details-job-main">
      <article className="details-job-main__hero">
        <div className="details-job-main__eyebrow-row">
          <span className="details-job-main__eyebrow"><Trans>Position overview</Trans></span>
          <span
            className={`details-job-main__status-pill ${
              jobDetails?.isActive ? "is-active" : "is-closed"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="details-job-main__hero-content">
          <div className="details-job-main__copy">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <ul className="details-job-main__summary-grid">
            <li>
              <span><Trans>Location</Trans></span>
              <strong>{getDisplayValue(jobDetails?.location)}</strong>
            </li>
            <li>
              <span><Trans>Salary</Trans></span>
              <strong>{getDisplayValue(jobDetails?.salary)}</strong>
            </li>
            <li>
              <span><Trans>Category</Trans></span>
              <strong>{getDisplayValue(jobDetails?.category?.name)}</strong>
            </li>
            <li>
              <span><Trans>Employment</Trans></span>
              <strong>{getDisplayValue(jobDetails?.employmentType)}</strong>
            </li>
          </ul>
        </div>
      </article>

      <div className="details-job-main__grid">
        <article className="details-job-main__card">
          <h2><Trans>Role details</Trans></h2>
          <p className="details-job-main__card-intro">
            <Trans>
              A compact snapshot of the core terms and expectations for the
              position.
            </Trans>
          </p>
          <ul className="details-job-main__details-list">
            <li>
              <span><Trans>Work mode</Trans></span>
              <strong>{getDisplayValue(jobDetails?.workMode)}</strong>
            </li>
            <li>
              <span><Trans>Contract type</Trans></span>
              <strong>{getDisplayValue(jobDetails?.contractType)}</strong>
            </li>
            <li>
              <span><Trans>Schedule</Trans></span>
              <strong>{getDisplayValue(jobDetails?.workSchedule)}</strong>
            </li>
            <li>
              <span><Trans>Experience level</Trans></span>
              <strong>{getDisplayValue(jobDetails?.experienceLevel)}</strong>
            </li>
            <li>
              <span><Trans>Experience years</Trans></span>
              <strong>
                {getDisplayValue(jobDetails?.requiredExperienceYears)}
              </strong>
            </li>
            <li>
              <span><Trans>Openings</Trans></span>
              <strong>{getDisplayValue(jobDetails?.openings)}</strong>
            </li>
          </ul>
        </article>

        <article className="details-job-main__card details-job-main__card--accent">
          <h2><Trans>Skills and benefits</Trans></h2>
          <p className="details-job-main__card-intro">
            <Trans>
              Candidate-facing strengths, perks, and extra incentives for the role.
            </Trans>
          </p>

          <div className="details-job-main__chip-group">
            <div className="details-job-main__chip-section">
              <h3><Trans>Skills</Trans></h3>
              {skills.length > 0 ? (
                <div className="details-job-main__chips">
                  {skills.map((skill) => (
                    <span key={skill} className="details-job-main__chip">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="details-job-main__empty"><Trans>No skills listed yet.</Trans></p>
              )}
            </div>

            <div className="details-job-main__chip-section">
              <h3><Trans>Benefits</Trans></h3>
              {benefits.length > 0 ? (
                <div className="details-job-main__chips">
                  {benefits.map((benefit) => (
                    <span key={benefit} className="details-job-main__chip">
                      {benefit}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="details-job-main__empty">
                  <Trans>No benefits listed yet.</Trans>
                </p>
              )}
            </div>
          </div>
        </article>

        <article className="details-job-main__card">
          <h2><Trans>Hiring information</Trans></h2>
          <p className="details-job-main__card-intro">
            <Trans>
              Owner-facing details for the posting lifecycle and candidate
              communication.
            </Trans>
          </p>
          <ul className="details-job-main__meta-list">
            <li>
              <span><Trans>Posted by</Trans></span>
              <strong>{jobDetails?.createdBy?.email || t`Deleted user`}</strong>
            </li>
            <li>
              <span><Trans>Application deadline</Trans></span>
              <strong>{deadline}</strong>
            </li>
            <li>
              <span><Trans>Language requirements</Trans></span>
              <strong>{getDisplayValue(jobDetails?.languageRequirements)}</strong>
            </li>
            <li>
              <span><Trans>Education level</Trans></span>
              <strong>{getDisplayValue(jobDetails?.educationLevel)}</strong>
            </li>
            <li>
              <span><Trans>Updated at</Trans></span>
              <strong>{updatedAt}</strong>
            </li>
            <li>
              <span><Trans>Views</Trans></span>
              <strong>{getDisplayValue(jobDetails?.views)}</strong>
            </li>
          </ul>
        </article>

        <article className="details-job-main__card">
          <h2><Trans>Requirements and notes</Trans></h2>
          <p className="details-job-main__card-intro">
            <Trans>
              Keep the longer hiring context readable instead of burying it in a
              single block.
            </Trans>
          </p>
          <p className="details-job-main__prose">
            {jobDetails?.requirements?.trim() ||
              jobDetails?.additionalInfo?.trim() ||
                t`No extra requirements or notes were added for this role yet.`}
          </p>
        </article>
      </div>
    </section>
    </>
  );
}

export default DetailsJobMainSection;
