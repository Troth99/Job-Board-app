
import { Link } from "react-router";
import { Container } from "../../../../Container/Container";
import "./salaryNegotiation.css";

export default function SalaryNegotiation() {
    return (
        <div className="salary-neg-page">
            <Container>
                <section className="salary-neg-hero">
                    <span className="salary-neg-badge">Career Advice</span>
                    <h1>How to Negotiate Your Salary with Confidence</h1>
                    <p>
                        Salary negotiation is a normal part of the hiring process. Learn how
                        to research your worth, frame your ask, and reach an agreement that
                        works for both you and your employer — across any industry.
                    </p>
                </section>

                <section className="salary-neg-section">
                    <h2>1. Research Your Market Value</h2>
                    <p>
                        Before any negotiation, know what people in similar roles earn in
                        your region. Walking in with data gives you credibility.
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3>What to Research</h3>
                            <ul>
                                <li>Salary ranges for your job title and industry.</li>
                                <li>Regional cost of living and local demand.</li>
                                <li>Your years of experience vs. the role's requirements.</li>
                                <li>Company size — larger companies often pay more.</li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3>Where to Look</h3>
                            <ul>
                                <li>Job listings that show salary ranges.</li>
                                <li>Salary comparison websites (Glassdoor, Payscale, LinkedIn).</li>
                                <li>Industry associations and professional networks.</li>
                                <li>Colleagues or contacts in similar roles.</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2>2. Give a Range, Not a Fixed Number</h2>
                    <p>
                        Naming a single number puts you at a disadvantage. A well-anchored
                        range gives you room to negotiate while signalling your expectations.
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3>Why a Range Works</h3>
                            <ul>
                                <li>Your floor becomes the employer's ceiling — set it right.</li>
                                <li>Leaves flexibility without appearing inflexible.</li>
                                <li>Shows you've done your homework.</li>
                                <li>Reduces the risk of pricing yourself out early.</li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3>How to Set Your Range</h3>
                            <ul>
                                <li>Put your target salary at the lower end of the range.</li>
                                <li>Keep the top end realistic — 10–15% above the bottom.</li>
                                <li>Be ready to justify why you sit at the higher end.</li>
                                <li>Never start below what you'd actually accept.</li>
                            </ul>
                        </article>
                    </div>
                    <div className="salary-neg-example">
                        <strong>Example phrase:</strong>
                        <p>
                            "Based on my research and experience, I'm looking for something
                            in the range of [X] to [Y]. I'm open to discussing how the full
                            package fits together."
                        </p>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2>3. Think Beyond the Base Salary</h2>
                    <p>
                        Total compensation includes more than monthly pay. Understanding the
                        full package lets you negotiate more effectively.
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3>Common Extras to Consider</h3>
                            <ul>
                                <li>Annual bonus or performance incentive.</li>
                                <li>Extra vacation days beyond the legal minimum.</li>
                                <li>Flexible working hours or hybrid/remote options.</li>
                                <li>Health or dental coverage.</li>
                                <li>Transport allowance or parking.</li>
                                <li>Training budget or professional development.</li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3>When the Salary Is Fixed</h3>
                            <ul>
                                <li>Ask if the role has a formal review after 3–6 months.</li>
                                <li>Negotiate a sign-on bonus instead.</li>
                                <li>Request additional leave or a flexible schedule.</li>
                                <li>Confirm what triggers a pay increase in the future.</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2>4. How to Handle the Conversation</h2>
                    <p>
                        The way you negotiate matters as much as the number you propose.
                        Stay professional, positive, and collaborative.
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3>Phrases That Work</h3>
                            <ul>
                                <li>"I'm very excited about this role. Can we discuss the compensation?"</li>
                                <li>"Based on my experience, I was hoping for something closer to [X]."</li>
                                <li>"Is there any flexibility in the package?"</li>
                                <li>"What does the typical career path look like here?"</li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3>What to Avoid</h3>
                            <ul>
                                <li>Revealing your current or previous salary first.</li>
                                <li>Accepting on the spot under pressure — ask for time.</li>
                                <li>Making it personal or emotional.</li>
                                <li>Giving an ultimatum unless you mean it.</li>
                            </ul>
                        </article>
                    </div>
                    <div className="salary-neg-example">
                        <strong>Tip:</strong>
                        <p>
                            If asked about your current salary, redirect: "I'd prefer to
                            focus on what this role offers and what's fair for the
                            responsibilities involved."
                        </p>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2>5. Knowing When to Accept</h2>
                    <p>
                        Not every negotiation ends at your target. Know your boundaries and
                        how to make a decision you're comfortable with.
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3>Signs It's a Good Deal</h3>
                            <ul>
                                <li>Salary is at or close to your target range.</li>
                                <li>Benefits meaningfully compensate for any salary gap.</li>
                                <li>Clear path for growth and pay increases.</li>
                                <li>Role aligns with your long-term career goals.</li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3>Signs to Reconsider</h3>
                            <ul>
                                <li>Offer is significantly below market rate with no room to move.</li>
                                <li>Employer is dismissive of any negotiation attempt.</li>
                                <li>Benefits are unclear or non-existent.</li>
                                <li>Pressure to decide immediately without time to think.</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2>6. Negotiation Checklist</h2>
                    <div className="salary-neg-checklist">
                        <ul>
                            <li>Researched salary benchmarks for your role and location.</li>
                            <li>Defined your target salary and absolute minimum.</li>
                            <li>Prepared a realistic range with your target at the low end.</li>
                            <li>Listed the benefits and perks that matter most to you.</li>
                            <li>Practised how to respond to common counter-questions.</li>
                            <li>Ready to ask for time before accepting a final offer.</li>
                            <li>Prepared to redirect questions about current salary.</li>
                            <li>Clear on what would make you decline the offer.</li>
                        </ul>
                    </div>
                </section>
            </Container>
        </div>
    );
}
