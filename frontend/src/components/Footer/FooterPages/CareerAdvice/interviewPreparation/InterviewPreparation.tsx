import { Link } from "react-router";
import { Container } from "../../../../Container/Container";
import "./interviewPeparation.css";

export default function InterviewPreparation() {
    return (
        <div className="interview-prep-page">
            <Container>
                <section className="interview-prep-hero">
                    <span className="interview-prep-badge">Career Advice</span>
                    <h1>Interview Preparation for Real-World Jobs</h1>
                    <p>
                        Prepare for interviews across all industries with clear steps you can
                        apply to office, field, customer-facing, and operational roles.
                    </p>
                </section>

                <section className="interview-prep-section">
                    <h2>1. Before the Interview</h2>
                    <p>
                        Strong preparation helps you answer confidently and show genuine
                        interest in the position.
                    </p>
                    <div className="interview-prep-grid">
                        <article className="interview-prep-card">
                            <h3>Research Checklist</h3>
                            <ul>
                                <li>What the company does and who its customers are.</li>
                                <li>Main responsibilities in the job description.</li>
                                <li>Work model: on-site, hybrid, or remote.</li>
                                <li>Shift/work schedule expectations.</li>
                            </ul>
                        </article>
                        <article className="interview-prep-card">
                            <h3>What to Prepare</h3>
                            <ul>
                                <li>2-3 short stories about your achievements.</li>
                                <li>Examples of teamwork and problem-solving.</li>
                                <li>Your reasons for applying to this role.</li>
                                <li>Questions to ask the interviewer.</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2>2. Common Questions and Better Answers</h2>
                    <div className="interview-prep-grid">
                        <article className="interview-prep-card">
                            <h3>Tell me about yourself</h3>
                            <p>
                                Keep it structured: who you are, what you have done, and what you
                                are looking for next.
                            </p>
                        </article>
                        <article className="interview-prep-card">
                            <h3>Why do you want this role?</h3>
                            <p>
                                Connect your strengths to the role requirements and explain why
                                this company fits your goals.
                            </p>
                        </article>
                        <article className="interview-prep-card">
                            <h3>Describe a challenge you faced</h3>
                            <p>
                                Use a practical example with your actions and final outcome,
                                preferably with a measurable result.
                            </p>
                        </article>
                    </div>
                    <div className="interview-prep-example">
                        <strong>Tip:</strong>
                        <p>
                            Use STAR format: Situation, Task, Action, Result. It keeps answers
                            clear and professional.
                        </p>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2>3. During the Interview</h2>
                    <ul className="interview-prep-actions">
                        <li>Arrive 10-15 minutes early for in-person interviews.</li>
                        <li>For online calls, test camera, sound, and internet in advance.</li>
                        <li>Listen carefully and answer directly.</li>
                        <li>Use specific examples, not only general statements.</li>
                        <li>Keep your tone respectful, calm, and confident.</li>
                    </ul>
                </section>

                <section className="interview-prep-section">
                    <h2>4. Questions You Should Ask</h2>
                    <div className="interview-prep-checklist">
                        <ul>
                            <li>What does success look like in the first 3 months?</li>
                            <li>What are the main day-to-day responsibilities?</li>
                            <li>How is performance measured for this role?</li>
                            <li>What are the next steps in the hiring process?</li>
                        </ul>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2>5. After the Interview</h2>
                    <div className="interview-prep-grid">
                        <article className="interview-prep-card">
                            <h3>Follow-up Message</h3>
                            <p>
                                Send a short thank-you note within 24 hours to confirm your
                                interest and professionalism.
                            </p>
                        </article>
                        <article className="interview-prep-card">
                            <h3>Self-Review</h3>
                            <p>
                                Note what went well and what to improve for your next interview.
                                This helps you get stronger with each attempt.
                            </p>
                        </article>
                    </div>
                </section>

                <section className="interview-prep-section">
                    <h2>6. Final Interview Day Checklist</h2>
                    <div className="interview-prep-checklist">
                        <ul>
                            <li>I reviewed the company and role details.</li>
                            <li>I prepared 3 achievement examples.</li>
                            <li>I practiced short and clear introductions.</li>
                            <li>I prepared at least 2 questions for the interviewer.</li>
                            <li>I checked logistics or technical setup.</li>
                        </ul>
                    </div>
                </section>
            </Container>
        </div>
    );
}