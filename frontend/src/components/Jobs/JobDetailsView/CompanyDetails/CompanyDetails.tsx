import { Company } from "../../../../hooks/useCompany";
import { formatDate } from "../../../../utils/formData";



export function CompanyDetails({ company }: { company: Company }) {
  return (
  <div className="company-details-card">
          <div className="company-header">
            <img
              src={
                company?.logo &&
                company.logo.trim().startsWith("http")
                  ? company.logo
                  : "/assets/defaultCompany.png"
              }
              alt={
                company?.logo && company.logo.trim() !== ""
                  ? company.name
                  : "Default Company Logo"
              }
              className="company-logo"
            />
            <div>
              <h3 className="company-name">{company?.name}</h3>
              <span className="company-industry">
                Industry: {company?.industry}
              </span>
              <span className="company-size">
                Size: {company?.size} employers
              </span>
              <span className="company-founded">
                Founded: {formatDate(company?.createdAt ?? "")}
              </span>
            </div>
          </div>
          <div>
          </div>
          <div className="company-meta">
            <span className="company-location">
              Location: {company?.location}
            </span>
            <span className="company-website">
              Website:{" "}
              <a
                href={company?.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company?.website}{" "}
              </a>
            </span>
          </div>
          
          <div className="company-description-data">
            <p>{company?.description}</p>
          </div>
        </div>


    )
    }