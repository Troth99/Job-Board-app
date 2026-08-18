import { Trans } from "@lingui/react/macro";
import { Company } from "../../../companies/types/companyTypes";

interface JobPostingProps {
  company: Company | null;
  userRole: string | undefined | null;
  postJobNavigation: () => void;
  registerCompanyNavigation: () => void;
}

export default function JobPosting({
  company,
  postJobNavigation,
  registerCompanyNavigation,
  userRole,
}: JobPostingProps) {

  const isMember = userRole === "member";

  return (
    <section className="job-posting">
      <h3><Trans>Hiring tools</Trans></h3>

      {isMember ? (
        <>
          <p className="job-posting-status">
            <Trans>Your role is a member of the company. In order to post jobs, register and verify your own company or talk with the owner.</Trans>
          </p>
        </>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}