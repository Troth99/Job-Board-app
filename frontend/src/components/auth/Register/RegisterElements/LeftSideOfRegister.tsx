import { Link } from "react-router";
import "./LeftSideOfRegister.css";

export function LeftSideOfRegister() {
  return (
    <>
      <Link to="/" className="login-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
        Back to home
      </Link>

      <div className="register-brand-copy">
        <span className="register-eyebrow">Job Board Platform</span>
        <h1>Build your profile and get hired faster.</h1>
        <p>
          Create your account to discover curated jobs and apply in a few
          clicks.
        </p>
      </div>

      <div className="register-brand-points">
        <div className="register-point">
          <span className="register-point-icon">
            <i className="fa-solid fa-id-card"></i>
          </span>
          <div>
            <h3>Stronger first impression</h3>
            <p>Complete profile details help recruiters trust your application.</p>
          </div>
        </div>

        <div className="register-point">
          <span className="register-point-icon">
            <i className="fa-solid fa-filter"></i>
          </span>
          <div>
            <h3>Better job matches</h3>
            <p>Location and contact info improve recommendations for your role.</p>
          </div>
        </div>

        <div className="register-point">
          <span className="register-point-icon">
            <i className="fa-solid fa-paper-plane"></i>
          </span>
          <div>
            <h3>Faster applications</h3>
            <p>Save your details once and apply to multiple jobs in minutes.</p>
          </div>
        </div>
      </div>
    </>
  );
}
