import "./HowToPostJobInfo.css";

const requiredFields = [
    {
        label: "Job Title",
        type: "Required",
        whatToWrite:
            "Use the exact role name candidates will search for. Keep it specific and avoid internal titles.",
        include:
            "Role, seniority if relevant, and the main specialization.",
        example: "Customer Support Specialist",
    },
    {
        label: "Job Description",
        type: "Required",
        whatToWrite:
            "Describe the day-to-day work, team context, responsibilities, and what success looks like in the role.",
        include:
            "Main tasks, tools used, reporting line, shift details, and any important operational expectations.",
        example:
            "You will handle inbound customer requests, document cases in the CRM system, and coordinate with the operations team to resolve issues quickly.",
    },
    {
        label: "Location",
        type: "Required",
        whatToWrite:
            "Add the city or area where the employee will work. If hybrid, mention the office location clearly.",
        include:
            "City, district, office, or remote eligibility when relevant.",
        example: "Sofia, Bulgaria",
    },
    {
        label: "Salary",
        type: "Required",
        whatToWrite:
            "Provide a real salary range or compensation note that helps candidates decide whether to apply.",
        include:
            "Currency, gross or net if needed, and whether the figure is fixed or ranged.",
        example: "2200-2800 BGN gross",
    },
    {
        label: "Work Mode",
        type: "Required",
        whatToWrite:
            "Select how the work is delivered so the candidate understands location expectations immediately.",
        include: "On-site, Hybrid, or Remote depending on the role.",
        example: "Hybrid",
    },
    {
        label: "Category",
        type: "Required",
        whatToWrite:
            "Choose the closest business category so the listing appears in the right job group.",
        include:
            "Use the category that best matches the role's core function, not a broad fallback.",
        example: "Customer Service",
    },
    {
        label: "Employment Type",
        type: "Required",
        whatToWrite:
            "Set the hiring format that defines the relationship between company and candidate.",
        include: "Full-time, Part-time, Contract, Internship, or similar.",
        example: "Full-time",
    },
    {
        label: "Experience Requirement",
        type: "Required",
        whatToWrite:
            "Choose the level that best matches the complexity and autonomy expected for the position.",
        include:
            "Entry-level, Mid-level, Senior, or another available experience band.",
        example: "Mid-level",
    },
    {
        label: "Open Positions",
        type: "Required",
        whatToWrite:
            "Enter the number of hires planned for this posting.",
        include:
            "Use a whole number greater than zero so applicants know whether this is a single or bulk hire.",
        example: "3",
    },
    {
        label: "Education Level",
        type: "Required",
        whatToWrite:
            "State the minimum education expectation only if it is genuinely relevant for the role.",
        include:
            "Degree level, certification baseline, or 'Not required' when education is not a screening factor.",
        example: "Bachelor degree or equivalent practical experience",
    },
    {
        label: "Requirements",
        type: "Required",
        whatToWrite:
            "List the must-have qualifications as comma-separated items. Focus on real hiring criteria.",
        include:
            "Technical skills, licenses, language ability, legal eligibility, tool knowledge, or proven experience.",
        example: "Excel, fluent English, customer communication, CRM experience",
    },
    {
        label: "Contact Email",
        type: "Required",
        whatToWrite:
            "Add the email address that should receive candidate communication or application questions.",
        include:
            "Use a monitored company mailbox instead of a personal address when possible.",
        example: "careers@company.com",
    },
];

const optionalFields = [
    {
        label: "Additional Information",
        whatToWrite:
            "Use this section for extra context that improves trust but does not belong in the main description.",
        include:
            "Hiring process notes, response expectations, onboarding details, or practical clarifications.",
        example:
            "Only shortlisted candidates will be contacted within 10 business days.",
    },
    {
        label: "Application Deadline",
        whatToWrite:
            "Set a closing date when the role has a fixed hiring window.",
        include:
            "Use it for campaigns, urgent hires, or structured recruitment rounds.",
        example: "31 May 2026",
    },
    {
        label: "Contract Type",
        whatToWrite:
            "Clarify the legal or commercial form of engagement if it matters for the role.",
        include:
            "Permanent, Temporary, Civil contract, Internship agreement, Freelance contract.",
        example: "Permanent contract",
    },
    {
        label: "Work Schedule",
        whatToWrite:
            "Explain when the work happens, especially if the role is shift-based or outside standard office hours.",
        include:
            "Working hours, shift model, weekend coverage, or rotational schedule.",
        example: "Monday to Friday, 09:00-18:00",
    },
    {
        label: "Language Requirements",
        whatToWrite:
            "State only the languages and proficiency levels that are truly needed for the role.",
        include:
            "Language plus level or business usage context.",
        example: "English B2, German A2",
    },
    {
        label: "Benefits",
        whatToWrite:
            "List the value-added perks as comma-separated items so the offer looks concrete and transparent.",
        include:
            "Private health care, bonus scheme, meal vouchers, remote days, training budget, transport card.",
        example: "Health insurance, meal vouchers, annual bonus",
    },
];

const quickRules = [
    "Write for candidates, not for internal teams. Every field should help someone decide whether to apply.",
    "Be specific. Generic phrases like 'good salary' or 'great environment' are weak unless you support them with details.",
    "Do not overload the Requirements field with nice-to-have extras. Keep must-haves separate from benefits.",
    "If a field is optional but important for trust, fill it in anyway. More clarity usually improves application quality.",
];

function HowToPostJobInfo() {
    return (
        <section className="post-job-guide">
            <div className="post-job-guide__hero">
                <p className="post-job-guide__eyebrow">Create Job Guide</p>
                <h1>How to fill in each field when posting a job</h1>
                <p className="post-job-guide__intro">
                    Use this page as a reference before publishing a vacancy. The guide
                    follows your current Create Job form and explains what each field
                    should contain, what details matter, and what a good example looks
                    like.
                </p>

                <div className="post-job-guide__callout">
                    <span>Updated for the current Create Job form</span>
                    <strong>May 2026</strong>
                </div>
            </div>

            <div className="post-job-guide__section">
                <div className="post-job-guide__section-heading">
                    <p className="post-job-guide__section-label">Required fields</p>
                    <h2>These should be completed for every listing</h2>
                </div>

                <div className="post-job-guide__grid">
                    {requiredFields.map((field) => (
                        <article className="post-job-guide__card" key={field.label}>
                            <div className="post-job-guide__card-top">
                                <h3>{field.label}</h3>
                                <span className="post-job-guide__badge is-required">
                                    {field.type}
                                </span>
                            </div>
                            <p>
                                <strong>What to write:</strong> {field.whatToWrite}
                            </p>
                            <p>
                                <strong>What it should include:</strong> {field.include}
                            </p>
                            <p className="post-job-guide__example">
                                <strong>Example:</strong> {field.example}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="post-job-guide__section">
                <div className="post-job-guide__section-heading">
                    <p className="post-job-guide__section-label">Optional fields</p>
                    <h2>Use these to make the post clearer and more complete</h2>
                </div>

                <div className="post-job-guide__grid">
                    {optionalFields.map((field) => (
                        <article className="post-job-guide__card" key={field.label}>
                            <div className="post-job-guide__card-top">
                                <h3>{field.label}</h3>
                                <span className="post-job-guide__badge is-optional">
                                    Optional
                                </span>
                            </div>
                            <p>
                                <strong>What to write:</strong> {field.whatToWrite}
                            </p>
                            <p>
                                <strong>What it should include:</strong> {field.include}
                            </p>
                            <p className="post-job-guide__example">
                                <strong>Example:</strong> {field.example}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="post-job-guide__footer-layout">
                <article className="post-job-guide__panel">
                    <p className="post-job-guide__section-label">Quick rules</p>
                    <h2>What makes a job post stronger</h2>
                    <ul className="post-job-guide__rules">
                        {quickRules.map((rule) => (
                            <li key={rule}>{rule}</li>
                        ))}
                    </ul>
                </article>

                <article className="post-job-guide__panel post-job-guide__panel--sample">
                    <p className="post-job-guide__section-label">Sample structure</p>
                    <h2>What a complete entry set can look like</h2>
                    <div className="post-job-guide__sample-block">
                        <p><strong>Job Title:</strong> Warehouse Operations Coordinator</p>
                        <p><strong>Location:</strong> Plovdiv, Bulgaria</p>
                        <p><strong>Employment Type:</strong> Full-time</p>
                        <p><strong>Experience Requirement:</strong> Mid-level</p>
                        <p><strong>Requirements:</strong> Excel, inventory handling, English B1, forklift certificate</p>
                        <p><strong>Benefits:</strong> Private health insurance, monthly bonus, food vouchers</p>
                        <p><strong>Contact Email:</strong> jobs@company.com</p>
                    </div>
                </article>
            </div>
        </section>
    );
}


export default HowToPostJobInfo;