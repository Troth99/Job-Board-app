import { useEffect, useState } from "react";
import "../CreateJob/CreateJob.css";
import { useNavigate, useParams } from "react-router";
import useJobs from "../../hooks/useJobsAPI";
import {
  EmploymentTypeSelect,
  ExperienceLevelSelect,
  JobEditCategory,
  WorkModeSelect,
} from "../../form/formSelectedInputs";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import { JobFormValues } from "../../types/Job.model";
import useForm from "../../../../shared/hooks/useForm";
import { jobPostValidations } from "../../validators/createJobValidation";
import { jobValidationMessages } from "../../validators/jobValidationMessages";
import { Trans, useLingui } from "@lingui/react/macro";

const initialValues = {
  title: "",
  description: "",
  location: "",
  salary: "",
  category: "",
  employmentType: "",
  skills: "",
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

const splitCommaSeparatedValues = (value?: string) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default function EditJob() {
  const { companyId, jobId } = useParams();
  const [jobData, setJobData] = useState<JobFormValues>(initialValues);
  const [pending, setPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { t } = useLingui();

  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const { getJobById, updateJob } = useJobs();

  const fetchCurrentJob = async () => {
    if (!jobId) {
      throw new Error("Job id is missing.");
    }
    try {
      const currentJob = await getJobById(jobId);

      if (Array.isArray(currentJob.benefits)) {
        currentJob.benefits = currentJob.benefits.join(", ");
      }

      if (Array.isArray(currentJob.skills)) {
        currentJob.skills = currentJob.skills.join(", ");
      }

      if (!currentJob.requirements && currentJob.skills) {
        currentJob.requirements = currentJob.skills;
      }

      if (currentJob.category && typeof currentJob.category === "object") {
        currentJob.category = currentJob.category._id;
      }

      if (currentJob.applicationDeadline) {
        currentJob.applicationDeadline = currentJob.applicationDeadline.split("T")[0];
      }

      setJobData(currentJob);
    } catch (error) {
      console.error("Unable to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCurrentJob();
      setLoading(false);
    };
    fetchData();
  }, [jobId, categories.length]);

  const editSubmitHandler = async (values: JobFormValues) => {
    setPending(true);

    try {
      if (!jobId) {
        console.error("Job ID is missing.");
        return;
      }
      await updateJob(jobId, {
        ...values,
        skills: splitCommaSeparatedValues(values.skills),
        updatedAt: new Date().toISOString(),
      });
      navigate(`/company/${companyId}/job/${jobId}/details`);
    } catch (error) {
      console.error("Failed to update job", error);
    } finally {
      setPending(false);
    }
  };

  const validateForm = (values: JobFormValues) =>
    jobPostValidations(values, jobValidationMessages);

  const { register, errors, formHandler, setFieldValue } = useForm(
    editSubmitHandler,
    jobData,
    validateForm,
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue("category", e.target.value);
  };

  return (
    <>
      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="post-job-container">
          <h2>
            <Trans>Edit Job</Trans>
          </h2>
          <form className="post-job-form" onSubmit={formHandler}>
            <div className="form-group">
              <label htmlFor="title">
                <Trans>Job Title</Trans>
              </label>
              <input
                type="text"
                id="title"
                placeholder={t`Job Title`}
                {...register("title")}
              />
              <div className="error-message">{errors.title}</div>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                <Trans>Job Description</Trans>
              </label>
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
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <textarea
                id="additionalInfo"
                placeholder={t`e.g., We are happy to review your application and contact shortlisted candidates.`}
                {...register("additionalInfo")}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="location">
                <Trans>Location</Trans>
              </label>
              <input
                type="text"
                id="location"
                placeholder={t`Location`}
                {...register("location")}
              />
              <div className="error-message">{errors.location}</div>
            </div>

            <div className="form-group">
              <label htmlFor="salary">
                <Trans>Salary</Trans>
              </label>
              <input
                type="text"
                id="salary"
                placeholder={t`Salary`}
                {...register("salary")}
              />
              <div className="error-message">{errors.salary}</div>
            </div>

            <div className="form-group">
              <label htmlFor="workMode">
                <Trans>Work Mode</Trans>
              </label>
              <WorkModeSelect
                value={register("workMode").value}
                onChange={(e) => setFieldValue("workMode", e.target.value)}
              />
              <div className="error-message">{errors.workMode}</div>
            </div>

            <div className="form-group">
              <label htmlFor="category">
                <Trans>Job Category</Trans>
              </label>
              <JobEditCategory
                value={register("category").value}
                categories={categories}
                onChange={handleCategoryChange}
              />
              <div className="error-message">
                {typeof errors.category === "string" ? errors.category : ""}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employmentType">
                <Trans>Employment Type</Trans>
              </label>
              <EmploymentTypeSelect
                value={register("employmentType").value}
                onChange={(e) =>
                  setFieldValue("employmentType", e.target.value)
                }
              />
              <div className="error-message">{errors.employmentType}</div>
            </div>

            <div className="form-group">
              <label htmlFor="experienceLevel">
                <Trans>Experience Requirement</Trans>
              </label>
              <ExperienceLevelSelect
                value={register("experienceLevel").value}
                onChange={(e) =>
                  setFieldValue("experienceLevel", e.target.value)
                }
              />
              <div className="error-message">{errors.experienceLevel}</div>
            </div>

            <div className="form-group">
              <label htmlFor="applicationDeadline">
                <Trans>Application Deadline</Trans>{" "}
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <input
                type="date"
                id="applicationDeadline"
                {...register("applicationDeadline")}
              />
              <div className="error-message">{errors.applicationDeadline}</div>
            </div>

            <div className="form-group">
              <label htmlFor="openings">
                <Trans>Open Positions</Trans>
              </label>
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
              <label htmlFor="contractType">
                <Trans>Contract Type</Trans>{" "}
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <input
                type="text"
                id="contractType"
                placeholder={t`e.g., Permanent, Temporary, Internship`}
                {...register("contractType")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="workSchedule">
                <Trans>Work Schedule</Trans>{" "}
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
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
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <input
                type="text"
                id="languageRequirements"
                placeholder={t`e.g., English B2, German A2`}
                {...register("languageRequirements")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="educationLevel">
                <Trans>Education Level</Trans>{" "}
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <input
                type="text"
                id="educationLevel"
                placeholder={t`e.g., High School, Bachelor, Not required`}
                {...register("educationLevel")}
              />
              <div className="error-message">{errors.educationLevel}</div>
            </div>

            <div className="form-group">
              <label htmlFor="requirements">
                <Trans>Requirements</Trans>{" "}
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <input
                type="text"
                id="requirements"
                placeholder={t`e.g., Customer service, Driving license B, Excel`}
                {...register("requirements")}
              />
              <div className="error-message">{errors.requirements}</div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">
                <Trans>Skills</Trans>{" "}
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <input
                type="text"
                id="skills"
                placeholder={t`e.g., React, Communication, Driving License B`}
                {...register("skills")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="benefits">
                <Trans>Benefits</Trans>{" "}
                <span className="optional-badge">
                  <Trans>Optional</Trans>
                </span>
              </label>
              <input
                type="text"
                id="benefits"
                placeholder={t`e.g., Health Insurance, Remote Work`}
                {...register("benefits")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">
                <Trans>Contact Email</Trans>
              </label>
              <input
                type="email"
                id="contactEmail"
                placeholder={t`Contact Email`}
                {...register("email")}
              />
              <div className="error-message">{errors.email}</div>
            </div>

            <div>
              <button
                type="submit"
                className="post-job-button"
                disabled={pending}
              >
                {pending ? t`Saving...` : t`Save Changes`}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
