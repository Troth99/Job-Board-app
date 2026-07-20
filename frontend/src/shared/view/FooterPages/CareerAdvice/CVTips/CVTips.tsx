import { Trans } from "@lingui/react/macro";
import { Link } from "react-router";
import "./CVTIps.css";
import { generateSeoConfig } from "../../../../../seo/seo";
import MetaData from "../../../../../seo/MetaDataTags";
import { Container } from "../../../../components/Container/Container";

export default function CVTips() {
    const seo = generateSeoConfig("cvTips");
    return (
        <>
        <MetaData seo={seo} />
        
        <div className="cv-tips-page">
            <Container>
                <section className="cv-tips-hero">
                    <span className="cv-tips-badge"><Trans>Career Advice</Trans></span>
                    <h1><Trans>CV Tips That Work Across All Industries</Trans></h1>
                    <p>
                        <Trans>
                            Build a clear and professional CV for any field, from retail and
                            logistics to healthcare, education, administration, and sales. These
                            guidelines help recruiters quickly understand your value.
                        </Trans>
                    </p>
                </section>

                <section className="cv-tips-section">
                    <h2><Trans>1. Structure Your CV for Fast Reading</Trans></h2>
                    <p>
                        <Trans>
                            Most recruiters scan CVs quickly. Keep your format clean and easy to
                            navigate.
                        </Trans>
                    </p>
                    <div className="cv-tips-grid">
                        <article className="cv-tips-card">
                            <h3><Trans>Recommended Order</Trans></h3>
                            <ul>
                                <li><Trans>Contact Details</Trans></li>
                                <li><Trans>Professional Summary</Trans></li>
                                <li><Trans>Work Experience</Trans></li>
                                <li><Trans>Skills</Trans></li>
                                <li><Trans>Education / Certifications</Trans></li>
                            </ul>
                        </article>
                        <article className="cv-tips-card">
                            <h3><Trans>Length</Trans></h3>
                            <ul>
                                <li><Trans>Entry level: 1 page</Trans></li>
                                <li><Trans>Mid level: 1 page</Trans></li>
                                <li><Trans>Senior level: 1 to 2 pages</Trans></li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2><Trans>2. Write a Strong Professional Summary</Trans></h2>
                    <p>
                        <Trans>
                            In 2-4 lines, explain who you are, your key strengths, and what type
                            of role you are looking for.
                        </Trans>
                    </p>
                    <div className="cv-tips-example">
                        <strong><Trans>Example:</Trans></strong>
                        <p>
                            <Trans>
                                "Detail-oriented customer service specialist with 4+ years of
                                experience in retail and call center environments. Skilled in
                                communication, issue resolution, and handling high-volume customer
                                requests. Seeking a full-time support role in a growth-focused
                                company."
                            </Trans>
                        </p>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2><Trans>3. Describe Experience with Results, Not Tasks</Trans></h2>
                    <p><Trans>Instead of listing only duties, show measurable impact where possible.</Trans></p>
                    <div className="cv-tips-grid">
                        <article className="cv-tips-card">
                            <h3><Trans>Weak</Trans></h3>
                            <p><Trans>"Responsible for customer support and daily operations."</Trans></p>
                        </article>
                        <article className="cv-tips-card">
                            <h3><Trans>Better</Trans></h3>
                            <p>
                                <Trans>
                                    "Handled 60+ customer requests per day and improved first-contact
                                    resolution rate by 18% over 6 months."
                                </Trans>
                            </p>
                        </article>
                    </div>
                    <ul className="cv-tips-actions">
                        <li><Trans>Start with action verbs: Coordinated, Improved, Managed, Delivered.</Trans></li>
                        <li><Trans>Include numbers, timeframes, or outcomes when available.</Trans></li>
                        <li><Trans>Highlight achievements relevant to the role you apply for.</Trans></li>
                    </ul>
                </section>

                <section className="cv-tips-section">
                    <h2><Trans>4. Tailor the CV to Each Job Post</Trans></h2>
                    <p>
                        <Trans>
                            Use keywords from the job ad in your summary, skills, and experience.
                            This improves relevance for both recruiters and screening systems.
                        </Trans>
                    </p>
                    <div className="cv-tips-checklist">
                        <h3><Trans>Quick Tailoring Checklist</Trans></h3>
                        <ul>
                            <li><Trans>Match your job title to the role where appropriate.</Trans></li>
                            <li><Trans>Reorder skills so the most relevant are first.</Trans></li>
                            <li><Trans>Move the most relevant experience higher on the page.</Trans></li>
                            <li><Trans>Adjust your summary for each specific position.</Trans></li>
                        </ul>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2><Trans>5. Common Mistakes to Avoid</Trans></h2>
                    <div className="cv-tips-grid">
                        <article className="cv-tips-card">
                            <h3><Trans>Avoid</Trans></h3>
                            <ul>
                                <li><Trans>Very long paragraphs and dense text blocks.</Trans></li>
                                <li><Trans>Generic phrases without proof.</Trans></li>
                                <li><Trans>Outdated or irrelevant work history first.</Trans></li>
                                <li><Trans>Spelling and grammar mistakes.</Trans></li>
                                <li><Trans>Unprofessional email addresses.</Trans></li>
                            </ul>
                        </article>
                        <article className="cv-tips-card">
                            <h3><Trans>Do Instead</Trans></h3>
                            <ul>
                                <li><Trans>Use short bullets and clear headings.</Trans></li>
                                <li><Trans>Show evidence with numbers and outcomes.</Trans></li>
                                <li><Trans>Prioritize recent and relevant experience.</Trans></li>
                                <li><Trans>Proofread before each application.</Trans></li>
                                <li><Trans>Use a professional contact profile.</Trans></li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="cv-tips-section">
                    <h2><Trans>6. Before You Apply</Trans></h2>
                    <div className="cv-tips-checklist">
                        <ul>
                            <li><Trans>My phone number and email are correct.</Trans></li>
                            <li><Trans>My CV matches the role requirements.</Trans></li>
                            <li><Trans>I included recent achievements with results.</Trans></li>
                            <li><Trans>I removed outdated or irrelevant details.</Trans></li>
                            <li><Trans>I checked formatting and spelling.</Trans></li>
                        </ul>
                    </div>
                </section>

                <section className="cv-tips-cta">
                    <h2><Trans>Ready to Use Your CV?</Trans></h2>
                    <p><Trans>Explore open roles and apply with confidence on JobBoard.</Trans></p>
                    <div className="cv-tips-cta-actions">
                        <Link to="/jobs" className="cv-tips-btn-primary">
                            <Trans>Browse Jobs</Trans>
                        </Link>
                    </div>
                </section>
            </Container>
        </div>
            </>
    );
}