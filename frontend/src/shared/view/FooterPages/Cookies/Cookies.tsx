
import { Trans } from "@lingui/react/macro";
import MetaData from "../../../../seo/MetaDataTags";
import { generateSeoConfig } from "../../../../seo/seo";
import { Container } from "../../../components/Container/Container";
import "./Cookies.css";


export default function Cookies() {
    const seo = generateSeoConfig("cookies");
    return (
        <>
      <MetaData seo={seo} />
        <div className="cookies-page">
            <Container>
                <section className="cookies-hero">
                    <span className="cookies-badge"><Trans>Legal</Trans></span>
                    <h1><Trans>Cookies Policy</Trans></h1>
                    <p>
                        <Trans>
                            This Cookies Policy explains how JobBoard uses cookies and similar
                            technologies to keep your session secure, improve reliability, and
                            optimize platform performance.
                        </Trans>
                    </p>
                    <p className="cookies-updated"><Trans>Last updated: April 19, 2026</Trans></p>
                </section>

                <section className="cookies-toc" aria-label="Table of contents">
                    <h2><Trans>Contents</Trans></h2>
                    <div className="cookies-toc-grid">
                        <a href="#what-are-cookies"><Trans>1. What Are Cookies</Trans></a>
                        <a href="#why-use-cookies"><Trans>2. Why We Use Cookies</Trans></a>
                        <a href="#cookie-types"><Trans>3. Cookie Categories</Trans></a>
                        <a href="#session-auth"><Trans>4. Session and Authentication</Trans></a>
                        <a href="#performance"><Trans>5. Performance and Reliability</Trans></a>
                        <a href="#preferences"><Trans>6. Preferences and Settings</Trans></a>
                        <a href="#third-parties"><Trans>7. Third-Party Services</Trans></a>
                        <a href="#manage"><Trans>8. How to Manage Cookies</Trans></a>
                        <a href="#retention"><Trans>9. Cookie Duration</Trans></a>
                        <a href="#updates"><Trans>10. Changes to This Policy</Trans></a>
                        <a href="#contact"><Trans>11. Contact</Trans></a>
                    </div>
                </section>

                <section className="cookies-section" id="what-are-cookies">
                    <h2><Trans>1. What Are Cookies</Trans></h2>
                    <p>
                        <Trans>
                            Cookies are small text files stored on your device by your browser.
                            Similar technologies (such as local storage/session storage) can also
                            be used to remember session state and improve the user experience.
                        </Trans>
                    </p>
                </section>

                <section className="cookies-section" id="why-use-cookies">
                    <h2><Trans>2. Why We Use Cookies</Trans></h2>
                    <ul>
                        <li><Trans>To keep users signed in securely.</Trans></li>
                        <li><Trans>To protect account and session integrity.</Trans></li>
                        <li><Trans>To improve loading performance and stability.</Trans></li>
                        <li><Trans>To remember interface choices where applicable.</Trans></li>
                        <li><Trans>To understand platform usage at an aggregated level.</Trans></li>
                    </ul>
                </section>

                <section className="cookies-section" id="cookie-types">
                    <h2><Trans>3. Cookie Categories</Trans></h2>

                    <h3><Trans>3.1 Strictly Necessary</Trans></h3>
                    <p>
                        <Trans>
                            Required for core features such as login flows, secure navigation,
                            and access to protected account areas.
                        </Trans>
                    </p>

                    <h3><Trans>3.2 Functional</Trans></h3>
                    <p>
                        <Trans>
                            Support user convenience features, such as remembering certain
                            interface preferences.
                        </Trans>
                    </p>

                    <h3><Trans>3.3 Performance</Trans></h3>
                    <p>
                        <Trans>
                            Help monitor service quality and detect technical issues so we can
                            improve speed and reliability.
                        </Trans>
                    </p>

                    <h3><Trans>3.4 Analytics (where enabled)</Trans></h3>
                    <p>
                        <Trans>
                            Used in aggregated form to understand traffic and feature usage.
                            These do not intentionally identify users personally.
                        </Trans>
                    </p>
                </section>

                <section className="cookies-section" id="session-auth">
                    <h2><Trans>4. Session and Authentication</Trans></h2>
                    <p>
                        <Trans>
                            JobBoard uses secure session and token-related mechanisms to support
                            login, account protection, and role-based access for candidates,
                            employers, and company team members.
                        </Trans>
                    </p>
                    <ul>
                        <li><Trans>Session continuity after authentication.</Trans></li>
                        <li><Trans>Protection against unauthorized account use.</Trans></li>
                        <li><Trans>Support for password reset and account security flows.</Trans></li>
                    </ul>
                </section>

                <section className="cookies-section" id="performance">
                    <h2><Trans>5. Performance and Reliability</Trans></h2>
                    <p>
                        <Trans>
                            Certain storage technologies may help reduce repetitive requests,
                            improve response behavior, and support stable notification/session
                            handling for core platform actions.
                        </Trans>
                    </p>
                </section>

                <section className="cookies-section" id="preferences">
                    <h2><Trans>6. Preferences and Settings</Trans></h2>
                    <p>
                        <Trans>
                            Where available, preference cookies/storage can remember selected UI
                            behavior (for example display preferences) to provide a smoother
                            experience between visits.
                        </Trans>
                    </p>
                </section>

                <section className="cookies-section" id="third-parties">
                    <h2><Trans>7. Third-Party Services</Trans></h2>
                    <p>
                        <Trans>
                            Some infrastructure and tooling providers may set or process
                            technically necessary data for hosting, delivery, and security. We do
                            not permit unrelated third-party advertising cookies through core
                            platform pages.
                        </Trans>
                    </p>
                </section>

                <section className="cookies-section" id="manage">
                    <h2><Trans>8. How to Manage Cookies</Trans></h2>
                    <ul>
                        <li><Trans>You can control cookies from your browser settings.</Trans></li>
                        <li><Trans>You may block or delete stored cookies at any time.</Trans></li>
                        <li>
                            <Trans>
                                Disabling strictly necessary cookies may break login and protected
                                page functionality.
                            </Trans>
                        </li>
                    </ul>
                </section>

                <section className="cookies-section" id="retention">
                    <h2><Trans>9. Cookie Duration</Trans></h2>
                    <p>
                        <Trans>
                            Cookies can be session-based (deleted when you close your browser) or
                            persistent (stored for a defined period). Retention depends on the
                            purpose and legal requirements.
                        </Trans>
                    </p>
                </section>

                <section className="cookies-section" id="updates">
                    <h2><Trans>10. Changes to This Policy</Trans></h2>
                    <p>
                        <Trans>
                            We may update this Cookies Policy due to technical, operational, or
                            legal changes. The most recent version is always published on this
                            page.
                        </Trans>
                    </p>
                </section>

                <section className="cookies-section" id="contact">
                    <h2><Trans>11. Contact</Trans></h2>
                    <p>
                        <Trans>
                            For cookie-related questions, contact
                            <a href="mailto:privacy@jobboard.com"> privacy@jobboard.com</a>.
                        </Trans>
                    </p>
                </section>
            </Container>
        </div>
        </>
    );
}