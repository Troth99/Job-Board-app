import { useEffect, useState } from "react";
import "./EditJob.css"

import { useNavigate, useParams } from "react-router";
import useJobs from "../../../hooks/useJobs";
import { EmploymentTypeSelect, JobEditCategory } from "../formSelectedInputs";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Spinner from "../../Spinner/Spinner";
import { valuesInterface } from "../../../interfaces/Job.model";
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";
import { jobPostValidations } from "../../validators/postJobValidation";

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
  skills: "",
  benefits: [],
  tags: "",
  email: "",
};

export default function EditJob() {
  const { companyId, jobId } = useParams();
  const [jobData, setJobData] = useState<valuesInterface>(initialValues);
  const [pending, setPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

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
     
      if(currentJob.category){
        const selectedCategory = categories.find(
          (category) => category._id === currentJob.category
        );
        if(selectedCategory) {
          currentJob.category = selectedCategory
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
  }, [jobId]);

const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedCategoryId = e.target.value;

  const selectedCategory = categories.find(
    (category) => category._id === selectedCategoryId
  );

  if (selectedCategory) {
  
    setJobData((prevData) => ({
      ...prevData,
      category: selectedCategory, 
    }));
  }
};

  const editSubmitHandler = async (values: valuesInterface) => {

    setPending(true);

    const jobToUpdate = {
      ...values,
      updatedAt: new Date().toISOString(),
    };

    try {
      if (!jobId) {
        console.error("Job ID is missing.");
        return;
      }
      await updateJob(jobId, jobToUpdate );
      navigate(`/company/${companyId}/job/${jobId}/details`)
    } catch (error) {
      console.error('Failed to fetch', error)
    }
  };

  const {register, errors, formHandler, values } = useForm(editSubmitHandler, jobData, jobPostValidations)
  return (
    <>
      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="edit-job-container">
          <h2 className="edit-job-title">Edit Job</h2>
          <form className="edit-job-form" onSubmit={formHandler}>
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
                   <div className="error-message">{errors.benefits}</div>
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
            <div className="edit-job-actions">
              <button type="submit" className="edit-job-save-btn" disabled={pending}>
                {pending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
