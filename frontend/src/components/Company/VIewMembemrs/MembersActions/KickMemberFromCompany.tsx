import { CompanyMember } from "../../../../interfaces/CompanyMember.model";

export default function KickMemberFromCompany({
  userRole,
  member,
  kickMemberHandler,
}: {
  userRole: string | null | undefined;
  member: CompanyMember;
  kickMemberHandler: (memberId: string) => void;
}) {
  return (
    <>
      {(userRole === "owner" || userRole === "admin") &&
        member.role !== "owner" &&
        member.role !== "admin" && (
          <button
            className="action-btn remove"
            title="Remove Member"
            onClick={() => kickMemberHandler(member._id)}
          >
            Kick
          </button>
        )}
    </>
  );
}
