import { Container } from "../../../Container/Container"
import "./contacts.css"

export default function Contacts() {


    // To implement a fully functional contact form, we would typically add state management for the form fields, 
    // validation logic, and an API call to submit the form data to our backend. For this example, 
    // the form submission is prevented from refreshing the page, and no actual submission logic is included.
    
    return (
        <div className="contacts-page">
            <Container>

                {/* Hero */}
                <section className="contacts-hero">
                    <span className="contacts-badge">Get in Touch</span>
                    <h1>We're Here to Help</h1>
                    <p>
                        Have a question, spotted a bug, or want to give feedback?
                        Reach out through any of the channels below — our team
                        typically responds within one business day.
                    </p>
                </section>

                {/* Cards row */}
                <section className="contacts-cards">
                    <div className="contacts-card">
                        <div className="contacts-card-icon">✉️</div>
                        <h3>Email Support</h3>
                        <p>For general enquiries and account-related questions.</p>
                        <a href="mailto:support@jobboard.com" className="contacts-link">
                            support@jobboard.com
                        </a>
                    </div>

                    <div className="contacts-card">
                        <div className="contacts-card-icon">🏢</div>
                        <h3>Business &amp; Partnerships</h3>
                        <p>Interested in listing jobs or partnering with us?</p>
                        <a href="mailto:business@jobboard.com" className="contacts-link">
                            business@jobboard.com
                        </a>
                    </div>

                    <div className="contacts-card">
                        <div className="contacts-card-icon">🐛</div>
                        <h3>Report an Issue</h3>
                        <p>Found a bug or a security concern? Let us know immediately.</p>
                        <a href="mailto:bugs@jobboard.com" className="contacts-link">
                            bugs@jobboard.com
                        </a>
                    </div>
                </section>

                {/* Contact form */}
                <section className="contacts-form-section">
                    <h2>Send Us a Message</h2>
                    <p className="contacts-form-sub">
                        Fill in the form and we'll get back to you as soon as possible.
                    </p>

                    <form className="contacts-form" onSubmit={e => e.preventDefault()}>
                        <div className="contacts-form-row">
                            <div className="contacts-field">
                                <label htmlFor="c-name">Full Name</label>
                                <input
                                    id="c-name"
                                    type="text"
                                    placeholder="John Doe"
                                    autoComplete="name"
                                />
                            </div>
                            <div className="contacts-field">
                                <label htmlFor="c-email">Email Address</label>
                                <input
                                    id="c-email"
                                    type="email"
                                    placeholder="john@example.com"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="contacts-field">
                            <label htmlFor="c-subject">Subject</label>
                            <select id="c-subject">
                                <option value="">— Select a topic —</option>
                                <option value="general">General Question</option>
                                <option value="account">Account / Profile Issue</option>
                                <option value="job">Job Posting Problem</option>
                                <option value="application">Application Issue</option>
                                <option value="company">Company Management</option>
                                <option value="bug">Bug Report</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="contacts-field">
                            <label htmlFor="c-message">Message</label>
                            <textarea
                                id="c-message"
                                rows={6}
                                placeholder="Describe your question or issue in detail…"
                            />
                        </div>

                        <button type="submit" className="contacts-submit">
                            Send Message
                        </button>
                    </form>
                </section>

                {/* Social / extra info */}
                <section className="contacts-extra">
                    <div className="contacts-extra-item">
                        <span>🕐</span>
                        <div>
                            <strong>Response Time</strong>
                            <p>We aim to reply within 1 business day (Mon – Fri, 09:00 – 18:00 EET).</p>
                        </div>
                    </div>
                    <div className="contacts-extra-item">
                        <span>🌐</span>
                        <div>
                            <strong>Social Media</strong>
                            <p>
                                Reach us on{" "}
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>,{" "}
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>, or{" "}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>.
                            </p>
                        </div>
                    </div>
                    <div className="contacts-extra-item">
                        <span>📍</span>
                        <div>
                            <strong>Headquarters</strong>
                            <p>Sofia, Bulgaria — remote-first team serving candidates &amp; employers worldwide.</p>
                        </div>
                    </div>
                </section>

            </Container>
        </div>
    )
}

