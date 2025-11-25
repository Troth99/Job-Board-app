import { useEffect, useState } from "react";
import { Job, valuesInterface } from "../CreateJob/CreateJob";
import { useParams } from "react-router";
import { getJobById } from "../../../services/jobService";
import { EmploymentTypeSelect, JobCategorySelect, JobEditCategory } from "../formSelectedInputs";
import { Category, getCategoryById } from "../../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const initialValues = {
  title: "",
  description: "",
  location: "",
  salary: "",
  category: "",
  employmentType: "",
  skills: "",
  benefits: "",
  tags: "",
  email: "",
};

export function EditJob() {
  const { companyId, jobId } = useParams();
  const [jobData, setJobData] = useState<valuesInterface>(initialValues);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch()

  const categories = useSelector((state: RootState) => state.categories.categories)
  console.log(categories)
  const fetchCurrentJob = async () => {
    if (!jobId) {
      throw new Error("Job id is missing.");
    }
    try {
      const currentJob = await getJobById(jobId);
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
  }, [jobId]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setJobData((prevData) => ({
       ...prevData, category: value 
    })
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name] : value
    })
    )
  };
  return (
    <div className="post-job-container">
      <h2>Edit Job</h2>
      <form className="post-job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            placeholder="Salary"
            value={jobData.salary}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Job Category</label>
          <JobEditCategory
            value={jobData.category}
            categories={categories}
            onChange={handleCategoryChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="employmentType">Employment Type</label>
          <EmploymentTypeSelect
            value={jobData.employmentType}
            onChange={handleCategoryChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="e.g., React, Node.js, CSS"
            value={jobData.skills}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="benefits">Benefits (comma separated)</label>
          <input
            type="text"
            id="benefits"
            name="benefits"
            placeholder="e.g., Health Insurance, Remote Work"
            value={jobData.benefits}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="e.g., Frontend, Remote"
            value={jobData.tags}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="email"
            placeholder="Contact Email"
            value={jobData.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="post-job-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}
