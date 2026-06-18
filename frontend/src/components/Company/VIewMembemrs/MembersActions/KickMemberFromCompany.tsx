import { CompanyMember } from "../../../../interfaces/CompanyMember.model";

export default function KickMemberFromCompany({
  userRole,
  member,
  kickMemberHandler,
  loading
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
            title="Remove Member"
            disabled={loading}
            onClick={() => {
              if (loading) {
                return;
              }

              kickMemberHandler(member._id);
            }}
          >
            {loading ? "Removing..." : "Remove Member"}
          </button>
        )}
    </>
  );
}
