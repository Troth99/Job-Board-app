import {useLocation, useParams } from "react-router";
import useJobs from "../../../hooks/useJobs";
import "./JobDetailsView.css";
import { useEffect, useState } from "react";
import { Job } from "../../../interfaces/Job.model";
import Spinner from "../../Spinner/Spinner";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ApplyForJobModal } from "../ApplyForJobModal/ApplyForJobModal";
import { getUserFromLocalStorage } from "../../../hooks/useAuth";
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
  const skills = normalizeToArray(jobData?.skills);
  const benefits = normalizeToArray(jobData?.benefits);
  const tags = normalizeToArray(jobData?.tags);

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
          </aside>

          <main className="job-main">
            <header className="job-hero">
              <h1 className="job-title">{jobData?.title || "Untitled position"}</h1>
              <p className="job-subtitle">Posted by {jobData?.createdBy?.email || "N/A"}</p>
              <div className="job-hero-meta">
                <span className="meta-chip">Category: {jobData?.category?.name || "N/A"}</span>
                <span className="meta-chip">Type: {jobData?.employmentType || "N/A"}</span>
                <span className="meta-chip">Location: {jobData?.location || "N/A"}</span>
                <span className="meta-chip">Salary: {jobData?.salary || "N/A"}</span>
              </div>
            </header>

            <section className="job-card">
              <h2>Job description</h2>
              <p>{jobData?.description || "No description provided yet."}</p>
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

            <section className="job-card">
              <h2>Tags</h2>
              {tags.length > 0 ? (
                <ul className="chip-list">
                  {tags.map((item, index) => (
                    <li key={item + "-" + index} className="chip-item chip-tag">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">No tags listed.</p>
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
