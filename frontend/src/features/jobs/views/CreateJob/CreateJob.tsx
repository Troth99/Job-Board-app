import { useState } from "react";
import "./CreateJob.css";
import {
  EmploymentTypeSelect,
  ExperienceLevelSelect,
  JobCategorySelect,
  WorkModeSelect,
} from "../../form/formSelectedInputs";
import useJobs from "../../hooks/useJobsAPI";
import { showSuccess } from "../../../../shared/utils/toast";
import { Link, useNavigate, useParams } from "react-router";

import { jobPostValidations } from "../../validators/createJobValidation";
import { jobValidationMessages } from "../../validators/jobValidationMessages";
import useForm from "../../../../shared/hooks/useForm";
import { valuesInterface } from "../../types/Job.model";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import { Trans, useLingui } from "@lingui/react/macro";

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


function PostJob() {
  const { companyId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { createJob } = useJobs();
  const { t } = useLingui();



  const validateForm = (values: valuesInterface) =>
    jobPostValidations(values, jobValidationMessages);

  const onSubmitHandler = async (values: valuesInterface) => {
    setLoading(true);
    try {
      await createJob(values);
      showSuccess(t`Job posted successfully!`);
      navigate(`/company/${companyId}/dashboard`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(t`Something went wrong while posting job.`);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const { register, formHandler, errors, setFieldValue } =
    useForm<valuesInterface>(onSubmitHandler, initialValues, validateForm);

    const seo = () => generateSeoConfig("postJob");
    return (
      <>
        <MetaData seo={seo()} />

        <div className="post-job-container">
      <h2><Trans>Post a New Job</Trans></h2>
      <Link to={`/how-to-post-job`} className="back-link">
        <span className="back-link__spark" aria-hidden="true">
          <Trans>Guide</Trans>
        </span>
        <span className="back-link__content">
          <span className="back-link__title"><Trans>Need help filling the form?</Trans></span>
          <span className="back-link__text">
            <Trans>Open the job posting guide with examples for every field.</Trans>
          </span>
        </span>
        <span className="back-link__arrow" aria-hidden="true">
          &rarr;
        </span>
      </Link>
      <form className="post-job-form" onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="title"><Trans>Job Title</Trans></label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder={t`Job Title`}
          />
          <div className="error-message">{errors.title}</div>
        </div>

        <div className="form-group">
          <label htmlFor="description"><Trans>Job Description</Trans></label>
          <textarea
            id="description"
            placeholder={t`Job Description`}
            {...register("description")}
          ></textarea>
          <div className="error-message">{errors.description}</div>
        </div>

        <div className="form-group">
          <label htmlFor="additionalInfo">
            <Trans>Additional Information</Trans>{" "}
            <span className="optional-badge"><Trans>Optional</Trans></span>
          </label>
          <textarea
            id="additionalInfo"
            placeholder={t`e.g., We are happy to review your application and contact shortlisted candidates.`}
            {...register("additionalInfo")}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location"><Trans>Location</Trans></label>
          <input
            type="text"
            id="location"
            {...register("location")}
          />
          <div className="error-message">{errors.location}</div>
        </div>

        <div className="form-group">
          <label htmlFor="salary"><Trans>Salary</Trans></label>
          <input
            type="text"
            id="salary"
            {...register("salary")}
          />
          <div className="error-message">{errors.salary}</div>
        </div>

        <div className="form-group">
          <label htmlFor="workMode"><Trans>Work Mode</Trans></label>
          <WorkModeSelect
            value={register("workMode").value}
            onChange={(e) => setFieldValue("workMode", e.target.value)}
          />
          <div className="error-message">{errors.workMode}</div>
        </div>

        <div className="form-group">
          <label htmlFor="salary"><Trans>Category</Trans></label>
          <JobCategorySelect
            value={register("category").value || ""}
            onChange={(e) => setFieldValue("category", e.target.value)}
          />
          <div className="error-message">
            {typeof errors.category === "string" ? errors.category : ""}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="salary"><Trans>Employment Type</Trans></label>
          <EmploymentTypeSelect
            value={register("employmentType").value}
            onChange={(e) => setFieldValue("employmentType", e.target.value)}
          />
          <div className="error-message">{errors.employmentType}</div>
        </div>

        <div className="form-group">
          <label htmlFor="experienceLevel"><Trans>Experience Requirement</Trans></label>
          <ExperienceLevelSelect
            value={register("experienceLevel").value}
            onChange={(e) => setFieldValue("experienceLevel", e.target.value)}
          />
          <div className="error-message">{errors.experienceLevel}</div>
        </div>

        <div className="form-group">
          <label htmlFor="applicationDeadline">
            <Trans>Application Deadline</Trans>{" "}
            <span className="optional-badge"><Trans>Optional</Trans></span>
          </label>
          <input
            type="date"
            id="applicationDeadline"
            {...register("applicationDeadline")}
          />
          <div className="error-message">{errors.applicationDeadline}</div>
        </div>

        <div className="form-group">
          <label htmlFor="openings"><Trans>Open Positions</Trans></label>
          <input
            type="number"
            id="openings"
            min="1"
            placeholder={t`e.g., 3`}
            {...register("openings")}
          />
          <div className="error-message">{errors.openings}</div>
        </div>


        <div className="form-group">
          <label htmlFor="workSchedule">
            <Trans>Work Schedule</Trans> <span className="optional-badge"><Trans>Optional</Trans></span>
          </label>
          <input
            type="text"
            id="workSchedule"
            placeholder={t`e.g., Morning shift, 09:00-18:00`}
            {...register("workSchedule")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="languageRequirements">
            <Trans>Language Requirements</Trans>{" "}
            <span className="optional-badge"><Trans>Optional</Trans></span>
          </label>
          <input
            type="text"
            id="languageRequirements"
            placeholder={t`e.g., English B2, German A2`}
            {...register("languageRequirements")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="educationLevel"><Trans>Education Level</Trans></label>
          <input
            type="text"
            id="educationLevel"
            placeholder={t`e.g., High School, Bachelor, Not required`}
            {...register("educationLevel")}
          />
          <div className="error-message">{errors.educationLevel}</div>
        </div>

        <div className="form-group">
          <label htmlFor="requirements"><Trans>Requirements (comma separated)</Trans></label>
          <input
            type="text"
            id="requirements"
            placeholder={t`e.g., Customer service, Driving license B, Excel`}
            {...register("requirements")}
          />
          <div className="error-message">{errors.requirements}</div>
        </div>

        <div className="form-group">
          <label htmlFor="benefits">
            <Trans>Benefits (comma separated)</Trans>{" "}
            <span className="optional-badge"><Trans>Optional</Trans></span>
          </label>
          <input
            type="text"
            id="benefits"
            placeholder={t`e.g., Health Insurance, Remote Work`}
            {...register("benefits")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail"><Trans>Contact Email</Trans></label>
          <input
            type="email"
            id="contactEmail"
            placeholder={t`e.g., example@example.com`}
            {...register("email")}
          />
          <div className="error-message">{errors.email}</div>
        </div>

        <button type="submit" className="post-job-button" disabled={loading}>
          {loading ? t`Posting job...` : t`Post job`}
        </button>
      </form>
    </div>
      </>
    );
}

export default PostJob;
