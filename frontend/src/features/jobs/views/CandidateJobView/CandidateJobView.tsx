import { useLocation, useParams } from "react-router";
import useJobs from "../../hooks/useJobsAPI";
import "./CandidateJobView.css";
import { useEffect, useState } from "react";
import { Job } from "../../types/Job.model";
import { DetailPageSkeleton } from "../../../../shared/components/Skeleton/Skeleton";
import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import { ApplyForJobModal } from "../../components/ApplyForJobModal/ApplyForJobModal";
import { getUserFromLocalStorage } from "../../../auth/hooks/useAuth";
import { Container } from "../../../../shared/components/Container/Container";
import { CompanyDetails } from "./CompanyDetailsForJobSection/CompanyDetailsViewforJobs";
import { QucikInfoSection } from "./CompanyDetailsForJobSection/QuicnInfoSection";
import useProfile from "../../../profile/hooks/useProfile";
import DeactivatedJobView from "../../components/DeactivatedJobView/DeactivatedJob";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";


//to check if the data is beign passed correctly
function normalizeToArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  // If the value is a string, split it by commas and trim each item
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export default function CandidateJobView() {
  const { userData } = useProfile();
  const { jobId } = useParams();
  const location = useLocation();
  const { loading, getJobById } = useJobs();
  const [jobData, setJobData] = useState<Job>();
  const [isJobActive, setIsJobActive] = useState<boolean | undefined>(undefined);

  const [token] = useLocalStorage<string>("user", "");

  const isLoggedIn = !!token;

  const [showApplyModal, setShowApplyModal] = useState(false);
  const user = getUserFromLocalStorage();

  const isCompanyMember = user?._id
    ? jobData?.company?.members?.includes(user._id)
    : false;

  const skills = normalizeToArray(jobData?.skills || jobData?.requirements);
  const benefits = normalizeToArray(jobData?.benefits);

  const categoryLabel =
    typeof jobData?.category === "string"
      ? jobData.category
      : jobData?.category?.name || "N/A";

  const additionalInfoText =
    typeof jobData?.additionalInfo === "string" &&
    jobData.additionalInfo.trim().length > 0
      ? jobData.additionalInfo
      : t`We would be happy to review your application. If your profile is a good fit, our team will contact you for the next steps.`;

  if (!jobId) {
    console.error("Job id is missing.");
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!jobId) {
          console.error("Job id is missing.");
          return;
        }

        const response = await getJobById(jobId);
        setIsJobActive(response.isActive);
        setJobData(response);
      } catch (error) {
        console.error("Failed to fetch jobs.");
      }
    };
    fetchData();
  }, [jobId]);

  if (loading) {
    return (
      <Container>
        <DetailPageSkeleton />
      </Container>
    );
  }
  return (
    <Container>
      {isJobActive === false ?
      <DeactivatedJobView /> :
      
      <section className="job-details-page">
        <div className="job-board-layout">
          <aside className="job-sidebar">
            {jobData?.company && <CompanyDetails company={jobData.company} />}

            <QucikInfoSection
              jobData={jobData}
              isLoggedIn={isLoggedIn}
              isCompanyMember={isCompanyMember}
              setShowApplyModal={setShowApplyModal}
              jobId={jobId}
              location={location}
            />

            <section className="job-card job-card--more-info">
              <h2><Trans>More information</Trans></h2>
              <p className="more-info-text">{additionalInfoText}</p>
              <p className="more-info-note">
                <Trans>Please make sure your CV and contact details are up to date
                before applying.</Trans>
              </p>
              {jobData?.email && (
                <p className="more-info-contact">
                  <Trans>Questions about this role? Contact us at{" "}</Trans>
                  <a href={`mailto:${jobData.email}`}>{jobData.email}</a>
                </p>
              )}
            </section>
          </aside>

          <main className="job-main">
            <header className="job-hero">
              <h1 className="job-title">
                {jobData?.title || "Untitled position"}
              </h1>
            </header>

            <section className="job-card">
              <h2><Trans>Job description</Trans></h2>
              <p>{jobData?.description || t`No description provided yet.`}</p>
            </section>

            <section className="job-card">
              <h2><Trans>Position details</Trans></h2>
              <ul className="details-list">
                <li>
                  <span><Trans>Category</Trans></span>
                  <strong>{categoryLabel}</strong>
                </li>
                <li>
                  <span><Trans>Work mode</Trans></span>
                  <strong>{jobData?.workMode || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Employment type</Trans></span>
                  <strong>{jobData?.employmentType || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Experience level</Trans></span>
                  <strong>{jobData?.experienceLevel || "N/A"}</strong>
                </li>

                <li>
                  <span><Trans>Open positions</Trans></span>
                  <strong>{jobData?.openings || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Contract type</Trans></span>
                  <strong>{jobData?.contractType || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Work schedule</Trans></span>
                  <strong>{jobData?.workSchedule || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Language requirements</Trans></span>
                  <strong>{jobData?.languageRequirements || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Education level</Trans></span>
                  <strong>{jobData?.educationLevel || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Application deadline</Trans></span>
                  <strong>{jobData?.applicationDeadline || "N/A"}</strong>
                </li>
                <li>
                  <span><Trans>Contact email</Trans></span>
                  <strong>{jobData?.email || "N/A"}</strong>
                </li>
              </ul>
            </section>

            <section className="job-card">
              <h2><Trans>Required skills</Trans></h2>
              {skills.length > 0 ? (
                <ul className="chip-list">
                  {skills.map((item, index) => (
                    <li key={item + "-" + index} className="chip-item">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text"><Trans>No skills listed.</Trans></p>
              )}
            </section>

            <section className="job-card">
              <h2><Trans>Benefits</Trans></h2>
              {benefits.length > 0 ? (
                <ul className="chip-list">
                  {benefits.map((item, index) => (
                    <li key={item + "-" + index} className="chip-item">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text"><Trans>No benefits listed.</Trans></p>
              )}
            </section>
          </main>
        </div>

        {showApplyModal && userData && (
          <ApplyForJobModal
            jobId={jobId}
            jobTitle={jobData?.title}
            onClose={() => setShowApplyModal(false)}
            userData={userData}
          />
        )}
      </section>
      }
    </Container>
  );
}
