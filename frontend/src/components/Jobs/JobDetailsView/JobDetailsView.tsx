import { useLocation, useParams } from "react-router";
import useJobs from "../../../hooks/utils/useJobBoard";
import "./JobDetailsView.css";
import { useEffect, useState } from "react";
import { Job } from "../../../interfaces/Job.model";
import Spinner from "../../Spinner/Spinner";
import { useLocalStorage } from "../../../hooks/shared/useLocalStorage";
import { ApplyForJobModal } from "../ApplyForJobModal/ApplyForJobModal";
import { getUserFromLocalStorage } from "../../../hooks/shared/useAuth";
import { Container } from "../../Container/Container";
import { CompanyDetails } from "./CompanyDetails/CompanyDetails";
import { QucikInfoSection } from "./CompanyDetails/qucikInfoSection/QuicnInfoSection";

function normalizeToArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export default function CandidateJobView() {
  const { jobId } = useParams();
  const location = useLocation();
  const { loading, getJobById } = useJobs();
  const [jobData, setJobData] = useState<Job>();
  const [token] = useLocalStorage<string>("user", "");
  const isLoggedIn = !!token;
  const [showApplyModal, setShowApplyModal] = useState(false);
  const user = getUserFromLocalStorage();
  if (!jobId) {
    return;
  }

  const isCompanyMember = jobData?.company?.members?.includes(user._id);
  const skills = normalizeToArray(jobData?.skills || jobData?.requirements);
  const benefits = normalizeToArray(jobData?.benefits);
  const tags = normalizeToArray(jobData?.tags);
  const categoryLabel =
    typeof jobData?.category === "string"
      ? jobData.category
      : jobData?.category?.name || "N/A";

      
  const additionalInfoText =
    typeof jobData?.additionalInfo === "string" &&
    jobData.additionalInfo.trim().length > 0
      ? jobData.additionalInfo
      : "We would be happy to review your application. If your profile is a good fit, our team will contact you for the next steps.";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!jobId) {
          console.error("Job id is missing.");
          return;
        }

        const response = await getJobById(jobId);
        setJobData(response);
      } catch (error) {
        console.error("Failed to fetch jobs.");
      }
    };
    fetchData();
  }, [jobId]);

  if (loading) {
    return <Spinner overlay={true} />;
  }
  return (
    <Container>
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
              <h2>More information</h2>
              <p className="more-info-text">{additionalInfoText}</p>
              <p className="more-info-note">
                Please make sure your CV and contact details are up to date
                before applying.
              </p>
              {jobData?.email && (
                <p className="more-info-contact">
                  Questions about this role? Contact us at{" "}
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
              <h2>Job description</h2>
              <p>{jobData?.description || "No description provided yet."}</p>
            </section>

            <section className="job-card">
              <h2>Position details</h2>
              <ul className="details-list">
                <li>
                  <span>Category</span>
                  <strong>{categoryLabel}</strong>
                </li>
                <li>
                  <span>Work mode</span>
                  <strong>{jobData?.workMode || "N/A"}</strong>
                </li>
                <li>
                  <span>Employment type</span>
                  <strong>{jobData?.employmentType || "N/A"}</strong>
                </li>
                <li>
                  <span>Experience level</span>
                  <strong>{jobData?.experienceLevel || "N/A"}</strong>
                </li>

                <li>
                  <span>Open positions</span>
                  <strong>{jobData?.openings || "N/A"}</strong>
                </li>
                <li>
                  <span>Contract type</span>
                  <strong>{jobData?.contractType || "N/A"}</strong>
                </li>
                <li>
                  <span>Work schedule</span>
                  <strong>{jobData?.workSchedule || "N/A"}</strong>
                </li>
                <li>
                  <span>Language requirements</span>
                  <strong>{jobData?.languageRequirements || "N/A"}</strong>
                </li>
                <li>
                  <span>Education level</span>
                  <strong>{jobData?.educationLevel || "N/A"}</strong>
                </li>
                <li>
                  <span>Application deadline</span>
                  <strong>{jobData?.applicationDeadline || "N/A"}</strong>
                </li>
                <li>
                  <span>Contact email</span>
                  <strong>{jobData?.email || "N/A"}</strong>
                </li>
              </ul>
            </section>

            <section className="job-card">
              <h2>Required skills</h2>
              {skills.length > 0 ? (
                <ul className="chip-list">
                  {skills.map((item, index) => (
                    <li key={item + "-" + index} className="chip-item">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">No skills listed.</p>
              )}
            </section>

            <section className="job-card">
              <h2>Benefits</h2>
              {benefits.length > 0 ? (
                <ul className="chip-list">
                  {benefits.map((item, index) => (
                    <li key={item + "-" + index} className="chip-item">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">No benefits listed.</p>
              )}
            </section>
          </main>
        </div>

        {showApplyModal && (
          <ApplyForJobModal
            jobId={jobId}
            jobTitle={jobData?.title}
            onClose={() => setShowApplyModal(false)}
          />
        )}
      </section>
    </Container>
  );
}
