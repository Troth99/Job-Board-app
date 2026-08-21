import "../../styles/detailsJobMainSection.css";
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
    return "Not specified";
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
    "No public description has been added for this role yet.";

  const statusLabel = jobDetails?.isActive ? "Active" : "Closed";

  // Format the updatedAt date or provide a default message if not available
  const updatedAt = jobDetails?.updatedAt
    ? formatDate(jobDetails.updatedAt, "en-US")
    : "Not updated yet";

    // Format the applicationDeadline date or provide a default message if not available
  const deadline = jobDetails?.applicationDeadline
    ? formatDate(jobDetails.applicationDeadline, "en-US")
    : "Open until filled";

  const seo = () => generateSeoConfig("jobDetails", jobDetails?.title || "Job Details");
  return (
    <>
     <MetaData seo={seo()} />
    <section className="details-job-main">
      <article className="details-job-main__hero">
        <div className="details-job-main__eyebrow-row">
          <span className="details-job-main__eyebrow">Position overview</span>
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
              <span>Location</span>
              <strong>{getDisplayValue(jobDetails?.location)}</strong>
            </li>
            <li>
              <span>Salary</span>
              <strong>{getDisplayValue(jobDetails?.salary)}</strong>
            </li>
            <li>
              <span>Category</span>
              <strong>{getDisplayValue(jobDetails?.category?.name)}</strong>
            </li>
            <li>
              <span>Employment</span>
              <strong>{getDisplayValue(jobDetails?.employmentType)}</strong>
            </li>
          </ul>
        </div>
      </article>

      <div className="details-job-main__grid">
        <article className="details-job-main__card">
          <h2>Role details</h2>
          <p className="details-job-main__card-intro">
            A compact snapshot of the core terms and expectations for the
            position.
          </p>
          <ul className="details-job-main__details-list">
            <li>
              <span>Work mode</span>
              <strong>{getDisplayValue(jobDetails?.workMode)}</strong>
            </li>
            <li>
              <span>Contract type</span>
              <strong>{getDisplayValue(jobDetails?.contractType)}</strong>
            </li>
            <li>
              <span>Schedule</span>
              <strong>{getDisplayValue(jobDetails?.workSchedule)}</strong>
            </li>
            <li>
              <span>Experience level</span>
              <strong>{getDisplayValue(jobDetails?.experienceLevel)}</strong>
            </li>
            <li>
              <span>Experience years</span>
              <strong>
                {getDisplayValue(jobDetails?.requiredExperienceYears)}
              </strong>
            </li>
            <li>
              <span>Openings</span>
              <strong>{getDisplayValue(jobDetails?.openings)}</strong>
            </li>
          </ul>
        </article>

        <article className="details-job-main__card details-job-main__card--accent">
          <h2>Skills and benefits</h2>
          <p className="details-job-main__card-intro">
            Candidate-facing strengths, perks, and extra incentives for the role.
          </p>

          <div className="details-job-main__chip-group">
            <div className="details-job-main__chip-section">
              <h3>Skills</h3>
              {skills.length > 0 ? (
                <div className="details-job-main__chips">
                  {skills.map((skill) => (
                    <span key={skill} className="details-job-main__chip">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="details-job-main__empty">No skills listed yet.</p>
              )}
            </div>

            <div className="details-job-main__chip-section">
              <h3>Benefits</h3>
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
                  No benefits listed yet.
                </p>
              )}
            </div>
          </div>
        </article>

        <article className="details-job-main__card">
          <h2>Hiring information</h2>
          <p className="details-job-main__card-intro">
            Owner-facing details for the posting lifecycle and candidate
            communication.
          </p>
          <ul className="details-job-main__meta-list">
            <li>
              <span>Posted by</span>
              <strong>{jobDetails?.createdBy?.email || "Deleted user"}</strong>
            </li>
            <li>
              <span>Application deadline</span>
              <strong>{deadline}</strong>
            </li>
            <li>
              <span>Language requirements</span>
              <strong>{getDisplayValue(jobDetails?.languageRequirements)}</strong>
            </li>
            <li>
              <span>Education level</span>
              <strong>{getDisplayValue(jobDetails?.educationLevel)}</strong>
            </li>
            <li>
              <span>Updated at</span>
              <strong>{updatedAt}</strong>
            </li>
            <li>
              <span>Views</span>
              <strong>{getDisplayValue(jobDetails?.views)}</strong>
            </li>
          </ul>
        </article>

        <article className="details-job-main__card">
          <h2>Requirements and notes</h2>
          <p className="details-job-main__card-intro">
            Keep the longer hiring context readable instead of burying it in a
            single block.
          </p>
          <p className="details-job-main__prose">
            {jobDetails?.requirements?.trim() ||
              jobDetails?.additionalInfo?.trim() ||
              "No extra requirements or notes were added for this role yet."}
          </p>
        </article>
      </div>
    </section>
    </>
  );
}

export default DetailsJobMainSection;
