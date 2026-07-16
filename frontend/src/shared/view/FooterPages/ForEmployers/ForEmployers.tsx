import { Link } from "react-router"
import "./forEmployers.css"
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import { Container } from "../../../components/Container/Container";
import { Trans } from "@lingui/react/macro";

export default function ForEmployers() {

  const seo = generateSeoConfig("forEmployers");
    return (

      <>
     <MetaData seo={seo} />
    
     <div className="for-employers-page">
      <Container>
        <section className="for-employers-hero">
          <span className="for-employers-badge"><Trans>For Employers</Trans></span>
          <h1><Trans>Hire Faster Across All Industries</Trans></h1>
          <p>
            <Trans>Publish jobs, manage applications, and collaborate with your hiring team
            in one place. JobBoard supports employers in retail, healthcare,
            logistics, finance, education, hospitality, and more.</Trans>
          </p>
        </section>

        <section className="for-employers-section">
          <h2><Trans>Why Employers Choose JobBoard</Trans></h2>
          <div className="for-employers-cards">
            <article className="for-employers-card">
              <h3><Trans>Wide Talent Reach</Trans></h3>
              <p>
                <Trans>Reach candidates from different regions and professional backgrounds
                with one job post.</Trans>
              </p>
            </article>

            <article className="for-employers-card">
              <h3><Trans>Simple Job Publishing</Trans></h3>
              <p>
                <Trans>Create listings with role details, salary range, location, and
                application deadline in minutes.</Trans>
              </p>
            </article>

            <article className="for-employers-card">
              <h3><Trans>Team Collaboration</Trans></h3>
              <p>
                <Trans>Invite recruiters and managers to review applications together and
                keep hiring decisions organized.</Trans>
              </p>
            </article>

            <article className="for-employers-card">
              <h3><Trans>Application Tracking</Trans></h3>
              <p>
                <Trans>Move candidates through clear stages and keep your hiring process
                transparent and efficient.</Trans>
              </p>
            </article>
          </div>
        </section>

        <section className="for-employers-how">
          <h2><Trans>How It Works</Trans></h2>
          <div className="for-employers-steps">
            <div className="for-employers-step">
              <span>1</span>
              <div>
                <h3><Trans>Create Company Account</Trans></h3>
                <p><Trans>Register your company profile and complete basic business details.</Trans></p>
              </div>
            </div>

            <div className="for-employers-step">
              <span>2</span>
              <div>
                <h3><Trans>Post Open Positions</Trans></h3>
                <p><Trans>Add job descriptions, requirements, benefits, and work schedule.</Trans></p>
              </div>
            </div>

            <div className="for-employers-step">
              <span>3</span>
              <div>
                <h3><Trans>Review Applications</Trans></h3>
                <p><Trans>Screen candidates, compare profiles, and shortlist top matches.</Trans></p>
              </div>
            </div>

            <div className="for-employers-step">
              <span>4</span>
              <div>
                <h3><Trans>Hire with Confidence</Trans></h3>
                <p><Trans>Contact candidates and complete your selection process faster.</Trans></p>
              </div>
            </div>
          </div>
        </section>

        <section className="for-employers-faq">
          <h2><Trans>Employer FAQ</Trans></h2>
          <div className="for-employers-faq-list">
            <article>
              <h3><Trans>Who can post jobs?</Trans></h3>
              <p><Trans>Any verified company from any industry can publish job listings.</Trans></p>
            </article>

            <article>
              <h3><Trans>Can multiple team members manage hiring?</Trans></h3>
              <p><Trans>Yes. You can invite teammates and assign responsibilities.</Trans></p>
            </article>

            <article>
              <h3><Trans>Can we edit or close a job post?</Trans></h3>
              <p><Trans>Yes. You can update, pause, or close listings anytime.</Trans></p>
            </article>
          </div>
        </section>

        <section className="for-employers-cta">
          <h2><Trans>Ready to Start Hiring?</Trans></h2>
          <p><Trans>Create your company account and publish your first job today.</Trans></p>
          <div className="for-employers-cta-actions">
            <Link to="/register/company" className="for-employers-btn-primary">
              <Trans>Register Company</Trans>
            </Link>
            <Link to="/contacts" className="for-employers-btn-secondary">
              <Trans>Contact Sales</Trans>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  </>
    )
}
