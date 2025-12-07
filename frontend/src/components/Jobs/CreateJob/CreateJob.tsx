import "./CreateJob.css";
import { useEffect, useState } from "react";
import "./CreateJob.css";
import { EmploymentTypeSelect, JobCategorySelect } from "../formSelectedInputs";
import useJobs from "../../../hooks/useJobs";
import { showSuccess } from "../../../utils/toast";
import { useNavigate, useParams } from "react-router";
import { Category } from "../../../hooks/useCategories";
import { Company } from "../../../hooks/useCompany";
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
  benefits: "",
  tags: "",
  email: "",
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
          <label htmlFor="skills">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            placeholder="e.g., React, Node.js, CSS"
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
            placeholder="e.g., Frontend, Remote"
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
