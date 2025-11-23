import "./CreateJob.css";

interface Company {
  name: string;
  logo: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  createdBy: string;
  company?: Company | null;
  type: string;
  category?: string | null;
  createdAt: string;
  skills?: string[];
  employmentType?: "Full-time" | "Part-time" | "Internship";
  benefits?: string[];
  applicationDeadline?: string;
  views?: number;
  isActive?: boolean;
  tags?: string[];
  contactEmail?: string;
  applyUrl?: string;
}

export function PostJob() {
  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <form className="post-job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Job Title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Job Description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input type="text" id="salary" name="salary" placeholder="Salary" />
        </div>
        <div className="form-group">
          <label htmlFor="category">Job Category</label>
          <select id="category" name="category">
            <option value="">Select a category</option>
            <option value="IT">IT / Software Development</option>
            <option value="Design">Design / Creative</option>
            <option value="Marketing">Marketing / Sales</option>
            <option value="Finance">Finance / Accounting</option>
            <option value="HR">Human Resources</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Operations">Operations / Management</option>
            <option value="Education">Education / Training</option>
            <option value="Healthcare">Healthcare / Medical</option>
            <option value="Engineering">Engineering / Technical</option>
            <option value="Legal">Legal / Compliance</option>
            <option value="Hospitality">Hospitality / Tourism</option>
            <option value="Logistics">Logistics / Supply Chain</option>
            <option value="Media">Media / Communications</option>
            <option value="Research">Research / Science</option>
            <option value="Construction">Construction / Architecture</option>
            <option value="Retail">Retail / Customer Experience</option>
            <option value="Agriculture">Agriculture / Farming</option>
            <option value="Non-Profit">Non-Profit / NGO</option>
             <option value="Non-Profit">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="employmentType">Employment Type</label>
          <select id="employmentType" name="employmentType">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Temporary">Temporary</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Apprenticeship">Apprenticeship</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="e.g., React, Node.js, CSS"
          />
        </div>

        <div className="form-group">
          <label htmlFor="benefits">Benefits (comma separated)</label>
          <input
            type="text"
            id="benefits"
            name="benefits"
            placeholder="e.g., Health Insurance, Remote Work"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="e.g., Frontend, Remote"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            placeholder="Contact Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="applyUrl">Apply URL</label>
          <input
            type="url"
            id="applyUrl"
            name="applyUrl"
            placeholder="Application URL"
          />
        </div>

        <button type="submit" className="post-job-button">
          Post Job
        </button>
      </form>
    </div>
  );
}
