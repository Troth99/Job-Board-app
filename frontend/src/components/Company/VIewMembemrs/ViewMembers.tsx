import { useEffect, useState } from "react";
import "./ViewMembers.css";
import { useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import { formatDate } from "../../../utils/formData";
import Spinner from "../../Spinner/Spinner";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import { useRole } from "../../../context/RoleContext";

const availableRoles = ["admin", "recruiter", "member"];
export function ViewMembers() {
  const { companyId } = useParams();
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const {
    getCompanyMembers,
    loading,
    changeMemberRole,
    kickMemberFromCompany,
  } = useCompany();
  const {userRole} = useRole()
  const [members, setMembers] = useState<CompanyMember[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (companyId) {
        const data = await getCompanyMembers(companyId);
        setMembers(data);
      }
    };
    fetchMembers();
  }, [companyId]);
  if (loading) {
    return <Spinner overlay={true} />;
  }

  const changeRoleHandler = async (memberId: string, newRole: string) => {
    if (!companyId) return;
    try {
      await changeMemberRole(companyId, memberId, newRole);
      setMembers((prevMembers: CompanyMember[]) =>
        prevMembers.map((m) =>
          m._id === memberId ? { ...m, role: newRole } : m,
        ),
      );
    } catch (error) {
      console.error("Failed to update the role.", error);
    }
  };

//asdasd
  
  const kickMemberHandler = async (memberId: string) => {
    if (!companyId) return;
    try {
      await kickMemberFromCompany(companyId, memberId);
      setMembers((prevMembers: CompanyMember[]) =>
        prevMembers.filter((m) => m._id !== memberId),
      );
    } catch (error) {
      console.error("Failed to kick member from the company", error);
    }
  };


  return (
    <div className="member-list-page">
      <div className="members-list-container">
        <h2>Company Members</h2>
        <div className="members-cards">
          {members.map((member: CompanyMember, idx: number) => (
            <div className="member-card" key={member._id || idx}>
              <div className="member-info">
                <div className="member-name">
                  {member.userId?.name || member.userId?.email || member._id}
                </div>
                <div className="member-role">Role: {member.role}</div>
                <div className="member-invited">
                  Invited By:{" "}
                  {member.invitedBy?.name ||
                    member.invitedBy?.email ||
                    member.invitedBy?._id}
                </div>
                <div className="member-invitedAt">
                  {member.invitedAt && (
                    <span>Invited At: {formatDate(member.invitedAt)}</span>
                  )}
                </div>
                <div className="member-updatedAt">
                  {member.updatedAt && (
                    <span>Updated At: {formatDate(member.updatedAt)}</span>
                  )}
                </div>
              </div>
              <div className="member-actions">
                {userRole === "owner" && member.role !== "owner" && (
                  <>
                    <button
                      className="action-btn edit"
                      title="Change Role"
                      onClick={() => setShowOptions(member._id)}
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
                                changeRoleHandler(member._id, role);
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
                {(userRole === "owner" || userRole === "admin") && member.role !== "owner" && member.role !== "admin" && (
                  <button
                    className="action-btn remove"
                    title="Remove Member"
                    onClick={() => kickMemberHandler(member._id)}
                  >
                    Kick
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
