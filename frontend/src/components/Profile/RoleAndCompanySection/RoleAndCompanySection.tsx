import { useNavigate } from "react-router";
import { LoadingIndicator } from "../../../LoadingIndicator/LoadingIndicator";

interface RoleAndCompanySectionProps {
  userRole: string | null | undefined;
  company: any;
  companyLoading: boolean;
  hasCompanyId: boolean;
}

export function RoleAndCompanySection({
  userRole,
  company,
  companyLoading,
  hasCompanyId,
}: RoleAndCompanySectionProps) {
  const navigate = useNavigate();
  const showLoading = hasCompanyId && (userRole === undefined || companyLoading || !company);

  return (
    <div className="Profile-Data-info">
      {showLoading ? (
        <LoadingIndicator message="Loading..." size="medium" />
      ) : (
        <>
        
          <div className="role-change">
            <h3>Role:</h3>
            <p>
              {hasCompanyId && userRole
                ? `${userRole} of ${company?.name}`
                : "Not part of a company yet."}
            </p>
          </div>
          <div className="company-registration">
            {hasCompanyId && company ? (
              <>
                <h3>{company.name}</h3>
                <p>Industry: {company.industry}</p>
                <p>Location: {company.location}</p>
                <button
                  className="create-company-button-f1"
                  onClick={() => navigate(`/company/${company._id}/dashboard`)}
                >
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <h3>Company Registration</h3>
                <p>Status: Not Registered</p>
              </>
            )}
          </div>

          {/* TODO: Saved Jobs — изисква savedJobs: [ObjectId] в User модела + GET /users/:id/saved-jobs */}
          <div className="saved-jobs-placeholder">
            <div className="saved-jobs-placeholder__icon">🔖</div>
            <h3>Saved Jobs</h3>
            <p>Coming soon — save jobs to revisit them later.</p>
          </div>
        </>
      )}
    </div>
  );
}