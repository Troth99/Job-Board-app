import { CompanyMember } from "../../../../interfaces/CompanyMember.model";

export default function ChangeRoleForMember({
  userRole,
  member,
  showOptions,
  setShowOptions,
  changeRoleHandler,
  availableRoles,
}: {
  userRole: string | null | undefined;
  member: CompanyMember;
  showOptions: string | null;
  setShowOptions: React.Dispatch<React.SetStateAction<string | null>>;
  changeRoleHandler: (newRole: string) => void;
  availableRoles: string[];
}) {
  return (
<>
      {userRole === "owner" && member.role !== "owner" && (
        <>
          <button
            className="action-btn edit"
            title="Change Role"
            onClick={() =>
              setShowOptions(showOptions === member._id ? null : member._id)
            }
          >
            Change Role
          </button>
          {showOptions === member._id && (
            <div className="custom-dropdown">
              {availableRoles
                .filter((role) => role !== "owner")
                .map((role) => (
                  <div
                    key={role}
                    className="dropdown-option"
                    onClick={() => {
                      changeRoleHandler(role);
                      setShowOptions(null);
                    }}
                  >
                    {role}
                  </div>
                ))}
            </div>
          )}
        </>
      )}
      {userRole === "owner" && member.role === "owner" && (
        <button
          className="action-btn edit"
          title="Change Role"
          disabled
          style={{ opacity: 0.6, cursor: "not-allowed" }}
        >
          Change Role
        </button>
      )}
</>
  );
}
