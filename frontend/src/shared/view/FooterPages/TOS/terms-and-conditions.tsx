

import { Trans } from "@lingui/react/macro";
import MetaData from "../../../../seo/MetaDataTags";
import { generateSeoConfig } from "../../../../seo/seo";
import { Container } from "../../../components/Container/Container";
import "./tos.css";

export default function TermsAndConditions() {
    const seo = generateSeoConfig("terms-and-conditions");
    return (
        <>
      <MetaData seo={seo} />

       
        <div className="tos-page">
            <Container>
                <section className="tos-hero">
                    <span className="tos-badge"><Trans>Legal</Trans></span>
                    <h1><Trans>Terms and Conditions</Trans></h1>
                    <p>
                        <Trans>
                            These Terms and Conditions govern the use of JobBoard for job
                            seekers, employers, and company team members. By creating an account
                            or using the platform, you agree to these terms.
                        </Trans>
                    </p>
                    <p className="tos-updated"><Trans>Last updated: April 19, 2026</Trans></p>
                </section>

                <section className="tos-toc" aria-label="Table of contents">
                    <h2><Trans>Contents</Trans></h2>
                    <div className="tos-toc-grid">
                        <a href="#acceptance"><Trans>1. Acceptance of Terms</Trans></a>
                        <a href="#services"><Trans>2. Platform Services</Trans></a>
                        <a href="#accounts"><Trans>3. Accounts and Eligibility</Trans></a>
                        <a href="#jobseekers"><Trans>4. Rules for Job Seekers</Trans></a>
                        <a href="#employers"><Trans>5. Rules for Employers</Trans></a>
                        <a href="#applications"><Trans>6. Applications and Hiring Decisions</Trans></a>
                        <a href="#notifications"><Trans>7. Notifications and Communications</Trans></a>
                        <a href="#content"><Trans>8. User Content and Conduct</Trans></a>
                        <a href="#privacy"><Trans>9. Privacy and Security</Trans></a>
                        <a href="#liability"><Trans>10. Disclaimers and Liability</Trans></a>
                        <a href="#termination"><Trans>11. Suspension and Termination</Trans></a>
                        <a href="#changes"><Trans>12. Changes to the Terms</Trans></a>
                        <a href="#contact"><Trans>13. Contact Information</Trans></a>
                    </div>
                </section>

                <section className="tos-section" id="acceptance">
                    <h2><Trans>1. Acceptance of Terms</Trans></h2>
                    <p>
                        <Trans>
                            By accessing or using JobBoard, you confirm that you have read,
                            understood, and accepted these Terms and Conditions. If you do not
                            agree, you must stop using the platform.
                        </Trans>
                    </p>
                </section>

                <section className="tos-section" id="services">
                    <h2><Trans>2. Platform Services</Trans></h2>
                    <p><Trans>JobBoard provides tools that include, but are not limited to:</Trans></p>
                    <ul>
                        <li><Trans>Browsing and filtering jobs by category and keywords.</Trans></li>
                        <li><Trans>Applying to job postings through candidate profiles.</Trans></li>
                        <li><Trans>Creating and managing company profiles and job listings.</Trans></li>
                        <li><Trans>Managing candidate applications through status updates.</Trans></li>
                        <li><Trans>Receiving platform notifications for account activity.</Trans></li>
                    </ul>
                    <p>
                        <Trans>
                            JobBoard acts as a marketplace platform and is not a party to any
                            employment contract between candidates and employers.
                        </Trans>
                    </p>
                </section>

                <section className="tos-section" id="accounts">
                    <h2><Trans>3. Accounts and Eligibility</Trans></h2>
                    <ul>
                        <li>
                            <Trans>
                                You must provide accurate information when registering and keep your
                                profile details up to date.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                You are responsible for account security, including your password
                                and all activity under your account.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Employers must represent legitimate organizations and use truthful
                                company information.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Sharing or transferring accounts to third parties is not permitted.
                            </Trans>
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="jobseekers">
                    <h2><Trans>4. Rules for Job Seekers</Trans></h2>
                    <ul>
                        <li>
                            <Trans>
                                Provide truthful information in your profile, CV links, and
                                application materials.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Do not impersonate another person or submit misleading documents.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Use respectful communication with recruiters and company members.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Do not use automated tools to spam job applications.
                            </Trans>
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="employers">
                    <h2><Trans>5. Rules for Employers</Trans></h2>
                    <ul>
                        <li>
                            <Trans>
                                Job posts must be genuine, lawful, and clearly describe role,
                                location, and responsibilities.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Misleading, discriminatory, or deceptive job ads are prohibited.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Employers are responsible for actions performed by their invited
                                company members (owner, admin, recruiter, member roles).
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Employers must process candidate data in compliance with applicable
                                privacy laws.
                            </Trans>    
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="applications">
                    <h2><Trans>6. Applications and Hiring Decisions</Trans></h2>
                    <p>
                        <Trans>
                            JobBoard provides application workflow tools (for example statuses
                            such as New, Under Review, Approved, Rejected). Final decisions are
                            made solely by employers. JobBoard does not guarantee interviews,
                            offers, or employment outcomes.
                        </Trans>
                    </p>
                </section>

                <section className="tos-section" id="notifications">
                    <h2><Trans>7. Notifications and Communications</Trans></h2>
                    <p>
                        <Trans>
                            The platform may send in-app and real-time updates related to account
                            activity, application status changes, invitations, and system events.
                            You are responsible for reviewing these notifications.
                        </Trans>
                    </p>
                </section>

                <section className="tos-section" id="content">
                    <h2><Trans>8. User Content and Conduct</Trans></h2>
                    <ul>
                        <li>
                            <Trans>
                                You retain ownership of content you submit, but grant JobBoard a
                                limited license to display and process it for platform operation.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                Content that is unlawful, abusive, fraudulent, or infringing is not
                                allowed.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                JobBoard may remove content or restrict accounts that violate these
                                terms.
                            </Trans>
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="privacy">
                    <h2><Trans>9. Privacy and Security</Trans></h2>
                    <p>
                        <Trans>
                            JobBoard uses authentication and access controls to protect accounts.
                            Users must keep credentials confidential and report suspected
                            unauthorized activity. Personal data handling is further described in
                            the Privacy and Cookies pages.
                        </Trans>
                    </p>
                </section>

                <section className="tos-section" id="liability">
                    <h2><Trans>10. Disclaimers and Liability</Trans></h2>
                    <ul>
                        <li>
                            <Trans>
                                The platform is provided on an "as is" and "as available" basis.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                JobBoard is not responsible for the accuracy of third-party job
                                posts or candidate-submitted information.
                            </Trans>
                        </li>
                        <li>
                            <Trans>
                                To the extent permitted by law, JobBoard is not liable for indirect
                                or consequential damages arising from use of the platform.
                            </Trans>
                        </li>
                    </ul>
                </section>

                <section className="tos-section" id="termination">
                    <h2><Trans>11. Suspension and Termination</Trans></h2>
                    <p>
                        <Trans>
                            JobBoard may suspend or terminate accounts that violate these Terms,
                            threaten platform security, or engage in fraudulent activity. Users
                            may request account closure via the contact channels provided.
                        </Trans>
                    </p>
                </section>

                <section className="tos-section" id="changes">
                    <h2><Trans>12. Changes to the Terms</Trans></h2>
                    <p>
                        <Trans>
                            We may update these Terms and Conditions from time to time. Updated
                            versions become effective once published on this page.
                        </Trans>
                    </p>
                </section>

                <section className="tos-section" id="contact">
                    <h2><Trans>13. Contact Information</Trans></h2>
                    <p>
                        <Trans>
                            For legal or terms-related questions, contact us at
                            <a href="mailto:legal@jobboard.com"> legal@jobboard.com</a>.
                        </Trans>
                    </p>
                </section>
            </Container>
        </div>
         </>
    );
}