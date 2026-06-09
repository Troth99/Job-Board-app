import { useEffect, useState } from "react";
import "./ViewMembers.css";
import { useParams } from "react-router";
import useCompany from "../../../hooks/utils/useCompany";
import { formatDate } from "../../../utils/formData";
import Spinner from "../../Spinner/Spinner";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import { useRole } from "../../../context/RoleContext";
import { BsChatDots } from "react-icons/bs";
import { SendMessage } from "../SendMessage/SendMessage";
import { generateSeoConfig } from "../../../seo/seo";
import MetaData from "../../../seo/MetaDataTags";

const availableRoles = ["admin", "recruiter", "member"];

//refractor css

export default function ViewMembers() {
  const { companyId } = useParams();
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState<string | null>(null);

  const seo = generateSeoConfig("companyMembers");

  const {
    getCompanyMembers,
    loading,
    changeMemberRole,
    kickMemberFromCompany,
  } = useCompany();
  const { userRole } = useRole();
  const [members, setMembers] = useState<CompanyMember[]>([]);

  const sorterMembersByRole = (members: CompanyMember[]) => {
    const rolePriority: { [key: string]: number } = {
      owner: 1,
      admin: 2,
      recruiter: 3,
      member: 4,
    };
    return [...members].sort(
      (a, b) => (rolePriority[a.role] || 5) - (rolePriority[b.role] || 5),
    );
  };

  useEffect(() => {
    const fetchMembers = async () => {
      if (companyId) {
        const data = await getCompanyMembers(companyId);
        console.log("Fetched members:", data);
        setMembers(sorterMembersByRole(data));
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

      const data = await getCompanyMembers(companyId);
      setMembers(sorterMembersByRole(data));
    } catch (error) {
      console.error("Failed to update the role.", error);
    }
  };

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

  const sendMessageHandler = (email: string) => {
    setShowMessageModal(email);
  };

  return (
    <>
    <MetaData seo={seo} />
    <div className="member-list-page">
      <div className="members-list-container">
      <div className="content-title-members-list">
        <div className="members-title-row">
          <div className="members-heading-block">
            <span className="members-title-kicker">Team Management</span>
            <h2>Company Members</h2>
            <p className="members-title-subtitle">Manage team roles and access permissions.</p>
          </div>
          <div className="members-title-meta">
            <span className="members-total-badge">{members.length} members</span>
          </div>
        </div>
      </div>
        
        <div className="members-cards">
          {members.map((member: CompanyMember, idx: number) => (
            <div className="member-card" key={member._id || idx} data-role={member.role}>
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
              <div className="member-actions-row">
                <div className="member-email">
                  <BsChatDots
                    className="message-icon"
                    title="Message"
                    onClick={() => sendMessageHandler(member.userId?.email || "")}
                  />
                </div>
                <div className="member-actions role-actions">
                  {userRole === "owner" && member.role !== "owner" && (
                    <>
                      <button
                        className="action-btn edit"
                        title="Change Role"
                        onClick={() =>
                          setShowOptions(
                            showOptions === member._id ? null : member._id,
                          )
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Render the modal only once, outside the map, when showMessageModal is set */}
      {showMessageModal && (
        <SendMessage
        autoOpen={true}
          recipient={showMessageModal}
          onClose={() => setShowMessageModal(null)}
        />
      )}
    </div>
    </>
  );
}
