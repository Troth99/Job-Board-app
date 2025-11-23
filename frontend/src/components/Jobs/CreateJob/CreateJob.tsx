import { useEffect, useState } from "react";
import "./CreateJob.css";
import { EmploymentTypeSelect, JobCategorySelect } from "../formSelectedInputs";
import { createJob } from "../../../services/jobService";
import { showSuccess } from "../../../utils/toast";
import { useNavigate, useParams } from "react-router";

interface Company {
  name: string;
  logo: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  createdBy: string;
  company?: Company | null;
  type: string;
  category?: string | null;
  createdAt: string;
  skills?: string;
  employmentType?: string;
  benefits?: string;
  applicationDeadline?: string;
  views?: number;
  isActive?: boolean;
  tags?: string;
  contactEmail?: string;
}

interface valuesInterface {
  title: string;
  description: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  skills: string;
  benefits: string;
  tags: string;
  contactEmail: string;
}
const initialValues = {
  title: "",
  description: "",
  location: "",
  salary: "",
  category: "",
  type: "",
  skills: "",
  benefits: "",
  tags: "",
  contactEmail: "",
};
export function PostJob() {
  const {companyId} = useParams()
  const [form, setForm] = useState<valuesInterface>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({});
    setLoading(true);


    try {
      const result = await createJob(form)
      showSuccess("Job posted successfully!")
      navigate(`/company/${companyId}/dashboard`)
    } catch (error: unknown) {
      if(error instanceof Error) {
        setErrors(error.message || "Something went wrong");
      }else {
        console.error('Unknown error', error)
      }
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <form className="post-job-form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={onChangeHandler}
            placeholder="Job Title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Job Category</label>
          <JobCategorySelect value={form.category} onChange={onChangeHandler} />
        </div>

        <div className="form-group">
          <label htmlFor="employmentType">Employment Type</label>
          <EmploymentTypeSelect value={form.type} onChange={onChangeHandler} />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="e.g., React, Node.js, CSS"
            value={form.skills}
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="benefits">Benefits (comma separated)</label>
          <input
            type="text"
            id="benefits"
            name="benefits"
            placeholder="e.g., Health Insurance, Remote Work"
            value={form.benefits}
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="e.g., Frontend, Remote"
            value={form.tags}
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            placeholder="Contact Email"
            value={form.contactEmail}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" 
        className="post-job-button"
        disabled={loading}
        >
         {loading ? "Posting job..." : 'Post job'}
        </button>
      </form>
    </div>
  );
}
