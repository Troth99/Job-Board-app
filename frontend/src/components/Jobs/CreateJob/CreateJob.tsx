import "./CreateJob.css";
import { useState } from "react";
import "./CreateJob.css";
import { EmploymentTypeSelect, ExperienceLevelSelect, JobCategorySelect } from "../formSelectedInputs";
import useJobs from "../../../hooks/useJobs";
import { showSuccess } from "../../../utils/toast";
import { useNavigate, useParams } from "react-router";

import { jobPostValidations } from "../../validators/postJobValidation";
import useForm from "../../../hooks/useForm";
import { valuesInterface } from "../../../interfaces/Job.model";

const initialValues = {
  title: "",
  description: "",
  location: "",
  salary: "",
  category: {
    _id: "",
    name: "",
    shortName: "",
  },
  employmentType: "",
  skills: "",
  benefits: [],
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
};
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
      <form className="post-job-form" onSubmit={formHandler}>
   

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
          <select
            id="workMode"
            value={register("workMode").value}
            onChange={(e) => setFieldValue("workMode", e.target.value)}
          >
            <option value="">Select Work Mode</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          <div className="error-message">{errors.workMode}</div>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Category</label>
          <JobCategorySelect
            value={register("category").value?._id}
            onChange={(e) => setFieldValue("category", e.target.value)}
          />
        </div>

    <div className="form-group">
          <label htmlFor="salary">Employment Type</label>
      <EmploymentTypeSelect
          value={register("employmentType").value}
          onChange={(e) => setFieldValue("employmentType", e.target.value)}
        />
        </div>

        <div className="form-group">
          <label htmlFor="experienceLevel">Experience Requirement</label>
        <ExperienceLevelSelect
          value={register("experienceLevel").value}
          onChange={(e) => setFieldValue("experienceLevel", e.target.value)}
        />
        </div>

        <div className="form-group">
          <label htmlFor="requiredExperienceYears">Required Experience (years)</label>
          <input
            type="number"
            id="requiredExperienceYears"
            min="0"
            placeholder="e.g., 2"
            {...register("requiredExperienceYears")}
          />
          <div className="error-message">{errors.requiredExperienceYears}</div>
        </div>

        <div className="form-group">
          <label htmlFor="applicationDeadline">Application Deadline</label>
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
          <label htmlFor="contractType">Contract Type</label>
          <input
            type="text"
            id="contractType"
            placeholder="e.g., Permanent, Temporary, Internship"
            {...register("contractType")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="workSchedule">Work Schedule</label>
          <input
            type="text"
            id="workSchedule"
            placeholder="e.g., Morning shift, 09:00-18:00"
            {...register("workSchedule")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="languageRequirements">Language Requirements</label>
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
        </div>
      
        <div className="form-group">
          <label htmlFor="skills">Requirements (comma separated)</label>
          <input
            type="text"
            id="skills"
            placeholder="e.g., Customer service, Driving license B, Excel"
            {...register("skills")}
          />
          <div className="error-message">{errors.skills}</div>
        </div>

        <div className="form-group">
          <label htmlFor="benefits">Benefits (comma separated)</label>
          <input
            type="text"
            id="benefits"
            placeholder="e.g., Health Insurance, Remote Work"
            {...register("benefits")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            placeholder="e.g., Full-time, Weekend shifts, Immediate start"
            {...register("tags")}
          />
          <div className="error-message">{errors.tags}</div>
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
