import { Link } from "react-router";
import "./RegisterAside.css";
import { Trans } from "@lingui/react/macro";

export function RegisterAside() {
  return (
    <>
      <Link to="/" className="login-back-btn">
        <i className="fa-solid fa-arrow-left"></i>
        <Trans>Back to home</Trans>
      </Link>

      <div className="register-brand-copy">
        <span className="register-eyebrow"><Trans>Job Board Platform</Trans></span>
        <h1>
          <Trans>Build your profile and get hired faster.</Trans>
        </h1>
        <p>
          <Trans>
            Create your account to discover curated jobs and apply in a few
            clicks.
          </Trans>
        </p>
      </div>

      <div className="register-brand-points">
        <div className="register-point">
          <span className="register-point-icon">
            <i className="fa-solid fa-id-card"></i>
          </span>
          <div>
            <h3>
              <Trans>Stronger first impression</Trans>
            </h3>
            <p>
              <Trans>Complete profile details help recruiters trust your application.</Trans>
            </p>
          </div>
        </div>

        <div className="register-point">
          <span className="register-point-icon">
            <i className="fa-solid fa-filter"></i>
          </span>
          <div>
            <h3>
              <Trans>Better job matches</Trans>
            </h3>
            <p>
              <Trans>Location and contact info improve recommendations for your role.</Trans>
            </p>
          </div>
        </div>

        <div className="register-point">
          <span className="register-point-icon">
            <i className="fa-solid fa-paper-plane"></i>
          </span>
          <div>
            <h3>
              <Trans>Faster applications</Trans>
            </h3>
            <p>
              <Trans>Save your details once and apply to multiple jobs in minutes.</Trans>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
