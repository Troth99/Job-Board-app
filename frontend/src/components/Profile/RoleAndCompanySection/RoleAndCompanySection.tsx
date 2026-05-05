import { useNavigate } from "react-router";
import { LoadingIndicator } from "../../../LoadingIndicator/LoadingIndicator";

interface RoleAndCompanySectionProps {
  userRole: string | null | undefined;
  company: any;
  companyLoading: boolean;
}

export function RoleAndCompanySection({
  userRole,
  company,
  companyLoading,
}: RoleAndCompanySectionProps) {
  const navigate = useNavigate();

  return (
    <div className="Profile-Data-info">
      {(userRole === undefined || companyLoading) ? (
        <LoadingIndicator message="Loading..." size="medium" />
      ) : (
        <>
          <div className="role-change">
            <h3>Role:</h3>
            <p>
              {userRole
                ? `${userRole} of ${company?.name}`
                : "Not part of a company yet."}
            </p>
          </div>
          <div className="company-registration">
            {company ? (
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
        </>
      )}
    </div>
  );
}