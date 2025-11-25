import { useEffect, useState } from "react";
import { Job, valuesInterface } from "../CreateJob/CreateJob";
import { useNavigate, useParams } from "react-router";
import { getJobById, updateJob } from "../../../services/jobService";
import { EmploymentTypeSelect, JobEditCategory } from "../formSelectedInputs";
import { Category } from "../../../services/categoryService";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Spinner from "../../Spinner/Spinner";

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
  const [pending, setPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

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
    console.log(jobData)
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
      ...prevData,
      category: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrors({});

    const jobToUpdate = {
      ...jobData,
      updatedAt: new Date().toISOString(),
    };

    try {
      if (!jobId) {
        console.error("Job ID is missing.");
        return;
      }
      await updateJob(jobId, jobToUpdate);
      navigate(`/company/${companyId}/job/${jobId}/details`)
    } catch (error) {
      console.error('Failed to fetch', error)
    }
  };
  return (
    <>
      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="post-job-container">
          <h2>Edit Job</h2>
          <form className="post-job-form" onSubmit={editSubmitHandler}>
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
            <button type="submit" className="post-job-button"
                 disabled={pending}
                >
                  {pending ? "Saving..." : "Save Changes"}
                
            </button>
          </form>
        </div>
      )}
    </>
  );
}
