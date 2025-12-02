import './CandidateJob.css'
export function CandidateJobView() {

    //To Do validation on post new form...
    //delete job

    return (
        
     <div className="candidate-job-view-container">
      <div className="company-details-card">
  <div className="company-header">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT7RiKSjCLH7UUM2…" alt="TechNova Solutions Logo" className="company-logo" />
    <div>
      <h3 className="company-name">TechNova Solutions</h3>
      <span className="company-industry">Industry: Software Development</span>
      <span className="company-size">Size: 10-50 employees</span>
      <span className="company-founded">Founded: 2021</span>
    </div>
  </div>
  <div className="company-meta">
    <span className="company-location">Location: Sofia, Bulgaria</span>
    <span className="company-website">
      Website: <a href="https://technova-solutions.com/" target="_blank" rel="noopener noreferrer">technova-solutions.com</a>
    </span>
  </div>
  <div className="company-description-data">
    <p>
      Innovative software solutions for small and medium businesses.
    </p>
  </div>
</div>
        <div className="job-header">
          <h2 className="job-title">Frontend Developer</h2>
          <span className="job-category">Category: IT</span>
          <span className="job-type">Type: Full-time</span>
        </div>
        <div className="job-meta">
          <span className="job-location">Location: Sofia</span>
          <span className="job-salary">Salary: 3500 BGN</span>
          <span className="job-date">Posted: 2025-12-01</span>
        </div>
        <div className="job-description">
          <h3>Description</h3>
          <p>
            We are looking for a passionate frontend developer to join our team. You will work with React, TypeScript and modern web technologies.
          </p>
        </div>
        <div className="job-skills">
          <h3>Skills</h3>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>CSS</li>
            <li>REST APIs</li>
          </ul>
        </div>
        <div className="job-benefits">
          <h3>Benefits</h3>
          <ul>
            <li>Remote work</li>
            <li>Health insurance</li>
            <li>Flexible hours</li>
          </ul>
        </div>
        <div className="job-apply">
          <button className="apply-button">Apply Now</button>
        </div>
      </div>
    )
}