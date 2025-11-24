import { useNavigate, useParams } from "react-router"
import "./Details.css"

export function DetailsJob(){
    const {companyId, jobId} = useParams();
    const navigate = useNavigate()






    const editNavigateHandler = () => {
        navigate(`/company/${companyId}/job/${jobId}/edit`)
    }
    return (
   <div className="job-details-container">
  <div className="job-overview">
    <div className="job-title">
      <h3>Job Title: Frontend Developer</h3>
    </div>
    <div className="job-description">
      <p>
        We are looking for a talented Frontend Developer to join our team. The ideal candidate should have experience
        with React, JavaScript, and CSS.
      </p>
    </div>
    <div className="job-location-salary">
      <div><strong>Location:</strong> Remote</div>
      <div><strong>Salary:</strong> $80,000 - $100,000 per year</div>
    </div>
    <div className="job-category-type">
      <div><strong>Job Category:</strong> IT</div>
      <div><strong>Employment Type:</strong> Full-Time</div>
    </div>
    <div className="job-skills-benefits">
      <div><strong>Skills:</strong> React, JavaScript, CSS</div>
      <div><strong>Benefits:</strong> Health Insurance, Remote Work</div>
    </div>
  </div>

  <div className="candidates-section">
    <h3>Candidate Applications</h3>
    <table className="candidates-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>CV</th>
          <th>Applied On</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td><a href="path/to/cv/johndoe.pdf" target="_blank" className="cv-link">View CV</a></td>
          <td>2023-11-10</td>
          <td>Pending</td>
          <td>
            <button className="approve-button">Approve</button>
            <button className="reject-button">Reject</button>
          </td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td><a href="path/to/cv/janesmith.pdf" target="_blank" className="cv-link">View CV</a></td>
          <td>2023-11-09</td>
          <td>Approved</td>
          <td>
            <button className="approve-button" disabled>Approve</button>
            <button className="reject-button">Reject</button>
          </td>
        </tr>
   
      </tbody>
    </table>
  </div>


  <div className="job-actions">
    <h3>Job Actions</h3>
    <div className="job-actions-buttons">
      <button className="edit-job-button" onClick={editNavigateHandler}>Edit Job</button>
      <button className="delete-job-button">Delete Job</button>
    </div>
  </div>
</div>

    )
}