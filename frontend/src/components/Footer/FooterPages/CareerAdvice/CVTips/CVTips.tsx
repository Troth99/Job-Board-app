import { Link } from "react-router";
import { Container } from "../../../../Container/Container";
import "./CVTIps.css";

export default function CVTips() {
    return (
        <div className="cv-tips-page">
            <Container>
                <section className="cv-tips-hero">
                    <span className="cv-tips-badge">Career Advice</span>
                    <h1>CV Tips That Work Across All Industries</h1>
                    <p>
                        Build a clear and professional CV for any field, from retail and
                        logistics to healthcare, education, administration, and sales. These
                        guidelines help recruiters quickly understand your value.
                    </p>
                </section>

                <section className="cv-tips-section">
                    <h2>1. Structure Your CV for Fast Reading</h2>
                    <p>
                        Most recruiters scan CVs quickly. Keep your format clean and easy to
                        navigate.
                    </p>
                    <div className="cv-tips-grid">
                        <article className="cv-tips-card">
                            <h3>Recommended Order</h3>
                            <ul>
                                <li>Contact Details</li>
                                <li>Professional Summary</li>
                                <li>Work Experience</li>
                                <li>Skills</li>
                                <li>Education / Certifications</li>
                            </ul>
                        </article>
                        <article className="cv-tips-card">
                            <h3>Length</h3>
                            <ul>
                                <li>Entry level: 1 page</li>
                                <li>Mid level: 1 page</li>
                                <li>Senior level: 1 to 2 pages</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2>2. Write a Strong Professional Summary</h2>
                    <p>
                        In 2-4 lines, explain who you are, your key strengths, and what type
                        of role you are looking for.
                    </p>
                    <div className="cv-tips-example">
                        <strong>Example:</strong>
                        <p>
                            "Detail-oriented customer service specialist with 4+ years of
                            experience in retail and call center environments. Skilled in
                            communication, issue resolution, and handling high-volume customer
                            requests. Seeking a full-time support role in a growth-focused
                            company."
                        </p>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2>3. Describe Experience with Results, Not Tasks</h2>
                    <p>
                        Instead of listing only duties, show measurable impact where possible.
                    </p>
                    <div className="cv-tips-grid">
                        <article className="cv-tips-card">
                            <h3>Weak</h3>
                            <p>"Responsible for customer support and daily operations."</p>
                        </article>
                        <article className="cv-tips-card">
                            <h3>Better</h3>
                            <p>
                                "Handled 60+ customer requests per day and improved first-contact
                                resolution rate by 18% over 6 months."
                            </p>
                        </article>
                    </div>
                    <ul className="cv-tips-actions">
                        <li>Start with action verbs: Coordinated, Improved, Managed, Delivered.</li>
                        <li>Include numbers, timeframes, or outcomes when available.</li>
                        <li>Highlight achievements relevant to the role you apply for.</li>
                    </ul>
                </section>

                <section className="cv-tips-section">
                    <h2>4. Tailor the CV to Each Job Post</h2>
                    <p>
                        Use keywords from the job ad in your summary, skills, and experience.
                        This improves relevance for both recruiters and screening systems.
                    </p>
                    <div className="cv-tips-checklist">
                        <h3>Quick Tailoring Checklist</h3>
                        <ul>
                            <li>Match your job title to the role where appropriate.</li>
                            <li>Reorder skills so the most relevant are first.</li>
                            <li>Move the most relevant experience higher on the page.</li>
                            <li>Adjust your summary for each specific position.</li>
                        </ul>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2>5. Common Mistakes to Avoid</h2>
                    <div className="cv-tips-grid">
                        <article className="cv-tips-card">
                            <h3>Avoid</h3>
                            <ul>
                                <li>Very long paragraphs and dense text blocks.</li>
                                <li>Generic phrases without proof.</li>
                                <li>Outdated or irrelevant work history first.</li>
                                <li>Spelling and grammar mistakes.</li>
                                <li>Unprofessional email addresses.</li>
                            </ul>
                        </article>
                        <article className="cv-tips-card">
                            <h3>Do Instead</h3>
                            <ul>
                                <li>Use short bullets and clear headings.</li>
                                <li>Show evidence with numbers and outcomes.</li>
                                <li>Prioritize recent and relevant experience.</li>
                                <li>Proofread before each application.</li>
                                <li>Use a professional contact profile.</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2>6. Before You Apply</h2>
                    <div className="cv-tips-checklist">
                        <ul>
                            <li>My phone number and email are correct.</li>
                            <li>My CV matches the role requirements.</li>
                            <li>I included recent achievements with results.</li>
                            <li>I removed outdated or irrelevant details.</li>
                            <li>I checked formatting and spelling.</li>
                        </ul>
                    </div>
                </section>

                <section className="cv-tips-cta">
                    <h2>Ready to Use Your CV?</h2>
                    <p>Explore open roles and apply with confidence on JobBoard.</p>
                    <div className="cv-tips-cta-actions">
                        <Link to="/jobs" className="cv-tips-btn-primary">
                            Browse Jobs
                        </Link>
                    </div>
                </section>
            </Container>
        </div>
    );
}