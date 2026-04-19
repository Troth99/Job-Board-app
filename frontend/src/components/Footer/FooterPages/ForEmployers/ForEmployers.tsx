import { Link } from "react-router"
import "./forEmployers.css"
import { Container } from "../../../Container/Container"

export default function ForEmployers() {

    return (
     <div className="for-employers-page">
      <Container>
        <section className="for-employers-hero">
          <span className="for-employers-badge">For Employers</span>
          <h1>Hire Faster Across All Industries</h1>
          <p>
            Publish jobs, manage applications, and collaborate with your hiring team
            in one place. JobBoard supports employers in retail, healthcare,
            logistics, finance, education, hospitality, and more.
          </p>
        </section>

        <section className="for-employers-section">
          <h2>Why Employers Choose JobBoard</h2>
          <div className="for-employers-cards">
            <article className="for-employers-card">
              <h3>Wide Talent Reach</h3>
              <p>
                Reach candidates from different regions and professional backgrounds
                with one job post.
              </p>
            </article>

            <article className="for-employers-card">
              <h3>Simple Job Publishing</h3>
              <p>
                Create listings with role details, salary range, location, and
                application deadline in minutes.
              </p>
            </article>

            <article className="for-employers-card">
              <h3>Team Collaboration</h3>
              <p>
                Invite recruiters and managers to review applications together and
                keep hiring decisions organized.
              </p>
            </article>

            <article className="for-employers-card">
              <h3>Application Tracking</h3>
              <p>
                Move candidates through clear stages and keep your hiring process
                transparent and efficient.
              </p>
            </article>
          </div>
        </section>

        <section className="for-employers-how">
          <h2>How It Works</h2>
          <div className="for-employers-steps">
            <div className="for-employers-step">
              <span>1</span>
              <div>
                <h3>Create Company Account</h3>
                <p>Register your company profile and complete basic business details.</p>
              </div>
            </div>

            <div className="for-employers-step">
              <span>2</span>
              <div>
                <h3>Post Open Positions</h3>
                <p>Add job descriptions, requirements, benefits, and work schedule.</p>
              </div>
            </div>

            <div className="for-employers-step">
              <span>3</span>
              <div>
                <h3>Review Applications</h3>
                <p>Screen candidates, compare profiles, and shortlist top matches.</p>
              </div>
            </div>

            <div className="for-employers-step">
              <span>4</span>
              <div>
                <h3>Hire with Confidence</h3>
                <p>Contact candidates and complete your selection process faster.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="for-employers-faq">
          <h2>Employer FAQ</h2>
          <div className="for-employers-faq-list">
            <article>
              <h3>Who can post jobs?</h3>
              <p>Any verified company from any industry can publish job listings.</p>
            </article>

            <article>
              <h3>Can multiple team members manage hiring?</h3>
              <p>Yes. You can invite teammates and assign responsibilities.</p>
            </article>

            <article>
              <h3>Can we edit or close a job post?</h3>
              <p>Yes. You can update, pause, or close listings anytime.</p>
            </article>
          </div>
        </section>

        <section className="for-employers-cta">
          <h2>Ready to Start Hiring?</h2>
          <p>Create your company account and publish your first job today.</p>
          <div className="for-employers-cta-actions">
            <Link to="/register/company" className="for-employers-btn-primary">
              Register Company
            </Link>
            <Link to="/contacts" className="for-employers-btn-secondary">
              Contact Sales
            </Link>
          </div>
        </section>
      </Container>
    </div>

    )
}
