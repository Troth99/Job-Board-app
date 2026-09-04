import { useEffect, useState } from "react";
import "./ViewAllCompanies.css";

import { Meta, useSearchParams } from "react-router";
import useCompanies from "../../hooks/useCompanyAPI";
import { generateCompaniesSeo } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import { CompanyCardSkeleton, SkeletonList } from "../../../../shared/components/Skeleton/Skeleton";
import { Container } from "../../../../shared/components/Container/Container";
import { formatDate } from "../../../../shared/utils/formData";
import Pagination from "../../../../shared/components/Pagination/Pagination";
import { Trans, useLingui } from "@lingui/react/macro";


const ITEMS_PER_PAGE = 8;

export default function ViewAllCompanies() {
  const { loading, companies, getCompanies } = useCompanies();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchFromUrl);

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const {t} = useLingui()

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalCompanies: 0,
  });

  const seo = () => generateCompaniesSeo(searchFromUrl, pageFromUrl);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const data = await getCompanies(
          ITEMS_PER_PAGE,
          pageFromUrl,
          searchFromUrl,
        );
        if (!data) {
          return;
        }

        setPagination({
          totalPages: data.totalPages,
          totalCompanies: data.totalCompanies,
        });
      } catch (error) {
        console.error("Failed to fetch companies.");
      }
    };
    fetchAllCompanies();
  }, [pageFromUrl, searchFromUrl]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("page", "1");
      if (searchInput.trim()) {
        nextParams.set("search", searchInput.trim());
      } else {
        nextParams.delete("search");
      }
      return nextParams;
    });
  };

  const handleClearSearch = () => {
    setSearchInput("");

    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set("page", "1");
      nextParams.delete("search");
      return nextParams;
    });
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };


  const companyCount = companies.length;
  const visibleCount = companies.length;

  return (
<>
    <MetaData seo={seo} />

    {loading ? (
      <div className="companies-grid">
        <SkeletonList count={6} render={(i) => <CompanyCardSkeleton key={i} />} />
      </div>
    ) : (
      <Container>
            <section className="companies-directory">
      <header className="companies-hero">
        <div className="companies-hero-copy">
          <p className="companies-kicker">Company directory</p>
          <h1><Trans>Browse companies in one clean view.</Trans></h1>
          <p className="companies-description">
            <Trans>Compare teams by industry, location, size, and website without
            losing the visual language of the rest of the app.</Trans>
          </p>
        </div>

        <div className="companies-summary">
          <span><Trans>Available companies</Trans></span>
          <strong>{companyCount}</strong>
          <small>{visibleCount} <Trans>shown with the current filter</Trans></small>
        </div>
      </header>

      <div className="companies-toolbar">
        <label className="companies-search">
          <span><Trans>Search</Trans></span>
          <input
            type="search"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchKeyDown}
            placeholder={t`Name, industry, location, size`}
          />
        </label>
        <button
          type="button"
          className="companies-search-button"
          onClick={handleSearchSubmit}
        >
          <Trans>Search</Trans>
        </button>

        <button
          type="button"
          className="companies-clear-button"
          onClick={handleClearSearch}
          disabled={!searchInput && !searchFromUrl}
        >
          <Trans>Clear filter</Trans>
        </button>
      </div>

      {companyCount === 0 ? (
        <div className="companies-empty-state">
          <h2><Trans>No companies found.</Trans></h2>
          <p>
            <Trans>Once companies are created, they will appear here in a structured
            directory layout.</Trans>
          </p>
        </div>
      ) : companies.length === 0 ? (
        <div className="companies-empty-state">
          <h2><Trans>No matches for this filter.</Trans></h2>
          <p><Trans>Try a different company name, city, industry, or team size.</Trans></   p>
        </div>
      ) : (
        <div className="companies-grid">
          {companies.map((company) => {
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
              <article
                className="company-card-unique company-card"
                key={company._id}
              >
                <div className="company-card-top">
                  <img
                    src={logoSrc}
                    alt={
                      company?.logo && company.logo.trim() !== ""
                        ? company.name
                        : "Default Company Logo"
                    }
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
                    <span className="company-label-unique"><Trans>Location</Trans></span>
                    {company.location}
                  </p>
                  <p className="company-founded-unique">
                    <span className="company-label-unique"><Trans>Added</Trans></span>
                    {formatDate(company.createdAt)}
                  </p>
                </div>

                <div className="company-footer-row">
                  <p className="company-website-unique">
                    <span className="company-label-unique"><Trans>Website</Trans></span>
                    {websiteHref ? (
                      <a
                        href={websiteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="company-link-unique"
                      >
                        <Trans>Visit site</Trans>
                      </a>
                    ) : (
                      <span className="company-muted-text"><Trans>Not provided</Trans></span>
                    )}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <Pagination
        currentPage={pageFromUrl}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalCompanies}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={(page) => setSearchParams({ page: page.toString() })}
      />
    </section>
    </Container>
    )}
   
  
  </>
  );
}
