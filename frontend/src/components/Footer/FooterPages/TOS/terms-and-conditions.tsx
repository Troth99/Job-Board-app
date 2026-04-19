
import { Container } from "../../../Container/Container";
import "./tos.css";

export default function TermsAndConditions() {
    return (
        <div className="tos-page">
            <Container>
                <section className="tos-hero">
                    <span className="tos-badge">Legal</span>
                    <h1>Terms and Conditions</h1>
                    <p>
                        These Terms and Conditions govern the use of JobBoard for job
                        seekers, employers, and company team members. By creating an account
                        or using the platform, you agree to these terms.
                    </p>
                    <p className="tos-updated">Last updated: April 19, 2026</p>
                </section>

                <section className="tos-toc" aria-label="Table of contents">
                    <h2>Contents</h2>
                    <div className="tos-toc-grid">
                        <a href="#acceptance">1. Acceptance of Terms</a>
                        <a href="#services">2. Platform Services</a>
                        <a href="#accounts">3. Accounts and Eligibility</a>
                        <a href="#jobseekers">4. Rules for Job Seekers</a>
                        <a href="#employers">5. Rules for Employers</a>
                        <a href="#applications">6. Applications and Hiring Decisions</a>
                        <a href="#notifications">7. Notifications and Communications</a>
                        <a href="#content">8. User Content and Conduct</a>
                        <a href="#privacy">9. Privacy and Security</a>
                        <a href="#liability">10. Disclaimers and Liability</a>
                        <a href="#termination">11. Suspension and Termination</a>
                        <a href="#changes">12. Changes to the Terms</a>
                        <a href="#contact">13. Contact Information</a>
                    </div>
                </section>

                <section className="tos-section" id="acceptance">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using JobBoard, you confirm that you have read,
                        understood, and accepted these Terms and Conditions. If you do not
                        agree, you must stop using the platform.
                    </p>
                </section>

                <section className="tos-section" id="services">
                    <h2>2. Platform Services</h2>
                    <p>JobBoard provides tools that include, but are not limited to:</p>
                    <ul>
                        <li>Browsing and filtering jobs by category and keywords.</li>
                        <li>Applying to job postings through candidate profiles.</li>
                        <li>Creating and managing company profiles and job listings.</li>
                        <li>Managing candidate applications through status updates.</li>
                        <li>Receiving platform notifications for account activity.</li>
                    </ul>
                    <p>
                        JobBoard acts as a marketplace platform and is not a party to any
                        employment contract between candidates and employers.
                    </p>
                </section>

                <section className="tos-section" id="accounts">
                    <h2>3. Accounts and Eligibility</h2>
                    <ul>
                        <li>
                            You must provide accurate information when registering and keep your
                            profile details up to date.
                        </li>
                        <li>
                            You are responsible for account security, including your password
                            and all activity under your account.
                        </li>
                        <li>
                            Employers must represent legitimate organizations and use truthful
                            company information.
                        </li>
                        <li>
                            Sharing or transferring accounts to third parties is not permitted.
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="jobseekers">
                    <h2>4. Rules for Job Seekers</h2>
                    <ul>
                        <li>
                            Provide truthful information in your profile, CV links, and
                            application materials.
                        </li>
                        <li>
                            Do not impersonate another person or submit misleading documents.
                        </li>
                        <li>
                            Use respectful communication with recruiters and company members.
                        </li>
                        <li>
                            Do not use automated tools to spam job applications.
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="employers">
                    <h2>5. Rules for Employers</h2>
                    <ul>
                        <li>
                            Job posts must be genuine, lawful, and clearly describe role,
                            location, and responsibilities.
                        </li>
                        <li>
                            Misleading, discriminatory, or deceptive job ads are prohibited.
                        </li>
                        <li>
                            Employers are responsible for actions performed by their invited
                            company members (owner, admin, recruiter, member roles).
                        </li>
                        <li>
                            Employers must process candidate data in compliance with applicable
                            privacy laws.
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="applications">
                    <h2>6. Applications and Hiring Decisions</h2>
                    <p>
                        JobBoard provides application workflow tools (for example statuses
                        such as New, Under Review, Approved, Rejected). Final decisions are
                        made solely by employers. JobBoard does not guarantee interviews,
                        offers, or employment outcomes.
                    </p>
                </section>

                <section className="tos-section" id="notifications">
                    <h2>7. Notifications and Communications</h2>
                    <p>
                        The platform may send in-app and real-time updates related to account
                        activity, application status changes, invitations, and system events.
                        You are responsible for reviewing these notifications.
                    </p>
                </section>

                <section className="tos-section" id="content">
                    <h2>8. User Content and Conduct</h2>
                    <ul>
                        <li>
                            You retain ownership of content you submit, but grant JobBoard a
                            limited license to display and process it for platform operation.
                        </li>
                        <li>
                            Content that is unlawful, abusive, fraudulent, or infringing is not
                            allowed.
                        </li>
                        <li>
                            JobBoard may remove content or restrict accounts that violate these
                            terms.
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="privacy">
                    <h2>9. Privacy and Security</h2>
                    <p>
                        JobBoard uses authentication and access controls to protect accounts.
                        Users must keep credentials confidential and report suspected
                        unauthorized activity. Personal data handling is further described in
                        the Privacy and Cookies pages.
                    </p>
                </section>

                <section className="tos-section" id="liability">
                    <h2>10. Disclaimers and Liability</h2>
                    <ul>
                        <li>
                            The platform is provided on an "as is" and "as available" basis.
                        </li>
                        <li>
                            JobBoard is not responsible for the accuracy of third-party job
                            posts or candidate-submitted information.
                        </li>
                        <li>
                            To the extent permitted by law, JobBoard is not liable for indirect
                            or consequential damages arising from use of the platform.
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="termination">
                    <h2>11. Suspension and Termination</h2>
                    <p>
                        JobBoard may suspend or terminate accounts that violate these Terms,
                        threaten platform security, or engage in fraudulent activity. Users
                        may request account closure via the contact channels provided.
                    </p>
                </section>

                <section className="tos-section" id="changes">
                    <h2>12. Changes to the Terms</h2>
                    <p>
                        We may update these Terms and Conditions from time to time. Updated
                        versions become effective once published on this page.
                    </p>
                </section>

                <section className="tos-section" id="contact">
                    <h2>13. Contact Information</h2>
                    <p>
                        For legal or terms-related questions, contact us at
                        <a href="mailto:legal@jobboard.com"> legal@jobboard.com</a>.
                    </p>
                </section>
            </Container>
        </div>
    );
}