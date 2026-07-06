import { Link } from "react-router"
import "./404.css"


export function PageNotFound() {
//to refractor css and 404 not found
    return (
    <div className="pnf-wrapper">
      <div className="pnf-container">
        <h1 className="pnf-title">
          <span className="pnf-digit">4</span>
          <span className="pnf-digit">0</span>
          <span className="pnf-digit">4</span>
        </h1>
        <p className="pnf-subtitle">Oops! Page not found.</p>
        <Link className="pnf-button" to="/">Return to Job Board</Link>
      </div>
    </div>
    )
}