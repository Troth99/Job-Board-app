import { useEffect, useState } from "react";
import "./ViewMembers.css";
import { useParams } from "react-router";
import useCompany from "../../../hooks/utils/useCompanyMethods";
import Spinner from "../../Spinner/Spinner";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import { useRole } from "../../../context/RoleContext";
import { BsChatDots } from "react-icons/bs";
import { SendMessage } from "../SendMessage/SendMessage";
import { generateSeoConfig } from "../../../seo/seo";
import MetaData from "../../../seo/MetaDataTags";
import MembersCard from "./MembersCard";
import ChangeRoleForMember from "./MembersActions/ChangeRoleForMember";
import KickMemberFromCompany from "./MembersActions/KickMemberFromCompany";

const availableRoles = ["admin", "recruiter", "member"];

//refractor css

export default function ViewMembers() {
  const { companyId } = useParams();
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState<string | null>(null);

  const seo = generateSeoConfig("companyMembers");

  const { getCompanyMembers, changeMemberRole, kickMemberFromCompany } =
    useCompany();
  const { userRole } = useRole();
  const [members, setMembers] = useState<CompanyMember[]>([]);
  const [loading, setLoading] = useState(true);

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
        setMembers(sorterMembersByRole(data));
        setLoading(false);
      }
    };
    fetchMembers();
  }, [companyId]);

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
    setLoading(true);
    try {
      await kickMemberFromCompany(companyId, memberId);
      setMembers((prevMembers: CompanyMember[]) =>
        prevMembers.filter((m) => m._id !== memberId),
      );
    } catch (error) {
      console.error("Failed to kick member from the company", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessageHandler = (email: string) => {
    setShowMessageModal(email);
  };

  return (
    <>
      <MetaData seo={seo} />

      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="member-list-page">
          <div className="members-list-container">
            <div className="content-title-members-list">
              <div className="members-title-row">
                <div className="members-heading-block">
                  <span className="members-title-kicker">Team Management</span>
                  <h2>Company Members</h2>
                  <p className="members-title-subtitle">
                    Manage team roles and access permissions.
                  </p>
                </div>
                <div className="members-title-meta">
                  <span className="members-total-badge">
                    {members.length} members
                  </span>
                </div>
              </div>
            </div>

            <div className="members-cards">
              {members.map((member: CompanyMember, idx: number) => (
                <div
                  className="member-card"
                  key={member._id || idx}
                  data-role={member.role}
                >
                  {/* MembersCard component to show member details */}
                  <MembersCard member={member} />

                  <div className="member-actions-row">
                    <div className="member-email">
                      <BsChatDots
                        className="message-icon"
                        title="Message"
                        onClick={() =>
                          sendMessageHandler(member.userId?.email || "")
                        }
                      />
                    </div>
                    <div className="member-actions role-actions">
                      <ChangeRoleForMember
                        userRole={userRole}
                        member={member}
                        showOptions={showOptions}
                        setShowOptions={setShowOptions}
                        changeRoleHandler={changeRoleHandler}
                        availableRoles={availableRoles}
                      />
                      <KickMemberFromCompany
                        userRole={userRole}
                        member={member}
                        kickMemberHandler={kickMemberHandler}
                      />
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
      )}
    </>
  );
}
