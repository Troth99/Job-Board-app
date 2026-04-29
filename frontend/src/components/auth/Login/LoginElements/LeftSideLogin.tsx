import { Link } from "react-router";

export default function LeftSideLogin() {
  return (
    <>
      <Link to="/" className="login-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
        Back to home
      </Link>
      <div className="login-brand-copy">
        <span className="login-eyebrow">Job Board Platform</span>
        <h1>Find your next role faster.</h1>
        <p>
          Sign in to manage your profile, track applications, and explore
          opportunities from trusted companies.
        </p>
      </div>

      <div className="login-brand-points">
        <div className="login-point">
          <span className="login-point-icon">
            <i className="fa-solid fa-briefcase"></i>
          </span>
          <div>
            <h3>Curated opportunities</h3>
            <p>Browse jobs from companies actively hiring.</p>
          </div>
        </div>

        <div className="login-point">
          <span className="login-point-icon">
            <i className="fa-solid fa-filter"></i>
          </span>
          <div>
            <h3>Smart filtering</h3>
            <p>Reach the right positions faster with clear search tools.</p>
          </div>
        </div>

        <div className="login-point">
          <span className="login-point-icon">
            <i className="fa-solid fa-bolt"></i>
          </span>
          <div>
            <h3>Faster workflow</h3>
            <p>
              Keep your saved jobs, notifications, and profile in one place.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
