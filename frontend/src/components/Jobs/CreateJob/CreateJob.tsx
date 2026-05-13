import "./CreateJob.css";
import { useState } from "react";
import "./CreateJob.css";
import {
  EmploymentTypeSelect,
  ExperienceLevelSelect,
  JobCategorySelect,
  WorkModeSelect,
} from "../formSelectedInputs";
import useJobs from "../../../hooks/useJobs";
import { showSuccess } from "../../../utils/toast";
import { Link, useNavigate, useParams } from "react-router";

import { jobPostValidations } from "../../validators/createJobValidation";
import useForm from "../../../hooks/useForm";
import { valuesInterface } from "../../../interfaces/Job.model";

const initialValues = {
  title: "",
  description: "",
  location: "",
  salary: "",
  category: "",
  employmentType: "",
  requirements: "",
  benefits: "",
  tags: "",
  email: "",
  workMode: "",
  experienceLevel: "",
  requiredExperienceYears: "",
  applicationDeadline: "",
  openings: "",
  contractType: "",
  workSchedule: "",
  languageRequirements: "",
  educationLevel: "",
  additionalInfo: "",
};

//make a sample example with information how to psot a job and tamstamp and explanation on the forms.
//add a different route to it and add a link to it from company dashboard. Add a button to post job in company dashboard and link it to the route of create job form.

function PostJob() {
  const { companyId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { createJob } = useJobs();

  const validateForm = (values: valuesInterface) => jobPostValidations(values);

  const onSubmitHandler = async (values: valuesInterface) => {
    setLoading(true);
    try {
      await createJob(values);
      showSuccess("Job posted successfully!");
      navigate(`/company/${companyId}/dashboard`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Somethign went wrong while posting job.");
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const { register, formHandler, errors, setFieldValue } =
    useForm<valuesInterface>(onSubmitHandler, initialValues, validateForm);

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <Link to={`/how-to-post-job`} className="back-link">
        <span className="back-link__spark" aria-hidden="true">
          Guide
        </span>
        <span className="back-link__content">
          <span className="back-link__title">Need help filling the form?</span>
          <span className="back-link__text">
            Open the job posting guide with examples for every field.
          </span>
        </span>
        <span className="back-link__arrow" aria-hidden="true">
          &rarr;
        </span>
      </Link>
      <form className="post-job-form" onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Job Title"
          />
          <div className="error-message">{errors.title}</div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            placeholder="Job Description"
            {...register("description")}
          ></textarea>
          <div className="error-message">{errors.description}</div>
        </div>

        <div className="form-group">
          <label htmlFor="additionalInfo">
            Additional Information{" "}
            <span className="optional-badge">Optional</span>
          </label>
          <textarea
            id="additionalInfo"
            placeholder="e.g., We are happy to review your application and contact shortlisted candidates."
            {...register("additionalInfo")}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            {...register("location")}
          />
          <div className="error-message">{errors.location}</div>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            placeholder="Salary"
            {...register("salary")}
          />
          <div className="error-message">{errors.salary}</div>
        </div>

        <div className="form-group">
          <label htmlFor="workMode">Work Mode</label>
          <WorkModeSelect
            value={register("workMode").value}
            onChange={(e) => setFieldValue("workMode", e.target.value)}
          />
          <div className="error-message">{errors.workMode}</div>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Category</label>
          <JobCategorySelect
            value={register("category").value || ""}
            onChange={(e) => setFieldValue("category", e.target.value)}
          />
          <div className="error-message">
            {typeof errors.category === "string" ? errors.category : ""}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Employment Type</label>
          <EmploymentTypeSelect
            value={register("employmentType").value}
            onChange={(e) => setFieldValue("employmentType", e.target.value)}
          />
          <div className="error-message">{errors.employmentType}</div>
        </div>

        <div className="form-group">
          <label htmlFor="experienceLevel">Experience Requirement</label>
          <ExperienceLevelSelect
            value={register("experienceLevel").value}
            onChange={(e) => setFieldValue("experienceLevel", e.target.value)}
          />
          <div className="error-message">{errors.experienceLevel}</div>
        </div>

        <div className="form-group">
          <label htmlFor="applicationDeadline">
            Application Deadline{" "}
            <span className="optional-badge">Optional</span>
          </label>
          <input
            type="date"
            id="applicationDeadline"
            {...register("applicationDeadline")}
          />
          <div className="error-message">{errors.applicationDeadline}</div>
        </div>

        <div className="form-group">
          <label htmlFor="openings">Open Positions</label>
          <input
            type="number"
            id="openings"
            min="1"
            placeholder="e.g., 3"
            {...register("openings")}
          />
          <div className="error-message">{errors.openings}</div>
        </div>

        <div className="form-group">
          <label htmlFor="contractType">
            Contract Type <span className="optional-badge">Optional</span>
          </label>
          <input
            type="text"
            id="contractType"
            placeholder="e.g., Permanent, Temporary, Internship"
            {...register("contractType")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="workSchedule">
            Work Schedule <span className="optional-badge">Optional</span>
          </label>
          <input
            type="text"
            id="workSchedule"
            placeholder="e.g., Morning shift, 09:00-18:00"
            {...register("workSchedule")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="languageRequirements">
            Language Requirements{" "}
            <span className="optional-badge">Optional</span>
          </label>
          <input
            type="text"
            id="languageRequirements"
            placeholder="e.g., English B2, German A2"
            {...register("languageRequirements")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="educationLevel">Education Level</label>
          <input
            type="text"
            id="educationLevel"
            placeholder="e.g., High School, Bachelor, Not required"
            {...register("educationLevel")}
          />
          <div className="error-message">{errors.educationLevel}</div>
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements (comma separated)</label>
          <input
            type="text"
            id="requirements"
            placeholder="e.g., Customer service, Driving license B, Excel"
            {...register("requirements")}
          />
          <div className="error-message">{errors.requirements}</div>
        </div>

        <div className="form-group">
          <label htmlFor="benefits">
            Benefits (comma separated){" "}
            <span className="optional-badge">Optional</span>
          </label>
          <input
            type="text"
            id="benefits"
            placeholder="e.g., Health Insurance, Remote Work"
            {...register("benefits")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            placeholder="Contact Email"
            {...register("email")}
          />
          <div className="error-message">{errors.email}</div>
        </div>

        <button type="submit" className="post-job-button" disabled={loading}>
          {loading ? "Posting job..." : "Post job"}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
