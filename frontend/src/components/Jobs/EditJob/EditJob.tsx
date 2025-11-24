import "./EditJob.css"

export function EditJob() {


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
      />
    </div>

    <div className="form-group">
      <label htmlFor="description">Job Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Job Description"
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
      <input
        type="text"
        id="salary"
        name="salary"
        placeholder="Salary"
      />
    </div>

    <div className="form-group">
      <label htmlFor="category">Job Category</label>
      <select id="category" name="category">
        <option value="">Select a category</option>
        <option value="development">Development</option>
        <option value="marketing">Marketing</option>
        <option value="design">Design</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="employmentType">Employment Type</label>
      <select id="employmentType" name="employmentType">
        <option value="">Select Employment Type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="internship">Internship</option>
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
    <button type="submit" className="post-job-button">
      Save Changes
    </button>
  </form>
</div>
    )
}