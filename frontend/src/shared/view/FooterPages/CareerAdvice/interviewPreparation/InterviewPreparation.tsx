import { Trans } from "@lingui/react/macro";
import MetaData from "../../../../../seo/MetaDataTags";
import { generateSeoConfig } from "../../../../../seo/seo";
import { Container } from "../../../../components/Container/Container";
import "./interviewPeparation.css";

export default function InterviewPreparation() {
    const seo = generateSeoConfig("interviewPreparation");
    return (
        <>
        <MetaData seo={seo} />
        <div className="interview-prep-page">
            <Container>
                <section className="interview-prep-hero">
                    <span className="interview-prep-badge"><Trans>Career Advice</Trans></span>
                    <h1><Trans>Interview Preparation for Real-World Jobs</Trans></h1>
                    <p>
                        <Trans>
                            Prepare for interviews across all industries with clear steps you can
                            apply to office, field, customer-facing, and operational roles.
                        </Trans>
                    </p>
                </section>

                <section className="interview-prep-section">
                    <h2><Trans>1. Before the Interview</Trans></h2>
                    <p>
                        <Trans>
                            Strong preparation helps you answer confidently and show genuine
                            interest in the position.
                        </Trans>
                    </p>
                    <div className="interview-prep-grid">
                        <article className="interview-prep-card">
                            <h3><Trans>Research Checklist</Trans></h3>
                            <ul>
                                <li><Trans>What the company does and who its customers are.</Trans></li>
                                <li><Trans>Main responsibilities in the job description.</Trans></li>
                                <li><Trans>Work model: on-site, hybrid, or remote.</Trans></li>
                                <li><Trans>Shift/work schedule expectations.</Trans></li>
                            </ul>
                        </article>
                        <article className="interview-prep-card">
                            <h3><Trans>What to Prepare</Trans></h3>
                            <ul>
                                <li><Trans>2-3 short stories about your achievements.</Trans></li>
                                <li><Trans>Examples of teamwork and problem-solving.</Trans></li>
                                <li><Trans>Your reasons for applying to this role.</Trans></li>
                                <li><Trans>Questions to ask the interviewer.</Trans></li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2><Trans>2. Common Questions and Better Answers</Trans></h2>
                    <div className="interview-prep-grid">
                        <article className="interview-prep-card">
                            <h3><Trans>Tell me about yourself</Trans></h3>
                            <p>
                                <Trans>
                                    Keep it structured: who you are, what you have done, and what you
                                    are looking for next.
                                </Trans>
                            </p>
                        </article>
                        <article className="interview-prep-card">
                            <h3><Trans>Why do you want this role?</Trans></h3>
                            <p>
                                <Trans>
                                    Connect your strengths to the role requirements and explain why
                                    this company fits your goals.
                                </Trans>
                            </p>
                        </article>
                        <article className="interview-prep-card">
                            <h3><Trans>Describe a challenge you faced</Trans></h3>
                            <p>
                                <Trans>
                                    Use a practical example with your actions and final outcome,
                                    preferably with a measurable result.
                                </Trans>
                            </p>
                        </article>
                    </div>
                    <div className="interview-prep-example">
                        <strong><Trans>Tip:</Trans></strong>
                        <p>
                            <Trans>
                                Use STAR format: Situation, Task, Action, Result. It keeps answers
                                clear and professional.
                            </Trans>
                        </p>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2><Trans>3. During the Interview</Trans></h2>
                    <ul className="interview-prep-actions">
                        <li><Trans>Arrive 10-15 minutes early for in-person interviews.</Trans></li>
                        <li><Trans>For online calls, test camera, sound, and internet in advance.</Trans></li>
                        <li><Trans>Listen carefully and answer directly.</Trans></li>
                        <li><Trans>Use specific examples, not only general statements.</Trans></li>
                        <li><Trans>Keep your tone respectful, calm, and confident.</Trans></li>
                    </ul>
                </section>

                <section className="interview-prep-section">
                    <h2><Trans>4. Questions You Should Ask</Trans></h2>
                    <div className="interview-prep-checklist">
                        <ul>
                            <li><Trans>What does success look like in the first 3 months?</Trans></li>
                            <li><Trans>What are the main day-to-day responsibilities?</Trans></li>
                            <li><Trans>How is performance measured for this role?</Trans></li>
                            <li><Trans>What are the next steps in the hiring process?</Trans></li>
                        </ul>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2><Trans>5. After the Interview</Trans></h2>
                    <div className="interview-prep-grid">
                        <article className="interview-prep-card">
                            <h3><Trans>Follow-up Message</Trans></h3>
                            <p>
                                <Trans>
                                    Send a short thank-you note within 24 hours to confirm your
                                    interest and professionalism.
                                </Trans>
                            </p>
                        </article>
                        <article className="interview-prep-card">
                            <h3><Trans>Self-Review</Trans></h3>
                            <p>
                                <Trans>
                                    Note what went well and what to improve for your next interview.
                                    This helps you get stronger with each attempt.
                                </Trans>
                            </p>
                        </article>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2><Trans>6. Final Interview Day Checklist</Trans></h2>
                    <div className="interview-prep-checklist">
                        <ul>
                            <li><Trans>I reviewed the company and role details.</Trans></li>
                            <li><Trans>I prepared 3 achievement examples.</Trans></li>
                            <li><Trans>I practiced short and clear introductions.</Trans></li>
                            <li><Trans>I prepared at least 2 questions for the interviewer.</Trans></li>
                            <li><Trans>I checked logistics or technical setup.</Trans></li>
                        </ul>
                    </div>
                </section>
            </Container>
        </div>
         </>
    );
}