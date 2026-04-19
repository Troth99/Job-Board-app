import { Container } from "../../../Container/Container";
import "./Cookies.css";

export default function Cookies() {
    return (
        <div className="cookies-page">
            <Container>
                <section className="cookies-hero">
                    <span className="cookies-badge">Legal</span>
                    <h1>Cookies Policy</h1>
                    <p>
                        This Cookies Policy explains how JobBoard uses cookies and similar
                        technologies to keep your session secure, improve reliability, and
                        optimize platform performance.
                    </p>
                    <p className="cookies-updated">Last updated: April 19, 2026</p>
                </section>

                <section className="cookies-toc" aria-label="Table of contents">
                    <h2>Contents</h2>
                    <div className="cookies-toc-grid">
                        <a href="#what-are-cookies">1. What Are Cookies</a>
                        <a href="#why-use-cookies">2. Why We Use Cookies</a>
                        <a href="#cookie-types">3. Cookie Categories</a>
                        <a href="#session-auth">4. Session and Authentication</a>
                        <a href="#performance">5. Performance and Reliability</a>
                        <a href="#preferences">6. Preferences and Settings</a>
                        <a href="#third-parties">7. Third-Party Services</a>
                        <a href="#manage">8. How to Manage Cookies</a>
                        <a href="#retention">9. Cookie Duration</a>
                        <a href="#updates">10. Changes to This Policy</a>
                        <a href="#contact">11. Contact</a>
                    </div>
                </section>

                <section className="cookies-section" id="what-are-cookies">
                    <h2>1. What Are Cookies</h2>
                    <p>
                        Cookies are small text files stored on your device by your browser.
                        Similar technologies (such as local storage/session storage) can also
                        be used to remember session state and improve the user experience.
                    </p>
                </section>

                <section className="cookies-section" id="why-use-cookies">
                    <h2>2. Why We Use Cookies</h2>
                    <ul>
                        <li>To keep users signed in securely.</li>
                        <li>To protect account and session integrity.</li>
                        <li>To improve loading performance and stability.</li>
                        <li>To remember interface choices where applicable.</li>
                        <li>To understand platform usage at an aggregated level.</li>
                    </ul>
                </section>

                <section className="cookies-section" id="cookie-types">
                    <h2>3. Cookie Categories</h2>

                    <h3>3.1 Strictly Necessary</h3>
                    <p>
                        Required for core features such as login flows, secure navigation,
                        and access to protected account areas.
                    </p>

                    <h3>3.2 Functional</h3>
                    <p>
                        Support user convenience features, such as remembering certain
                        interface preferences.
                    </p>

                    <h3>3.3 Performance</h3>
                    <p>
                        Help monitor service quality and detect technical issues so we can
                        improve speed and reliability.
                    </p>

                    <h3>3.4 Analytics (where enabled)</h3>
                    <p>
                        Used in aggregated form to understand traffic and feature usage.
                        These do not intentionally identify users personally.
                    </p>
                </section>

                <section className="cookies-section" id="session-auth">
                    <h2>4. Session and Authentication</h2>
                    <p>
                        JobBoard uses secure session and token-related mechanisms to support
                        login, account protection, and role-based access for candidates,
                        employers, and company team members.
                    </p>
                    <ul>
                        <li>Session continuity after authentication.</li>
                        <li>Protection against unauthorized account use.</li>
                        <li>Support for password reset and account security flows.</li>
                    </ul>
                </section>

                <section className="cookies-section" id="performance">
                    <h2>5. Performance and Reliability</h2>
                    <p>
                        Certain storage technologies may help reduce repetitive requests,
                        improve response behavior, and support stable notification/session
                        handling for core platform actions.
                    </p>
                </section>

                <section className="cookies-section" id="preferences">
                    <h2>6. Preferences and Settings</h2>
                    <p>
                        Where available, preference cookies/storage can remember selected UI
                        behavior (for example display preferences) to provide a smoother
                        experience between visits.
                    </p>
                </section>

                <section className="cookies-section" id="third-parties">
                    <h2>7. Third-Party Services</h2>
                    <p>
                        Some infrastructure and tooling providers may set or process
                        technically necessary data for hosting, delivery, and security. We do
                        not permit unrelated third-party advertising cookies through core
                        platform pages.
                    </p>
                </section>

                <section className="cookies-section" id="manage">
                    <h2>8. How to Manage Cookies</h2>
                    <ul>
                        <li>You can control cookies from your browser settings.</li>
                        <li>You may block or delete stored cookies at any time.</li>
                        <li>
                            Disabling strictly necessary cookies may break login and protected
                            page functionality.
                        </li>
                    </ul>
                </section>

                <section className="cookies-section" id="retention">
                    <h2>9. Cookie Duration</h2>
                    <p>
                        Cookies can be session-based (deleted when you close your browser) or
                        persistent (stored for a defined period). Retention depends on the
                        purpose and legal requirements.
                    </p>
                </section>

                <section className="cookies-section" id="updates">
                    <h2>10. Changes to This Policy</h2>
                    <p>
                        We may update this Cookies Policy due to technical, operational, or
                        legal changes. The most recent version is always published on this
                        page.
                    </p>
                </section>

                <section className="cookies-section" id="contact">
                    <h2>11. Contact</h2>
                    <p>
                        For cookie-related questions, contact
                        <a href="mailto:privacy@jobboard.com"> privacy@jobboard.com</a>.
                    </p>
                </section>
            </Container>
        </div>
    );
}