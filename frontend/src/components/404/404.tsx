import { Link } from "react-router"
import "./404.css"


export function PageNotFound() {

    return (
 <div className="notfound-wrapper">
      <div className="notfound-box">
        <h1>404</h1>
        <p>Oops! No job listings found here...</p>

        <div className="job-animation">
          <div className="job-card">Frontend</div>
          <div className="job-card">Backend</div>
          <div className="job-card">Designer</div>
          <div className="job-card">DevOps</div>
          <div className="job-card">QA</div>
        </div>

        <a href="/">Return to Job Board</a>
      </div>
    </div>
    )
}