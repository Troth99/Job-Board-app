import { useEffect, useState } from "react";
import "./ViewMembers.css";
import { useParams } from "react-router";
import { MemberCardSkeleton, SkeletonList } from "../../../../shared/components/Skeleton/Skeleton";
import useMembers from "../../hooks/useMembers";
import { CompanyMember } from "../../types/CompanyMember.model";
import { useRole } from "../../../../context/RoleContext";
import { BsChatDots } from "react-icons/bs";
import { SendMessage } from "../../components/SendMessage/SendMessage";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";

import { toast } from "react-toastify";
import ChangeRoleForMember from "../../components/MembersActions/ChangeRoleForMember";
import KickMemberFromCompany from "../../components/MembersActions/KickMemberFromCompany";
import { KickMemberConfirmationModal } from "../../components/MembersActions/kickMemberConfirmationModal";
import MembersCard from "./MembersCard";
import { Trans, useLingui } from "@lingui/react/macro";
import { getUserFromLocalStorage } from "../../../auth/hooks/useAuth";

const availableRoles = ["admin", "recruiter", "member"];

export default function ViewMembers() {
  const { companyId } = useParams();
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState<string | null>(null);
  const [memberToKick, setMemberToKick] = useState<CompanyMember | null>(null);
  const [kicking, setKicking] = useState(false);

  const seo = () => generateSeoConfig("companyMembers");

  const {t} = useLingui();

  const user = getUserFromLocalStorage();

  const { getCompanyMembers, changeMemberRole, kickMemberFromCompany } =
    useMembers();
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
   console.log(user._id)
    const fetchMembers = async () => {
      if (companyId) {
        const data = await getCompanyMembers(companyId);
        setMembers(sorterMembersByRole(data));
        setLoading(false);
      }
    };
    fetchMembers();
  }, [companyId]);

  const changeRoleHandler = async (
    memberId: string,
    newRole: string,
    member: CompanyMember,
  ) => {
    if (!companyId) return;

    const memberName = member.userId?.name || member.userId?.email || "Member";
    try {
      await changeMemberRole(companyId, memberId, newRole);

      const data = await getCompanyMembers(companyId);
      setMembers(sorterMembersByRole(data));
      toast.success(t`${memberName}'s role updated to ${newRole} successfully.`);
    } catch (error) {
      console.error("Failed to update the role.", error);
      toast.error(t`Failed to update the role.`);
    }
  };

  const confirmKickMemberHandler = async () => {
    if (!companyId || !memberToKick) return;
    setKicking(true);
    const memberName =
      memberToKick.userId?.name || memberToKick.userId?.email || "Member";
    try {
      await kickMemberFromCompany(companyId, memberToKick._id);
      setMembers((prevMembers: CompanyMember[]) =>
        prevMembers.filter((m) => m._id !== memberToKick._id),
      );
      toast.success(t`${memberName} has been removed from the company.`);
      setMemberToKick(null);
    } catch (error) {
      console.error("Failed to kick member from the company", error);
      toast.error(t`Failed to remove the member.`);
    } finally {
      setKicking(false);
    }
  };

  const sendMessageHandler = (email: string) => {
    setShowMessageModal(email);
  };

  return (
    <>
      <MetaData seo={seo} />

      {loading ? (
        <div className="members-cards">
          <SkeletonList count={6} render={(i) => <MemberCardSkeleton key={i} />} />
        </div>
      ) : (
        <div className="member-list-page">
          <div className="members-list-container">
            <div className="content-title-members-list">
              <div className="members-title-row">
                <div className="members-heading-block">
                  <span className="members-title-kicker"><Trans>Team Management</Trans></span>
                  <h2><Trans>Company Members</Trans></h2>
                  <p className="members-title-subtitle">
                     <Trans>Manage team roles and access permissions.</Trans>
                  </p>
                </div>
                <div className="members-title-meta">
                  <span className="members-total-badge">
                    <Trans>{members.length} members</Trans>
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
                    {user._id !== member.userId?._id && (
                      <div className="member-email">
                        <BsChatDots
                          className="message-icon"
                          title={t`Message`}
                          onClick={() =>
                            sendMessageHandler(member.userId?.email || "")
                          }
                        />
                      </div>
                    )}
                    <div className="member-actions role-actions">
                      <ChangeRoleForMember
                        userRole={userRole}
                        member={member}
                        showOptions={showOptions}
                        setShowOptions={setShowOptions}
                        changeRoleHandler={(newRole) =>
                          changeRoleHandler(member._id, newRole, member)
                        }
                        availableRoles={availableRoles}
                      />
                      <KickMemberFromCompany
                        userRole={userRole}
                        member={member}
                        loading={loading}
                        kickMemberHandler={() => setMemberToKick(member)}
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
          <KickMemberConfirmationModal
            isOpen={!!memberToKick}
            memberName={
              memberToKick?.userId?.name ||
              memberToKick?.userId?.email ||
              "this member"
            }
            submitting={kicking}
            onClose={() => setMemberToKick(null)}
            onConfirm={confirmKickMemberHandler}
          />
        </div>
      )}
    </>
  );
}
