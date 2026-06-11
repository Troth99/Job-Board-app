import { Company } from "../../../../hooks/utils/useCompanyMethods";
import { formatDate } from "../../../../utils/formData";
import "./CompanyDetails.css";

export function CompanyDetails({ company }: { company: Company }) {
  const rawLogo = company?.logo?.trim();
  const logoSrc = rawLogo ? rawLogo : "/assets/defaultCompany.png";

  const rawWebsite = company?.website?.trim();
  const website = rawWebsite
    ? rawWebsite.startsWith("http://") || rawWebsite.startsWith("https://")
      ? rawWebsite
      : `https://${rawWebsite}`
    : "";
  const hasWebsite = website.length > 0;

  return (
    <section className="company-details-card">
      <div className="company-header">
        <img
          src={logoSrc}
          alt={company?.name || "Company logo"}
          className="company-logo"
        />
        <div className="company-main">
          <h3 className="company-name">{company?.name || "Unknown company"}</h3>

          <p className="company-subline">
            <span>Industry: {company?.industry || "N/A"}</span>
            <span>Team size: {company?.size || "N/A"}</span>
            <span>
              Founded: {formatDate(company?.createdAt ?? "") || "N/A"}
            </span>
          </p>
        </div>
      </div>

      <div className="company-meta">
        <span className="company-location">
          Location: {company?.location || "N/A"}
        </span>
        <span className="company-website">
          Website:{" "}
          {hasWebsite ? (
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          ) : (
            "N/A"
          )}
        </span>
      </div>

      <p className="company-description-data">
        {company?.description || "No company description available."}
      </p>
    </section>
  );
}
