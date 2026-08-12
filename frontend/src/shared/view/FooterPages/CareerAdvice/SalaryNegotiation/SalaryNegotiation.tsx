
import { Trans } from "@lingui/react/macro";
import MetaData from "../../../../../seo/MetaDataTags";
import { generateSeoConfig } from "../../../../../seo/seo";
import { Container } from "../../../../components/Container/Container";
import "./salaryNegotiation.css";

export default function SalaryNegotiation() {
    const seo = () => generateSeoConfig("salaryNegotiation");
    return (
        
        <MetaData seo={seo} />
        <div className="salary-neg-page">
            <Container>
                <section className="salary-neg-hero">
                    <span className="salary-neg-badge"><Trans>Career Advice</Trans></span>
                    <h1><Trans>How to Negotiate Your Salary with Confidence</Trans></h1>
                    <p>
                        <Trans>
                            Salary negotiation is a normal part of the hiring process. Learn how
                            to research your worth, frame your ask, and reach an agreement that
                            works for both you and your employer — across any industry.
                        </Trans>
                    </p>
                </section>

                <section className="salary-neg-section">
                    <h2><Trans>1. Research Your Market Value</Trans></h2>
                    <p>
                        <Trans>
                            Before any negotiation, know what people in similar roles earn in
                            your region. Walking in with data gives you credibility.
                        </Trans>
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3><Trans>What to Research</Trans></h3>
                            <ul>
                                <li><Trans>Salary ranges for your job title and industry.</Trans></li>
                                <li><Trans>Regional cost of living and local demand.</Trans></li>
                                <li><Trans>Your years of experience vs. the role's requirements.</Trans></li>
                                <li><Trans>Company size — larger companies often pay more.</Trans></li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3><Trans>Where to Look</Trans></h3>
                            <ul>
                                <li><Trans>Job listings that show salary ranges.</Trans></li>
                                <li><Trans>Salary comparison websites (Glassdoor, Payscale, LinkedIn).</Trans></li>
                                <li><Trans>Industry associations and professional networks.</Trans></li>
                                <li><Trans>Colleagues or contacts in similar roles.</Trans></li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2><Trans>2. Give a Range, Not a Fixed Number</Trans></h2>
                    <p>
                        <Trans>
                            Naming a single number puts you at a disadvantage. A well-anchored
                            range gives you room to negotiate while signalling your expectations.
                        </Trans>
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3><Trans>Why a Range Works</Trans></h3>
                            <ul>
                                <li><Trans>Your floor becomes the employer's ceiling — set it right.</Trans></li>
                                <li><Trans>Leaves flexibility without appearing inflexible.</Trans></li>
                                <li><Trans>Shows you've done your homework.</Trans></li>
                                <li><Trans>Reduces the risk of pricing yourself out early.</Trans></li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3><Trans>How to Set Your Range</Trans></h3>
                            <ul>
                                <li><Trans>Put your target salary at the lower end of the range.</Trans></li>
                                <li><Trans>Keep the top end realistic — 10–15% above the bottom.</Trans></li>
                                <li><Trans>Be ready to justify why you sit at the higher end.</Trans></li>
                                <li><Trans>Never start below what you'd actually accept.</Trans></li>
                            </ul>
                        </article>
                    </div>
                    <div className="salary-neg-example">
                        <strong><Trans>Example phrase:</Trans></strong>
                        <p>
                            <Trans>
                                "Based on my research and experience, I'm looking for something
                                in the range of [X] to [Y]. I'm open to discussing how the full
                                package fits together."
                            </Trans>
                        </p>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2><Trans>3. Think Beyond the Base Salary</Trans></h2>
                    <p>
                        <Trans>
                            Total compensation includes more than monthly pay. Understanding the
                            full package lets you negotiate more effectively.
                        </Trans>
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3><Trans>Common Extras to Consider</Trans></h3>
                            <ul>
                                <li><Trans>Annual bonus or performance incentive.</Trans></li>
                                <li><Trans>Extra vacation days beyond the legal minimum.</Trans></li>
                                <li><Trans>Flexible working hours or hybrid/remote options.</Trans></li>
                                <li><Trans>Health or dental coverage.</Trans></li>
                                <li><Trans>Transport allowance or parking.</Trans></li>
                                <li><Trans>Training budget or professional development.</Trans></li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3><Trans>When the Salary Is Fixed</Trans></h3>
                            <ul>
                                <li><Trans>Ask if the role has a formal review after 3–6 months.</Trans></li>
                                <li><Trans>Negotiate a sign-on bonus instead.</Trans></li>
                                <li><Trans>Request additional leave or a flexible schedule.</Trans></li>
                                <li><Trans>Confirm what triggers a pay increase in the future.</Trans></li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2><Trans>4. How to Handle the Conversation</Trans></h2>
                    <p>
                        <Trans>
                            The way you negotiate matters as much as the number you propose.
                            Stay professional, positive, and collaborative.
                        </Trans>
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3><Trans>Phrases That Work</Trans></h3>
                            <ul>
                                <li><Trans>"I'm very excited about this role. Can we discuss the compensation?"</Trans></li>
                                <li><Trans>"Based on my experience, I was hoping for something closer to [X]."</Trans></li>
                                <li><Trans>"Is there any flexibility in the package?"</Trans></li>
                                <li><Trans>"What does the typical career path look like here?"</Trans></li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3><Trans>What to Avoid</Trans></h3>
                            <ul>
                                <li><Trans>Revealing your current or previous salary first.</Trans></li>
                                <li><Trans>Accepting on the spot under pressure — ask for time.</Trans></li>
                                <li><Trans>Making it personal or emotional.</Trans></li>
                                <li><Trans>Giving an ultimatum unless you mean it.</Trans></li>
                            </ul>
                        </article>
                    </div>
                    <div className="salary-neg-example">
                        <strong><Trans>Tip:</Trans></strong>
                        <p>
                            <Trans>
                                If asked about your current salary, redirect: "I'd prefer to
                                focus on what this role offers and what's fair for the
                                responsibilities involved."
                            </Trans>
                        </p>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2><Trans>5. Knowing When to Accept</Trans></h2>
                    <p>
                        <Trans>
                            Not every negotiation ends at your target. Know your boundaries and
                            how to make a decision you're comfortable with.
                        </Trans>
                    </p>
                    <div className="salary-neg-grid">
                        <article className="salary-neg-card">
                            <h3><Trans>Signs It's a Good Deal</Trans></h3>
                            <ul>
                                <li><Trans>Salary is at or close to your target range.</Trans></li>
                                <li><Trans>Benefits meaningfully compensate for any salary gap.</Trans></li>
                                <li><Trans>Clear path for growth and pay increases.</Trans></li>
                                <li><Trans>Role aligns with your long-term career goals.</Trans></li>
                            </ul>
                        </article>
                        <article className="salary-neg-card">
                            <h3><Trans>Signs to Reconsider</Trans></h3>
                            <ul>
                                <li><Trans>Offer is significantly below market rate with no room to move.</Trans></li>
                                <li><Trans>Employer is dismissive of any negotiation attempt.</Trans></li>
                                <li><Trans>Benefits are unclear or non-existent.</Trans></li>
                                <li><Trans>Pressure to decide immediately without time to think.</Trans></li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="salary-neg-section">
                    <h2><Trans>6. Negotiation Checklist</Trans></h2>
                    <div className="salary-neg-checklist">
                        <ul>
                            <li><Trans>Researched salary benchmarks for your role and location.</Trans></li>
                            <li><Trans>Defined your target salary and absolute minimum.</Trans></li>
                            <li><Trans>Prepared a realistic range with your target at the low end.</Trans></li>
                            <li><Trans>Listed the benefits and perks that matter most to you.</Trans></li>
                            <li><Trans>Practised how to respond to common counter-questions.</Trans></li>
                            <li><Trans>Ready to ask for time before accepting a final offer.</Trans></li>
                            <li><Trans>Prepared to redirect questions about current salary.</Trans></li>
                            <li><Trans>Clear on what would make you decline the offer.</Trans></li>
                        </ul>
                    </div>
                </section>
            </Container>
        </div>
        </>
    );
}
