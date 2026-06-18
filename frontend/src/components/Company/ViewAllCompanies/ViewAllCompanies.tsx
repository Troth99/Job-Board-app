import { useEffect, useMemo, useState } from "react";
import useCompany from "../../../hooks/utils/useCompanyMethods";
import "./ViewAllCompanies.css";
import { formatDate } from "../../../utils/formData";
import Spinner from "../../Spinner/Spinner";

export default function ViewAllCompanies() {
  const { loading, companies, getCompanies } = useCompany();
  const [searchTerm, setSearchTerm] = useState("");


  const sortedCompanies = [...companies].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return sortedCompanies;
    }

    return sortedCompanies.filter((company) => {
      const searchableFields = [
        company.name,
        company.industry,
        company.location,
        company.size,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableFields.includes(normalizedSearch);
    });
  }, [searchTerm, sortedCompanies]);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        await getCompanies();
      } catch (error) {
        console.error("Failed to fetch comapnies.");
      }
    };
    fetchAllCompanies();
  }, []);


  if (loading) {
    return <Spinner overlay={true} />;
  }

  const companyCount = companies.length;
  const visibleCount = filteredCompanies.length;

  return (
    <section className="companies-directory">
      <header className="companies-hero">
        <div className="companies-hero-copy">
          <p className="companies-kicker">Company directory</p>
          <h1>Browse companies in one clean view.</h1>
          <p className="companies-description">
            Compare teams by industry, location, size, and website without
            losing the visual language of the rest of the app.
          </p>
        </div>

        <div className="companies-summary">
          <span>Available companies</span>
          <strong>{companyCount}</strong>
          <small>{visibleCount} shown with the current filter</small>
        </div>
      </header>

      <div className="companies-toolbar">
        <label className="companies-search">
          <span>Search</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Name, industry, location, size"
          />
        </label>

        <button
          type="button"
          className="companies-clear-button"
          onClick={() => setSearchTerm("")}
          disabled={!searchTerm}
        >
          Clear filter
        </button>
      </div>

      {companyCount === 0 ? (
        <div className="companies-empty-state">
          <h2>No companies found.</h2>
          <p>
            Once companies are created, they will appear here in a structured
            directory layout.
          </p>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="companies-empty-state">
          <h2>No matches for this filter.</h2>
          <p>Try a different company name, city, industry, or team size.</p>
        </div>
      ) : (
        <div className="companies-grid">
          {filteredCompanies.map((company) => {
            const logoSrc =
              company?.logo && company.logo.trim().startsWith("http")
                ? company.logo
                : "/assets/defaultCompany.png";

            const website = company.website?.trim();
            const websiteHref =
              website &&
              !website.startsWith("http://") &&
              !website.startsWith("https://")
                ? `https://${website}`
                : website;

            return (
              <article className="company-card-unique company-card" key={company._id}>
                <div className="company-card-top">
                  <img
                    src={logoSrc}
                    alt={company?.logo && company.logo.trim() !== "" ? company.name : "Default Company Logo"}
                    className="company-logo"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/defaultCompany.png";
                    }}
                  />

                  <div className="company-title-block">
                    <h2 className="company-title-unique">{company.name}</h2>
                    <div className="company-badges">
                      <span>{company.industry || "Industry not set"}</span>
                      <span>{company.size || "Size not set"}</span>
                    </div>
                  </div>
                </div>

                <p className="company-desc-unique">{company.description}</p>

                <div className="company-details-grid">
                  <p className="company-location-unique">
                    <span className="company-label-unique">Location</span>
                    {company.location}
                  </p>
                  <p className="company-founded-unique">
                    <span className="company-label-unique">Added</span>
                    {formatDate(company.createdAt)}
                  </p>
                </div>

                <div className="company-footer-row">
                  <p className="company-website-unique">
                    <span className="company-label-unique">Website</span>
                    {websiteHref ? (
                      <a
                        href={websiteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="company-link-unique"
                      >
                        Visit site
                      </a>
                    ) : (
                      <span className="company-muted-text">Not provided</span>
                    )}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
