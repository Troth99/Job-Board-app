import { Job } from "../../../../interfaces/Job.model";
import { formatDate } from "../../../../utils/formData";

function DetailsJobMainSection({
  jobDetails,
}: {
  jobDetails: Job | undefined;
}) {
    
  return (
    <div className="job-overview">
      <div className="job-title">
        <h3>Job Title: {jobDetails?.title}</h3>
      </div>
      <div className="job-description">
        <p>{jobDetails?.description}</p>
      </div>
      <div className="job-location-salary">
        <div>
          <strong>Location:</strong> {jobDetails?.location}
        </div>
        <div>
          <strong>Salary:</strong> {jobDetails?.salary}
        </div>
      </div>
      <div className="job-category-type">
        <div>
          <strong>Job Category:</strong> {jobDetails?.category?.name}
        </div>
        <div>
          <strong>Employment Type:</strong> {jobDetails?.employmentType}
        </div>
      </div>
      <div className="job-skills-benefits">
        <div>
          <strong>Skills:</strong> {jobDetails?.skills}
        </div>
        <div>
          <strong>Benefits:</strong> {jobDetails?.benefits}
        </div>
      </div>
      <div className="job-skills-benefits">
        <div>
          <strong>Posted By:</strong>{" "}
          {jobDetails?.createdBy?.email || "Deleted user."}
        </div>
        <div>
          <strong>Job Status:</strong>{" "}
          {jobDetails?.isActive ? "Active" : "Closed"}
        </div>
        <div>
          <strong>Updated at:</strong>{" "}
          {formatDate(jobDetails?.updatedAt || "", "en-US")}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default DetailsJobMainSection;
