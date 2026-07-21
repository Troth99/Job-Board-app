import { Trans } from "@lingui/react/macro";

interface JobPostingProps {
  company: any;
  postJobNavigation: () => void;
  registerCompanyNavigation: () => void;
}

export default function JobPosting({
  company,
  postJobNavigation,
  registerCompanyNavigation,
}: JobPostingProps) {
  return (
    <section className="job-posting">
      <h3><Trans>Hiring tools</Trans></h3>
      <p className="job-posting-status">
        {company
          ? <Trans>You are connected to a company and can publish new job posts.</Trans>
          : <Trans>Register a company first to publish job offers.</Trans>}
      </p>

      <div className="job-title-options">
        <button
          className="job-title-button"
          onClick={() => {
            if (company) {
              postJobNavigation();
            } else {
              registerCompanyNavigation();
            }
          }}
        >
          {company ? <Trans>Post a Job</Trans> : <Trans>Register Company</Trans>}
        </button>
      </div>

      <div className="job-description-info">
        <p>
          {company
            ? <Trans>Start hiring by creating a detailed job post for your team.</Trans>
            : <Trans>After registration, you can open your dashboard and start hiring.</Trans>}
        </p>
      </div>
    </section>
  );
}