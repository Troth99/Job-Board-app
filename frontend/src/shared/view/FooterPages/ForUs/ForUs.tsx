import { Link } from "react-router"
import "./forUs.css"
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import { Container } from "../../../components/Container/Container";
import { Trans } from "@lingui/react/macro";


export default function ForUs() {
  const seo = () => generateSeoConfig("forUs");
  return (
    <>
  <MetaData seo={seo} />
    <div className="for-us-page">
      <Container>

      {/* Hero */}
      <section className="for-us-hero">
        <div className="for-us-hero-inner">
          <span className="for-us-badge"><Trans>For Job Seekers</Trans></span>
          <h1><Trans>Your Next Career Move Starts Here</Trans></h1>
          <p>
            <Trans>
              JobBoard is a modern job marketplace built to connect talented
              professionals with companies that are actively hiring. Whether
              you're exploring new opportunities or ready to make a change,
              we've built every feature with you in mind.
            </Trans>
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="for-us-section">
        <h2><Trans>What JobBoard Offers You</Trans></h2>
        <p className="for-us-section-sub">
          <Trans>From discovery to your first day on the job — we've got you covered.</Trans>
        </p>
        <div className="for-us-cards">
          <div className="for-us-card">
            <div className="for-us-card-icon">🔍</div>
            <h3><Trans>Smart Job Search</Trans></h3>
            <p>
              <Trans>
                Browse hundreds of listings and narrow them down instantly.
                Filter by job category, employment type (full-time, part-time,
                freelance, internship), company, or use the keyword search to
                find exactly what you're looking for.
              </Trans>
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">📄</div>
            <h3><Trans>One-Click Applications</Trans></h3>
            <p>
              <Trans>
                Apply to any job in seconds. Attach your CV link and a cover
                letter tailored to the role. All your applications are stored
                in your profile so you never lose track of where you've applied.
              </Trans>
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">📊</div>
            <h3><Trans>Real-Time Status Tracking</Trans></h3>
            <p>
              <Trans>
                Know exactly where you stand. Applications move through a clear
                pipeline — <strong>New → Under Review → Approved / Rejected</strong> —
                and you're notified the moment a recruiter takes action on your
                application.
              </Trans>
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">🔔</div>
            <h3><Trans>Instant Notifications</Trans></h3>
            <p>
              <Trans>
                No more refreshing pages. Our real-time notification system
                (powered by Server-Sent Events) pushes updates to you the
                instant something happens — application status changes, company
                invites, and new messages.
              </Trans>
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">🏢</div>
            <h3><Trans>Join Company Teams</Trans></h3>
            <p>
              <Trans>
                Already working somewhere or want to manage hiring yourself?
                Accept company invitations and collaborate inside company
                dashboards. Roles range from Member to Owner, each with
                clear responsibilities.
              </Trans>
            </p>
          </div>
          <div className="for-us-card">
            <div className="for-us-card-icon">👤</div>
            <h3><Trans>Your Profile, Your Brand</Trans></h3>
            <p>
              <Trans>
                Build a professional profile with your name, location, phone
                number, and a custom avatar. Your profile is your identity on
                the platform — keep it up to date and let recruiters know
                who they're dealing with.
              </Trans>
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="for-us-how">
        <h2><Trans>How It Works</Trans></h2>
        <p className="for-us-section-sub"><Trans>Four simple steps to land your next role.</Trans></p>
        <div className="for-us-steps">
          <div className="for-us-step">
            <div className="for-us-step-number">1</div>
            <div>
              <h3><Trans>Create Your Account</Trans></h3>
              <p>
                <Trans>
                  Sign up for free in under a minute. Fill in your basic
                  details and you're ready to explore the platform.
                </Trans>
              </p>
            </div>
          </div>
          <div className="for-us-step">
            <div className="for-us-step-number">2</div>
            <div>
              <h3><Trans>Explore & Filter Jobs</Trans></h3>
              <p>
                <Trans>
                  Use the homepage to browse featured listings, explore jobs
                  by category, or use advanced filters to zero in on the
                  roles that match your skills and preferences.
                </Trans>
              </p>
            </div>
          </div>
          <div className="for-us-step">
            <div className="for-us-step-number">3</div>
            <div>
              <h3><Trans>Apply with Confidence</Trans></h3>
              <p>
                <Trans>
                  Open a job listing, read the full description — including
                  required skills, benefits, salary, and deadline — then
                  submit your application with your CV and a personalized
                  cover letter.
                </Trans>
              </p>
            </div>
          </div>
          <div className="for-us-step">
            <div className="for-us-step-number">4</div>
            <div>
              <h3><Trans>Get Notified & Respond</Trans></h3>
              <p>
                <Trans>
                  Sit back and let the notifications come to you. You'll be
                  alerted in real time when recruiters review, approve, or
                  reach out about your application.
                </Trans>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why JobBoard */}
      <section className="for-us-why">
        <h2><Trans>Why JobBoard?</Trans></h2>
        <div className="for-us-why-grid">
          <div className="for-us-why-item">
            <span>✅</span>
            <p><Trans><strong>Free to use</strong> — Creating an account and applying to jobs costs nothing.</Trans></p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><Trans><strong>Real-time everything</strong> — Notifications, application updates, and company invites arrive instantly.</Trans></p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><Trans><strong>Transparent process</strong> — A clear application status pipeline so you always know what's happening.</Trans></p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><Trans><strong>Dual role support</strong> — Be a candidate and a company team member at the same time.</Trans></p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><Trans><strong>Verified companies</strong> — Every company on the platform has an owner account and a registered profile.</Trans></p>
          </div>
          <div className="for-us-why-item">
            <span>✅</span>
            <p><Trans><strong>Secure & private</strong> — Your data is protected with industry-standard encryption and token-based authentication.</Trans></p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="for-us-cta">
        <h2><Trans>Ready to Find Your Next Job?</Trans></h2>
        <p><Trans>Join thousands of professionals already using JobBoard to advance their careers.</Trans></p>
      <Link to="/jobs" className="for-us-cta-btn">Browse Jobs</Link>
      </section>

   </Container>
    </div>
  </>
  )
}