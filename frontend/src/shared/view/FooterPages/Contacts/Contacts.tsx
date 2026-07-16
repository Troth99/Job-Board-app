import { Trans, useLingui } from "@lingui/react/macro";
import MetaData from "../../../../seo/MetaDataTags";
import { generateSeoConfig } from "../../../../seo/seo";
import { Container } from "../../../components/Container/Container";
import "./contacts.css"


export default function Contacts() {
    const seo = generateSeoConfig("contacts");

    const { t} = useLingui();

    // To implement a fully functional contact form, we would typically add state management for the form fields, 
    // validation logic, and an API call to submit the form data to our backend. For this example, 
    // the form submission is prevented from refreshing the page, and no actual submission logic is included.
    
    return (
        <>
       <MetaData seo={seo} />
        <div className="contacts-page">
            <Container>

                {/* Hero */}
                <section className="contacts-hero">
                    <span className="contacts-badge"><Trans>Get in Touch</Trans></span>
                    <h1><Trans>We're Here to Help</Trans></h1>
                    <p>
                        <Trans>Have a question, spotted a bug, or want to give feedback?</Trans>
                        <Trans>Reach out through any of the channels below — our team
                        typically responds within one business day.</Trans>
                    </p>
                </section>

                {/* Cards row */}
                <section className="contacts-cards">
                    <div className="contacts-card">
                        <div className="contacts-card-icon">✉️</div>
                        <h3><Trans>Email Support</Trans></h3>
                        <p><Trans>For general enquiries and account-related questions.</Trans></p>
                        <a href="mailto:support@jobboard.com" className="contacts-link">
                            support@jobboard.com
                        </a>
                    </div>

                    <div className="contacts-card">
                        <div className="contacts-card-icon">🏢</div>
                        <h3><Trans>Business &amp; Partnerships</Trans></h3>
                        <p><Trans>Interested in listing jobs or partnering with us?</Trans></p>
                        <a href="mailto:business@jobboard.com" className="contacts-link">
                            business@jobboard.com
                        </a>
                    </div>

                    <div className="contacts-card">
                        <div className="contacts-card-icon">🐛</div>
                        <h3><Trans>Report an Issue</Trans></h3>
                        <p><Trans>Found a bug or a security concern? Let us know immediately.</Trans></p>
                        <a href="mailto:bugs@jobboard.com" className="contacts-link">
                            bugs@jobboard.com
                        </a>
                    </div>
                </section>

                {/* Contact form */}
                <section className="contacts-form-section">
                    <h2><Trans>Send Us a Message</Trans></h2>
                    <p className="contacts-form-sub">
                        <Trans>Fill in the form and we'll get back to you as soon as possible.</Trans>
                    </p>

                    <form className="contacts-form" onSubmit={e => e.preventDefault()}>
                        <div className="contacts-form-row">
                            <div className="contacts-field">
                                <label htmlFor="c-name"><Trans>Full Name</Trans></label>
                                <input
                                    id="c-name"
                                    type="text"
                                    placeholder="John Doe"
                                    autoComplete="name"
                                />
                            </div>
                            <div className="contacts-field">
                                <label htmlFor="c-email"><Trans>Email Address</Trans></label>
                                <input
                                    id="c-email"
                                    type="email"
                                    placeholder="john@example.com"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="contacts-field">
                            <label htmlFor="c-subject"><Trans>Subject</Trans></label>
                            <select id="c-subject">
                                <option value=""><Trans>— Select a topic —</Trans></option>
                                <option value="general"><Trans>General Question</Trans></option>
                                <option value="account"><Trans>Account / Profile Issue</Trans></option>
                                <option value="job"><Trans>Job Posting Problem</Trans></option>
                                <option value="application"><Trans>Application Issue</Trans></option>
                                <option value="company"><Trans>Company Management</Trans></option>
                                <option value="bug"><Trans>Bug Report</Trans></option>
                                <option value="other"><Trans>Other</Trans></option>
                            </select>
                        </div>

                        <div className="contacts-field">
                            <label htmlFor="c-message"><Trans>Message</Trans></label>
                            <textarea
                                id="c-message"
                                rows={6}
                                placeholder={t`Describe your question or issue in detail…`}
                            />
                        </div>

                        <button type="submit" className="contacts-submit">
                            <Trans>Send Message</Trans>
                        </button>
                    </form>
                </section>

                {/* Social / extra info */}
                <section className="contacts-extra">
                    <div className="contacts-extra-item">
                        <span>🕐</span>
                        <div>
                            <strong><Trans>Response Time</Trans></strong>
                            <p><Trans>We aim to reply within 1 business day (Mon – Fri, 09:00 – 18:00 EET).</Trans></p>
                        </div>
                    </div>
                    <div className="contacts-extra-item">
                        <span>🌐</span>
                        <div>
                            <strong><Trans>Social Media</Trans></strong>
                            <p>
                                <Trans>Reach us on</Trans>{" "}
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>,{" "}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>, <Trans>or</Trans>{" "}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>.
                            </p>
                        </div>
                    </div>
                    <div className="contacts-extra-item">
                        <span>📍</span>
                        <div>
                            <strong><Trans>Headquarters</Trans></strong>
                            <p><Trans>Sofia, Bulgaria — remote-first team serving candidates &amp; employers worldwide.</Trans></p>
                        </div>
                    </div>
                </section>

            </Container>
        </div>
        </>
    )
}

