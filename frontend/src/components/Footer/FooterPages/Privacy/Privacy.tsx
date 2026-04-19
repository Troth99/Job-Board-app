import { Container } from "../../../Container/Container";
import "./privacy.css";

export default function Privacy() {
    return (
        <div className="privacy-page">
            <Container>
                <section className="privacy-hero">
                    <span className="privacy-badge">Legal</span>
                    <h1>Privacy Policy</h1>
                    <p>
                        This Privacy Policy explains what data JobBoard collects, how it is
                        used, and what rights users have. It applies to job seekers,
                        employers, and invited company team members.
                    </p>
                    <p className="privacy-updated">Last updated: April 19, 2026</p>
                </section>

                <section className="privacy-toc" aria-label="Table of contents">
                    <h2>Contents</h2>
                    <div className="privacy-toc-grid">
                        <a href="#scope">1. Scope</a>
                        <a href="#collect">2. Data We Collect</a>
                        <a href="#usage">3. How We Use Data</a>
                        <a href="#legal-basis">4. Legal Basis</a>
                        <a href="#sharing">5. Data Sharing</a>
                        <a href="#retention">6. Data Retention</a>
                        <a href="#security">7. Security Measures</a>
                        <a href="#rights">8. Your Rights</a>
                        <a href="#cookies">9. Cookies and Similar Tech</a>
                        <a href="#transfers">10. International Transfers</a>
                        <a href="#children">11. Children Privacy</a>
                        <a href="#updates">12. Policy Updates</a>
                        <a href="#contact">13. Contact</a>
                    </div>
                </section>

                <section className="privacy-section" id="scope">
                    <h2>1. Scope</h2>
                    <p>
                        This policy covers data processed through JobBoard website features,
                        including account registration, job applications, company management,
                        notification delivery, and profile management.
                    </p>
                </section>

                <section className="privacy-section" id="collect">
                    <h2>2. Data We Collect</h2>
                    <h3>2.1 Account and profile data</h3>
                    <ul>
                        <li>Name, email address, and encrypted credentials.</li>
                        <li>Profile fields such as phone, location, and avatar.</li>
                        <li>Role context (candidate or company-related permissions).</li>
                    </ul>

                    <h3>2.2 Application and job data</h3>
                    <ul>
                        <li>Job applications, CV links, and cover letter content.</li>
                        <li>Application statuses and related timestamps.</li>
                        <li>Employer job listing details and company profile data.</li>
                    </ul>

                    <h3>2.3 Technical and usage data</h3>
                    <ul>
                        <li>Log events, browser metadata, and request diagnostics.</li>
                        <li>Notification and session activity.</li>
                        <li>Security-related token/session records for authentication.</li>
                    </ul>
                </section>

                <section className="privacy-section" id="usage">
                    <h2>3. How We Use Data</h2>
                    <ul>
                        <li>To create and maintain user accounts.</li>
                        <li>To power job discovery and application workflows.</li>
                        <li>To enable company team collaboration and role-based access.</li>
                        <li>To deliver notifications and status updates in near real time.</li>
                        <li>To prevent abuse, fraud, and unauthorized access.</li>
                        <li>To troubleshoot, improve usability, and maintain stability.</li>
                    </ul>
                </section>

                <section className="privacy-section" id="legal-basis">
                    <h2>4. Legal Basis</h2>
                    <p>Depending on your location, processing may rely on:</p>
                    <ul>
                        <li>Contract performance (providing requested platform services).</li>
                        <li>Legitimate interests (security, reliability, analytics).</li>
                        <li>Consent (where required, such as optional cookies/tools).</li>
                        <li>Legal obligations (compliance and lawful requests).</li>
                    </ul>
                </section>

                <section className="privacy-section" id="sharing">
                    <h2>5. Data Sharing</h2>
                    <p>JobBoard may share data only when necessary:</p>
                    <ul>
                        <li>
                            Between candidates and employers for hiring workflows (for example
                            profile/application visibility to authorized company users).
                        </li>
                        <li>With infrastructure providers that support hosting and delivery.</li>
                        <li>When required by law, regulation, or valid legal process.</li>
                    </ul>
                    <p>
                        We do not sell personal data to third parties for unrelated marketing.
                    </p>
                </section>

                <section className="privacy-section" id="retention">
                    <h2>6. Data Retention</h2>
                    <p>
                        Data is retained for as long as needed to provide services, protect
                        platform security, resolve disputes, and meet legal requirements.
                        Retention periods vary by data type (for example account, application,
                        and security records).
                    </p>
                </section>

                <section className="privacy-section" id="security">
                    <h2>7. Security Measures</h2>
                    <ul>
                        <li>Authentication controls and protected account access flows.</li>
                        <li>Role-based permissions for company member actions.</li>
                        <li>Password reset/change flows and token lifecycle management.</li>
                        <li>Monitoring for suspicious behavior and abuse patterns.</li>
                    </ul>
                    <p>
                        No online service can be guaranteed 100% secure, but we continuously
                        improve safeguards to reduce risk.
                    </p>
                </section>

                <section className="privacy-section" id="rights">
                    <h2>8. Your Rights</h2>
                    <p>Depending on applicable law, you may have rights to:</p>
                    <ul>
                        <li>Access your personal data.</li>
                        <li>Correct inaccurate data.</li>
                        <li>Request deletion or restriction of processing.</li>
                        <li>Object to certain processing activities.</li>
                        <li>Request data portability where applicable.</li>
                    </ul>
                    <p>
                        You can also manage parts of your data through your profile and
                        account settings.
                    </p>
                </section>

                <section className="privacy-section" id="cookies">
                    <h2>9. Cookies and Similar Tech</h2>
                    <p>
                        JobBoard may use cookies or similar technologies for authentication,
                        session continuity, and basic analytics. See the Cookies page for
                        additional details.
                    </p>
                </section>

                <section className="privacy-section" id="transfers">
                    <h2>10. International Transfers</h2>
                    <p>
                        If data is processed in different jurisdictions, appropriate
                        contractual and organizational safeguards are applied where required.
                    </p>
                </section>

                <section className="privacy-section" id="children">
                    <h2>11. Children Privacy</h2>
                    <p>
                        JobBoard is not intended for children under the minimum legal age for
                        employment-related services in the relevant jurisdiction.
                    </p>
                </section>

                <section className="privacy-section" id="updates">
                    <h2>12. Policy Updates</h2>
                    <p>
                        This Privacy Policy may be updated to reflect legal, technical, or
                        operational changes. The latest version is always published here.
                    </p>
                </section>

                <section className="privacy-section" id="contact">
                    <h2>13. Contact</h2>
                    <p>
                        For privacy requests or questions, contact
                        <a href="mailto:privacy@jobboard.com"> privacy@jobboard.com</a>.
                    </p>
                </section>
            </Container>
        </div>
    );
}