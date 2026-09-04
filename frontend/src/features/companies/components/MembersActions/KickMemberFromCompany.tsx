import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { FiUserX } from "react-icons/fi";
import { CompanyMember } from "../../types/CompanyMember.model";

export default function KickMemberFromCompany({
  userRole,
  member,
  kickMemberHandler,
  loading,
}: {
  userRole: string | null | undefined;
  member: CompanyMember;
  kickMemberHandler: (memberId: string) => void;
  loading: boolean;
}) {
  return (
    <>
      {(userRole === "owner" || userRole === "admin") &&
        member.role !== "owner" &&
        member.role !== "admin" && (
          <button
            className="action-btn remove"
            title={t`Remove Member`}
            disabled={loading}
            onClick={() => kickMemberHandler(member._id)}
          >
            {loading ? (
              t`Removing...`
            ) : (
              <>
                <FiUserX aria-hidden="true" className="btn-icon" />
                <span className="btn-label">
                  <Trans>Remove</Trans>
                </span>
              </>
            )}
          </button>
        )}
    </>
  );
}
