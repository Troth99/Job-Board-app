import { useEffect, useState } from "react";
import "../CreateJob/CreateJob.css";
import { useNavigate, useParams } from "react-router";
import useJobs from "../../../hooks/utils/useJobs";
import {
  EmploymentTypeSelect,
  ExperienceLevelSelect,
  JobEditCategory,
  WorkModeSelect,
} from "../formSelectedInputs";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Spinner from "../../Spinner/Spinner";
import { valuesInterface } from "../../../interfaces/Job.model";
import useForm from "../../../hooks/common/useForm";
import { jobPostValidations } from "../../validators/createJobValidation";

const initialValues = {
  title: "",
  description: "",
  location: "",
  salary: "",
 category: {
  _id: "",
  name: "",
  shortName: ""
},
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

export default function EditJob() {
  const { companyId, jobId } = useParams();
  const [jobData, setJobData] = useState<valuesInterface>(initialValues);
  const [pending, setPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const categories = useSelector(
    (state: RootState) => state.categories.categories
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

      if (!currentJob.requirements && currentJob.skills) {
        currentJob.requirements = currentJob.skills;
      }

      if (currentJob.category && typeof currentJob.category === "string") {
        const selectedCategory = categories.find(
          (category) => category._id === currentJob.category,
        );
        if (selectedCategory) {
          currentJob.category = selectedCategory;
        }
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

  const editSubmitHandler = async (values: valuesInterface) => {
    setPending(true);

    try {
      if (!jobId) {
        console.error("Job ID is missing.");
        return;
      }
      await updateJob(jobId, {
        ...values,
        updatedAt: new Date().toISOString(),
      });
      navigate(`/company/${companyId}/job/${jobId}/details`);
    } catch (error) {
      console.error("Failed to update job", error);
    } finally {
      setPending(false);
    }
  };

  const { register, errors, formHandler, setFieldValue } = useForm(
    editSubmitHandler,
    jobData,
    jobPostValidations,
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId,
    );

    if (selectedCategory) {
      setFieldValue("category", selectedCategory);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="post-job-container">
          <h2>Edit Job</h2>
          <form className="post-job-form" onSubmit={formHandler}>
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                placeholder="Job Title"
                {...register("title")}
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
                Additional Information <span className="optional-badge">Optional</span>
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
              <label htmlFor="category">Job Category</label>
              <JobEditCategory
                value={typeof register("category").value === "string" ? null : register("category").value}
                categories={categories}
                onChange={handleCategoryChange}
              />
              <div className="error-message">
                {typeof errors.category === "string" ? errors.category : ""}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employmentType">Employment Type</label>
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
                Application Deadline <span className="optional-badge">Optional</span>
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
                Language Requirements <span className="optional-badge">Optional</span>
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
                Benefits (comma separated) <span className="optional-badge">Optional</span>
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

            <div>
              <button type="submit" className="post-job-button" disabled={pending}>
                {pending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
