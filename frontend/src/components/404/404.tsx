import { Link } from "react-router"
import "./404.css"


export function PageNotFound() {

    return (
 <div className="notfound-wrapper">
      <div className="notfound-box">
        <h1>404</h1>
        <p>Oops! No job listings found here...</p>

        <div className="job-animation">
          <div className="job-card-404">Frontend</div>
          <div className="job-card-404">Backend</div>
          <div className="job-card-404">Designer</div>
          <div className="job-card-404">DevOps</div>
          <div className="job-card-404">QA</div>
        </div>

        <a href="/">Return to Job Board</a>
      </div>
    </div>
    )
}