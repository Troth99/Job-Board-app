import { useEffect } from "react";
import useCompany from "../../../hooks/useCompany";
import "./ViewAllCompanies.css";
import { formatDate } from "../../../utils/formData";
export function ViewAllCompanies() {
  const { loading, companies, getCompanies } = useCompany();

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

  return (
    <>
      {!loading && companies.length === 0 && <div>No companies found.</div>}
      {companies.length > 0 && (
        <div>
          {companies.map((company) => (
            <div className="company-card-unique" key={company._id}>
<img
  src={
    company?.logo && company.logo.trim().startsWith("http")
      ? company.logo
      : "/assets/defaultCompany.png"
  }
  alt={
    company?.logo && company.logo.trim() !== ""
      ? company.name
      : "Default Company Logo"
  }
  className="company-logo"
  onError={e => { e.currentTarget.src = "/assets/defaultCompany.png"; }}
/>
              <h2 className="company-title-unique">{company.name}</h2>
              <p className="company-industry-unique">
                <span className="company-label-unique">Industry:</span> {company.industry}
              </p>
              <p className="company-desc-unique">
                <span className="company-label-unique">Description:</span>{" "}
                {company.description}
              </p>
              <p className="company-location-unique">
                <span className="company-label-unique">Location:</span> {company.location}
              </p>
              <p className="company-website-unique">
                <span className="company-label-unique">Website:</span>{" "}
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link-unique"
                >
               {company.website}
                </a>
              </p>
              <p className="company-size-unique">
                <span className="company-label-unique">Company Size:</span>{" "}
              {company.website}
              </p>
              <p className="company-founded-unique">
                <span className="company-label-unique">Founded Year:</span> {formatDate(company.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
