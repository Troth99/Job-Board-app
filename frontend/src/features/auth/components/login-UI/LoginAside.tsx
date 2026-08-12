import { Trans } from "@lingui/react/macro";
import { Link } from "react-router";


export default function LoginAside() {
  return (
    <>
      <Link to="/" className="login-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
        <Trans>Back to home</Trans>
      </Link>
      <div className="login-brand-copy">
        <span className="login-eyebrow"><Trans>Job Board Platform</Trans></span>
        <h1>
          <Trans>Find your next role faster.</Trans>
        </h1>
        <p>
          <Trans>
            Sign in to manage your profile, track applications, and explore
            opportunities from trusted companies.
          </Trans>
        </p>
      </div>

      <div className="login-brand-points">
        <div className="login-point">
          <span className="login-point-icon">
            <i className="fa-solid fa-briefcase"></i>
          </span>
          <div>
            <h3>
              <Trans>Curated opportunities</Trans>
            </h3>
            <p>
              <Trans>Browse jobs from companies actively hiring.</Trans>
            </p>
          </div>
        </div>

        <div className="login-point">
          <span className="login-point-icon">
            <i className="fa-solid fa-filter"></i>
          </span>
          <div>
            <h3>
              <Trans>Smart filtering</Trans>
            </h3>
            <p>
              <Trans>Reach the right positions faster with clear search tools.</Trans>
            </p>
          </div>
        </div>

        <div className="login-point">
          <span className="login-point-icon">
            <i className="fa-solid fa-bolt"></i>
          </span>
          <div>
            <h3>
              <Trans>Faster workflow</Trans>
            </h3>
            <p>
              <Trans>
                Keep your saved jobs, notifications, and profile in one place.
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
