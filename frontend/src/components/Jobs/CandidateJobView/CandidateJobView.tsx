import { Link, useParams } from "react-router";

import useJobs from "../../../hooks/useJobs";
import "./CandidateJob.css";
import { useEffect, useState } from "react";
import { Job } from "../../../interfaces/Job.model";
import { formatDate } from "../../../utils/formData";
import Spinner from "../../Spinner/Spinner";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ApplyForJobModal } from "../ApplyForJobModal/ApplyForJobModal";

export function CandidateJobView() {
  const { jobId } = useParams();
  const { loading, getJobById } = useJobs();
  const [jobData, setJobData] = useState<Job>();
  const [token] = useLocalStorage<string>("user", "");
  const isLoggedIn = !!token;
  const [showApplyModal, setShowApplyModal] = useState(false);

  if(!jobId) {
    return
  }
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
    <div className="candidate-job-view-container">
      <div className="company-details-card">
        <div className="company-header">
          <img
            src={
              jobData?.company?.logo && jobData.company.logo.trim() !== ""
                ? jobData.company.logo
                : "/assets/defaultCompany.png"
            }
            alt={
              jobData?.company?.logo && jobData.company.logo.trim() !== ""
                ? jobData.company.name
                : "Default Company Logo"
            }
            className="company-logo"
          />
          <div>
            <h3 className="company-name">{jobData?.company?.name}</h3>
            <span className="company-industry">
              Industry: {jobData?.company?.industry}
            </span>
            <span className="company-size">
              Size: {jobData?.company?.size} employers
            </span>
            <span className="company-founded">
              Founded: {formatDate(jobData?.company?.createdAt ?? "")}
            </span>
          </div>
        </div>
        <div className="company-meta">
          <span className="company-location">
            Location: {jobData?.company?.location}
          </span>
          <span className="company-website">
            Website:{" "}
            <a
              href={jobData?.company?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {jobData?.company?.website}{" "}
            </a>
          </span>
        </div>
        <div className="company-description-data">
          <p>{jobData?.company?.description}</p>
        </div>
      </div>
      <div className="job-header">
        <h2 className="job-title">{jobData?.title}</h2>
        <span className="job-category">
          Category: {jobData?.category?.name}
        </span>
        <span className="job-type">Type: {jobData?.employmentType}</span>
      </div>
      <div className="job-meta">
        <span className="job-location">Location: {jobData?.location}</span>
        <span className="job-salary">Salary: {jobData?.salary}</span>
        <span className="job-date">
          Posted at: {formatDate(jobData?.createdAt ?? "")}
        </span>
        <span className="job-date">Posted by: {jobData?.createdBy?.email}</span>
      </div>
      <div className="job-description">
        <h3>Job Description & Expectations</h3>
        <p>{jobData?.description}</p>
      </div>
      <div className="job-skills">
        <h3>Required skills</h3>
        <ul>
          {Array.isArray(jobData?.skills)
            ? jobData.skills.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            : null}
        </ul>
      </div>
      <div className="job-benefits">
        <h3>Benefits</h3>
        <ul>
          {Array.isArray(jobData?.benefits)
            ? jobData.benefits.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            : null}
        </ul>
      </div>
      <div className="job-benefits">
        <h3>Tags</h3>
        <ul>
          {Array.isArray(jobData?.tags)
            ? jobData.tags.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))
            : null}
        </ul>
      </div>
      <span className={`job-status ${jobData?.isActive ? "active" : "closed"}`}>
        Status: {jobData?.isActive ? "Active" : "Closed"}
      </span>
      <div className="job-apply">
        {isLoggedIn ? (
          <>
            <button
              className="apply-button"
              onClick={() => setShowApplyModal(true)}
            >
              Apply Now
            </button>
            {showApplyModal && (
              <ApplyForJobModal
                jobId={jobId}
                jobTitle={jobData?.title}
                onClose={() => setShowApplyModal(false)}
              />
            )}
          </>
        ) : (
          <>
            <button className="apply-button" disabled>
              You must log in in order to apply for job
            </button>
            <div style={{ marginTop: "8px" }}>
              <Link
                to="/login"
                state={{ from: location.pathname }}
                className="login-btn"
              >
                Log in to apply
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
