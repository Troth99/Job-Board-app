import { Trans } from "@lingui/react/macro";
import MetaData from "../../../../seo/MetaDataTags";
import { generateSeoConfig } from "../../../../seo/seo";
import { Container } from "../../../components/Container/Container";
import "./privacy.css";


export default function Privacy() {
    const seo = generateSeoConfig("privacy");
    return (
        <>
     <MetaData seo={seo} />

        <div className="privacy-page">
            <Container>
                <section className="privacy-hero">
                    <span className="privacy-badge"><Trans>Legal</Trans></span>
                    <h1><Trans>Privacy Policy</Trans></h1>
                    <p>
                        <Trans>
                            This Privacy Policy explains what data JobBoard collects, how it is
                            used, and what rights users have. It applies to job seekers,
                            employers, and invited company team members.
                        </Trans>
                    </p>
                    <p className="privacy-updated"><Trans>Last updated: April 19, 2026</Trans></p>
                </section>

                <section className="privacy-toc" aria-label="Table of contents">
                    <h2><Trans>Contents</Trans></h2>
                    <div className="privacy-toc-grid">
                        <a href="#scope"><Trans>1. Scope</Trans></a>
                        <a href="#collect"><Trans>2. Data We Collect</Trans></a>
                        <a href="#usage"><Trans>3. How We Use Data</Trans></a>
                        <a href="#legal-basis"><Trans>4. Legal Basis</Trans></a>
                        <a href="#sharing"><Trans>5. Data Sharing</Trans></a>
                        <a href="#retention"><Trans>6. Data Retention</Trans></a>
                        <a href="#security"><Trans>7. Security Measures</Trans></a>
                        <a href="#rights"><Trans>8. Your Rights</Trans></a>
                        <a href="#cookies"><Trans>9. Cookies and Similar Tech</Trans></a>
                        <a href="#transfers"><Trans>10. International Transfers</Trans></a>
                        <a href="#children"><Trans>11. Children Privacy</Trans></a>
                        <a href="#updates"><Trans>12. Policy Updates</Trans></a>
                        <a href="#contact"><Trans>13. Contact</Trans></a>
                    </div>
                </section>

                <section className="privacy-section" id="scope">
                    <h2><Trans>1. Scope</Trans></h2>
                    <p>
                        <Trans>
                            This policy covers data processed through JobBoard website features,
                            including account registration, job applications, company management,
                            notification delivery, and profile management.
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="collect">
                    <h2><Trans>2. Data We Collect</Trans></h2>
                    <h3><Trans>2.1 Account and profile data</Trans></h3>
                    <ul>
                        <li><Trans>Name, email address, and encrypted credentials.</Trans></li>
                        <li><Trans>Profile fields such as phone, location, and avatar.</Trans></li>
                        <li><Trans>Role context (candidate or company-related permissions).</Trans></li>
                    </ul>

                    <h3><Trans>2.2 Application and job data</Trans></h3>
                    <ul>
                        <li><Trans>Job applications, CV links, and cover letter content.</Trans></li>
                        <li><Trans>Application statuses and related timestamps.</Trans></li>
                        <li><Trans>Employer job listing details and company profile data.</Trans></li>
                    </ul>

                    <h3><Trans>2.3 Technical and usage data</Trans></h3>
                    <ul>
                        <li><Trans>Log events, browser metadata, and request diagnostics.</Trans></li>
                        <li><Trans>Notification and session activity.</Trans></li>
                        <li><Trans>Security-related token/session records for authentication.</Trans></li>
                    </ul>
                </section>

                <section className="privacy-section" id="usage">
                    <h2><Trans>3. How We Use Data</Trans></h2>
                    <ul>
                        <li><Trans>To create and maintain user accounts.</Trans></li>
                        <li><Trans>To power job discovery and application workflows.</Trans></li>
                        <li><Trans>To enable company team collaboration and role-based access.</Trans></li>
                        <li><Trans>To deliver notifications and status updates in near real time.</Trans></li>
                        <li><Trans>To prevent abuse, fraud, and unauthorized access.</Trans></li>
                        <li><Trans>To troubleshoot, improve usability, and maintain stability.</Trans></li>
                    </ul>
                </section>

                <section className="privacy-section" id="legal-basis">
                    <h2><Trans>4. Legal Basis</Trans></h2>
                    <p><Trans>Depending on your location, processing may rely on:</Trans></p>
                    <ul>
                        <li><Trans>Contract performance (providing requested platform services).</Trans></li>
                        <li><Trans>Legitimate interests (security, reliability, analytics).</Trans></li>
                        <li><Trans>Consent (where required, such as optional cookies/tools).</Trans></li>
                        <li><Trans>Legal obligations (compliance and lawful requests).</Trans></li>
                    </ul>
                </section>

                <section className="privacy-section" id="sharing">
                    <h2><Trans>5. Data Sharing</Trans></h2>
                    <p><Trans>JobBoard may share data only when necessary:</Trans></p>
                    <ul>
                        <li>
                            <Trans>
                                Between candidates and employers for hiring workflows (for example
                                profile/application visibility to authorized company users).
                            </Trans>
                        </li>
                        <li><Trans>With infrastructure providers that support hosting and delivery.</Trans></li>
                        <li><Trans>When required by law, regulation, or valid legal process.</Trans></li>
                    </ul>
                    <p>
                        <Trans>We do not sell personal data to third parties for unrelated marketing.</Trans>
                    </p>
                </section>

                <section className="privacy-section" id="retention">
                    <h2><Trans>6. Data Retention</Trans></h2>
                    <p>
                        <Trans>
                            Data is retained for as long as needed to provide services, protect
                            platform security, resolve disputes, and meet legal requirements.
                            Retention periods vary by data type (for example account, application,
                            and security records).
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="security">
                    <h2><Trans>7. Security Measures</Trans></h2>
                    <ul>
                        <li><Trans>Authentication controls and protected account access flows.</Trans></li>
                        <li><Trans>Role-based permissions for company member actions.</Trans></li>
                        <li><Trans>Password reset/change flows and token lifecycle management.</Trans></li>
                        <li><Trans>Monitoring for suspicious behavior and abuse patterns.</Trans></li>
                    </ul>
                    <p>
                        <Trans>
                            No online service can be guaranteed 100% secure, but we continuously
                            improve safeguards to reduce risk.
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="rights">
                    <h2><Trans>8. Your Rights</Trans></h2>
                    <p><Trans>Depending on applicable law, you may have rights to:</Trans></p>
                    <ul>
                        <li><Trans>Access your personal data.</Trans></li>
                        <li><Trans>Correct inaccurate data.</Trans></li>
                        <li><Trans>Request deletion or restriction of processing.</Trans></li>
                        <li><Trans>Object to certain processing activities.</Trans></li>
                        <li><Trans>Request data portability where applicable.</Trans></li>
                    </ul>
                    <p>
                        <Trans>
                            You can also manage parts of your data through your profile and
                            account settings.
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="cookies">
                    <h2><Trans>9. Cookies and Similar Tech</Trans></h2>
                    <p>
                        <Trans>
                            JobBoard may use cookies or similar technologies for authentication,
                            session continuity, and basic analytics. See the Cookies page for
                            additional details.
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="transfers">
                    <h2><Trans>10. International Transfers</Trans></h2>
                    <p>
                        <Trans>
                            If data is processed in different jurisdictions, appropriate
                            contractual and organizational safeguards are applied where required.
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="children">
                    <h2><Trans>11. Children Privacy</Trans></h2>
                    <p>
                        <Trans>
                            JobBoard is not intended for children under the minimum legal age for
                            employment-related services in the relevant jurisdiction.
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="updates">
                    <h2><Trans>12. Policy Updates</Trans></h2>
                    <p>
                        <Trans>
                            This Privacy Policy may be updated to reflect legal, technical, or
                            operational changes. The latest version is always published here.
                        </Trans>
                    </p>
                </section>

                <section className="privacy-section" id="contact">
                    <h2><Trans>13. Contact</Trans></h2>
                    <p>
                        <Trans>
                            For privacy requests or questions, contact
                            <a href="mailto:privacy@jobboard.com"> privacy@jobboard.com</a>.
                        </Trans>
                    </p>
                </section>
            </Container>
        </div>
        </>
    );
}