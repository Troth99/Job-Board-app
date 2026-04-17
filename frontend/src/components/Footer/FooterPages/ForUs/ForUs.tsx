import { Link } from "react-router"
import "./ForUs.css"
import { Container } from "../../../Container/Container"

export default function ForUs() {
  return (
    <div className="for-us-page">
      <Container>

      {/* Hero */}
      <section className="for-us-hero">
        <div className="for-us-hero-inner">
          <span className="for-us-badge">For Job Seekers</span>
          <h1>Your Next Career Move Starts Here</h1>
          <p>
            JobBoard is a modern job marketplace built to connect talented
            professionals with companies that are actively hiring. Whether
            you're exploring new opportunities or ready to make a change,
            we've built every feature with you in mind.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="for-us-section">
        <h2>What JobBoard Offers You</h2>
        <p className="for-us-section-sub">
          From discovery to your first day on the job — we've got you covered.
        </p>
        <div className="for-us-cards">
          <div className="for-us-card">
            <div className="for-us-card-icon">🔍</div>
            <h3>Smart Job Search</h3>
            <p>
              Browse hundreds of listings and narrow them down instantly.
              Filter by job category, employment type (full-time, part-time,
              freelance, internship), company, or use the keyword search to
              find exactly what you're looking for.
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">📄</div>
            <h3>One-Click Applications</h3>
            <p>
              Apply to any job in seconds. Attach your CV link and a cover
              letter tailored to the role. All your applications are stored
              in your profile so you never lose track of where you've applied.
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">📊</div>
            <h3>Real-Time Status Tracking</h3>
            <p>
              Know exactly where you stand. Applications move through a clear
              pipeline — <strong>New → Under Review → Approved / Rejected</strong> —
              and you're notified the moment a recruiter takes action on your
              application.
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">🔔</div>
            <h3>Instant Notifications</h3>
            <p>
              No more refreshing pages. Our real-time notification system
              (powered by Server-Sent Events) pushes updates to you the
              instant something happens — application status changes, company
              invites, and new messages.
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">🏢</div>
            <h3>Join Company Teams</h3>
            <p>
              Already working somewhere or want to manage hiring yourself?
              Accept company invitations and collaborate inside company
              dashboards. Roles range from Member to Owner, each with
              clear responsibilities.
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">👤</div>
            <h3>Your Profile, Your Brand</h3>
            <p>
              Build a professional profile with your name, location, phone
              number, and a custom avatar. Your profile is your identity on
              the platform — keep it up to date and let recruiters know
              who they're dealing with.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="for-us-how">
        <h2>How It Works</h2>
        <p className="for-us-section-sub">Four simple steps to land your next role.</p>
        <div className="for-us-steps">
          <div className="for-us-step">
            <div className="for-us-step-number">1</div>
            <div>
              <h3>Create Your Account</h3>
              <p>
                Sign up for free in under a minute. Fill in your basic
                details and you're ready to explore the platform.
              </p>
            </div>
          </div>
          <div className="for-us-step">
            <div className="for-us-step-number">2</div>
            <div>
              <h3>Explore & Filter Jobs</h3>
              <p>
                Use the homepage to browse featured listings, explore jobs
                by category, or use advanced filters to zero in on the
                roles that match your skills and preferences.
              </p>
            </div>
          </div>
          <div className="for-us-step">
            <div className="for-us-step-number">3</div>
            <div>
              <h3>Apply with Confidence</h3>
              <p>
                Open a job listing, read the full description — including
                required skills, benefits, salary, and deadline — then
                submit your application with your CV and a personalized
                cover letter.
              </p>
            </div>
          </div>
          <div className="for-us-step">
            <div className="for-us-step-number">4</div>
            <div>
              <h3>Get Notified & Respond</h3>
              <p>
                Sit back and let the notifications come to you. You'll be
                alerted in real time when recruiters review, approve, or
                reach out about your application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why JobBoard */}
      <section className="for-us-why">
        <h2>Why JobBoard?</h2>
        <div className="for-us-why-grid">
          <div className="for-us-why-item">
            <span>✅</span>
            <p><strong>Free to use</strong> — Creating an account and applying to jobs costs nothing.</p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><strong>Real-time everything</strong> — Notifications, application updates, and company invites arrive instantly.</p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><strong>Transparent process</strong> — A clear application status pipeline so you always know what's happening.</p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><strong>Dual role support</strong> — Be a candidate and a company team member at the same time.</p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><strong>Verified companies</strong> — Every company on the platform has an owner account and a registered profile.</p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><strong>Secure & private</strong> — Your data is protected with industry-standard encryption and token-based authentication.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="for-us-cta">
        <h2>Ready to Find Your Next Job?</h2>
        <p>Join thousands of professionals already using JobBoard to advance their careers.</p>
      <Link to="/jobs" className="for-us-cta-btn">Browse Jobs</Link>
      </section>

   </Container>
    </div>
  )
}