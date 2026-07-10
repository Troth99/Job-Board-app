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
      <h3>Hiring tools</h3>
      <p className="job-posting-status">
        {company
          ? "You are connected to a company and can publish new job posts."
          : "Register a company first to publish job offers."}
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
          {company ? "Post a Job" : "Register Company"}
        </button>
      </div>

      <div className="job-description-info">
        <p>
          {company
            ? "Start hiring by creating a detailed job post for your team."
            : "After registration, you can open your dashboard and start hiring."}
        </p>
      </div>
    </section>
  );
}