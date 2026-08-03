import "./HowToPostJobInfo.css";
import { Trans } from "@lingui/react/macro";
import {t} from "@lingui/core/macro";

const requiredFields = [
    {
        label: t`Job Title`,
        type: t`Required`,
        whatToWrite:
            <Trans>Use the exact role name candidates will search for. Keep it specific and avoid internal titles.</Trans>,
        include:
            <Trans>Role, seniority if relevant, and the main specialization.</Trans>,
        example: <Trans>Customer Support Specialist</Trans>,
    },
    {
        label: t`Job Description`,
        type: t`Required`,
        whatToWrite:
            <Trans>Describe the day-to-day work, team context, responsibilities, and what success looks like in the role.</Trans>,
        include:
            <Trans>Main tasks, tools used, reporting line, shift details, and any important operational expectations.</Trans>,
        example:
            <Trans>You will handle inbound customer requests, document cases in the CRM system, and coordinate with the operations team to resolve issues quickly.</Trans>,
    },
    {
        label: t`Location`,
        type: t`Required`,
        whatToWrite:
            <Trans>Add the city or area where the employee will work. If hybrid, mention the office location clearly.</Trans>,
        include:
            <Trans>City, district, office, or remote eligibility when relevant.</Trans>,
        example: <Trans>Sofia, Bulgaria</Trans>,
    },
    {
        label: t`Salary`,
        type: t`Required`,
        whatToWrite:
            <Trans>Provide a real salary range or compensation note that helps candidates decide whether to apply.</Trans>,
        include:
            <Trans>Currency, gross or net if needed, and whether the figure is fixed or ranged.</Trans>,
        example: <Trans>2200-2800 EURO gross</Trans>,
    },
    {
        label: t`Work Mode`,
        type: t`Required`,
        whatToWrite:
            <Trans>Select how the work is delivered so the candidate understands location expectations immediately.</Trans>,
        include:
            <Trans>On-site, Hybrid, or Remote depending on the role.</Trans>,
        example: <Trans>Hybrid</Trans>,
    },
    {
        label: t`Category`,
        type: t`Required`,
        whatToWrite:
            <Trans>Choose the closest business category so the listing appears in the right job group.</Trans>,
        include:
            <Trans>Use the category that best matches the role's core function, not a broad fallback.</Trans>,
        example: <Trans>Customer Service</Trans>,
    },
    {
        label: "Employment Type",
        type: "Required",
        whatToWrite:
            <Trans>Set the hiring format that defines the relationship between company and candidate.</Trans>,
        include:
            <Trans>Full-time, Part-time, Contract, Internship, or similar.</Trans>,
        example: <Trans>Full-time</Trans>,
    },
    {
        label: t`Experience Requirement`,
        type: t`Required`,
        whatToWrite:
            <Trans>Choose the level that best matches the complexity and autonomy expected for the position.</Trans>,
        include:
            <Trans>Entry-level, Mid-level, Senior, or another available experience band.</Trans>,
        example: <Trans>Mid-level</Trans>,
    },
    {
        label: t`Open Positions`,
        type: t`Required`,
        whatToWrite:
            <Trans>Enter the number of hires planned for this posting.</Trans>,
        include:
            <Trans>Use a whole number greater than zero so applicants know whether this is a single or bulk hire.</Trans>,
        example: <Trans>3</Trans>,
    },
    {
        label: t`Education Level`,
        type: t`Required`,
        whatToWrite:
            <Trans>State the minimum education expectation only if it is genuinely relevant for the role.</Trans>,
        include:
            <Trans>Degree level, certification baseline, or 'Not required' when education is not a screening factor.</Trans>,
        example: <Trans>Bachelor degree or equivalent practical experience</Trans>,
    },
    {
        label: t`Requirements`,
        type: t`Required`,
        whatToWrite:
            <Trans>List the must-have qualifications as comma-separated items. Focus on real hiring criteria.</Trans>,
        include:
            <Trans>Technical skills, licenses, language ability, legal eligibility, tool knowledge, or proven experience.</Trans>,
        example: <Trans>Excel, fluent English, customer communication, CRM experience</Trans>,
    },
    {
        label: t`Contact Email`,
        type: t`Required`,
        whatToWrite:
            <Trans>Add the email address that should receive candidate communication or application questions.</Trans>,
        include:
            <Trans>Use a monitored company mailbox instead of a personal address when possible.</Trans>,
        example: <Trans>careers@company.com</Trans>,
    },
];

const optionalFields = [
    {
        label: t`Additional Information`,
        whatToWrite:
            <Trans>Use this section for extra context that improves trust but does not belong in the main description.</Trans>,
        include:
            <Trans>Hiring process notes, response expectations, onboarding details, or practical clarifications.</Trans>,
        example:
            <Trans>Only shortlisted candidates will be contacted within 10 business days.</Trans>,
    },
    {
        label: t`Application Deadline`,
        whatToWrite:
            <Trans>Set a closing date when the role has a fixed hiring window.</Trans>,
        include:
            <Trans>Use it for campaigns, urgent hires, or structured recruitment rounds.</Trans>,
        example: <Trans>31 May 2026</Trans>,
    },
    {
        label: t`Contract Type`,
        whatToWrite:
            <Trans>Clarify the legal or commercial form of engagement if it matters for the role.</Trans>,
        include:
            <Trans>Permanent, Temporary, Civil contract, Internship agreement, Freelance contract.</Trans>,
        example: <Trans>Permanent contract</Trans>,
    },
    {
        label: t`Work Schedule`,
        whatToWrite:
            <Trans>Explain when the work happens, especially if the role is shift-based or outside standard office hours.</Trans>,
        include:
            <Trans>Working hours, shift model, weekend coverage, or rotational schedule.</Trans>,
        example: <Trans>Monday to Friday, 09:00-18:00</Trans>,
    },
    {
        label: t`Language Requirements`,
        whatToWrite:
            <Trans>State only the languages and proficiency levels that are truly needed for the role.</Trans>,
        include:
            <Trans>Language plus level or business usage context.</Trans>,
        example: <Trans>English B2, German A2</Trans>,
    },
    {
        label: t`Benefits`,
        whatToWrite:
            <Trans>List the value-added perks as comma-separated items so the offer looks concrete and transparent.</Trans>,
        include:
            <Trans>Private health care, bonus scheme, meal vouchers, remote days, training budget, transport card.</Trans>,
        example: <Trans>Health insurance, meal vouchers, annual bonus</Trans>,
    },
];

const quickRules = [
    t`Write for candidates, not for internal teams. Every field should help someone decide whether to apply.`,
    t`Be specific. Generic phrases like 'good salary' or 'great environment' are weak unless you support them with details.`,
    t`Do not overload the Requirements field with nice-to-have extras. Keep must-haves separate from benefits.`,
    t`If a field is optional but important for trust, fill it in anyway. More clarity usually improves application quality.`,
];

function HowToPostJobInfo() {
    return (
        <section className="post-job-guide">
            <div className="post-job-guide__hero">
                <p className="post-job-guide__eyebrow"><Trans>Create Job Guide</Trans></p>
                <h1><Trans>How to fill in each field when posting a job</Trans></h1>
                <p className="post-job-guide__intro">
                    <Trans>Use this page as a reference before publishing a vacancy. The guide
                        follows your current Create Job form and explains what each field
                        should contain, what details matter, and what a good example looks
                        like.
                    </Trans>
                </p>

                <div className="post-job-guide__callout">
                    <span><Trans>Updated for the current Create Job form</Trans></span>
                    <strong><Trans>May 2026</Trans></strong>
                </div>
            </div>

            <div className="post-job-guide__section">
                <div className="post-job-guide__section-heading">
                    <p className="post-job-guide__section-label"><Trans>Required fields</Trans></p>
                    <h2><Trans>These should be completed for every listing</Trans></h2>
                </div>

                <div className="post-job-guide__grid">
                    {requiredFields.map((field) => (
                        <article className="post-job-guide__card" key={field.label}>
                            <div className="post-job-guide__card-top">
                                <h3><Trans>{field.label}</Trans></h3>
                                <span className="post-job-guide__badge is-required">
                                    <Trans>{field.type}</Trans>
                                </span>
                            </div>
                            <p>
                                <strong><Trans>What to write:</Trans></strong> {field.whatToWrite}
                            </p>
                            <p>
                                <strong><Trans>What it should include:</Trans></strong> {field.include}
                            </p>
                            <p className="post-job-guide__example">
                                <strong><Trans>Example:</Trans></strong> {field.example}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="post-job-guide__section">
                <div className="post-job-guide__section-heading">
                    <p className="post-job-guide__section-label"><Trans>Optional fields</Trans></p>
                    <h2><Trans>Use these to make the post clearer and more complete</Trans></h2>
                </div>

                <div className="post-job-guide__grid">
                    {optionalFields.map((field) => (
                        <article className="post-job-guide__card" key={field.label}>
                            <div className="post-job-guide__card-top">
                                <h3><Trans>{field.label}</Trans></h3>
                                <span className="post-job-guide__badge is-optional">
                                    <Trans>Optional</Trans>
                                </span>
                            </div>
                            <p>
                                <strong><Trans>What to write:</Trans></strong> {field.whatToWrite}
                            </p>
                            <p>
                                <strong><Trans>What it should include:</Trans></strong> {field.include}
                            </p>
                            <p className="post-job-guide__example">
                                <strong><Trans>Example:</Trans></strong> {field.example}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="post-job-guide__footer-layout">
                <article className="post-job-guide__panel">
                    <p className="post-job-guide__section-label"><Trans>Quick rules</Trans></p>
                    <h2><Trans>What makes a job post stronger</Trans></h2>
                    <ul className="post-job-guide__rules">
                        {quickRules.map((rule, index) => (
                            <li key={`${rule}-${index}`}><Trans>{rule}</Trans></li>
                        ))}
                    </ul>
                </article>

                <article className="post-job-guide__panel post-job-guide__panel--sample">
                    <p className="post-job-guide__section-label"><Trans>Sample structure</Trans></p>
                    <h2><Trans>What a complete entry set can look like</Trans></h2>
                    <div className="post-job-guide__sample-block">
                        <p><strong><Trans>Job Title:</Trans></strong> <Trans>Warehouse Operations Coordinator</Trans></p>
                        <p><strong><Trans>Location:</Trans></strong> <Trans>Plovdiv, Bulgaria</Trans></p>
                        <p><strong><Trans>Employment Type:</Trans></strong> <Trans>Full-time</Trans></p>
                        <p><strong><Trans>Experience Requirement:</Trans></strong> <Trans>Mid-level</Trans></p>
                        <p><strong><Trans>Requirements:</Trans></strong> <Trans>Excel, inventory handling, English B1, forklift certificate</Trans></p>
                        <p><strong><Trans>Benefits:</Trans></strong> <Trans>Private health insurance, monthly bonus, food vouchers</Trans></p>
                        <p><strong><Trans>Contact Email:</Trans></strong> <Trans>jobs@company.com</Trans></p>
                    </div>
                </article>
            </div>
        </section>
    );
}


export default HowToPostJobInfo;    