import { Link } from "react-router";
import "../../styles/DeactivatedJob.css";

export default function DeactivatedJobView() {
    return (
        <div className="deactivated-job-view">
            <h2>This job is currently unavailable.</h2>
            <p>This job posting has been deactivated and is no longer accepting applications.</p>
            <p>
                Please explore our other available opportunities. <Link to="/jobs">Browse available jobs</Link>.
            </p>
        </div>
    )
}