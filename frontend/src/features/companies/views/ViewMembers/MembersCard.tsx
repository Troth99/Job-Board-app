import { BsChatDots } from "react-icons/bs";
import { CompanyMember } from "../../types/CompanyMember.model";
import { formatDate } from "../../../../shared/utils/formData";
import { Trans } from "@lingui/react/macro";


export default function MembersCard({ member }: { member: CompanyMember }) {


    return (
        <>
   <div className="member-info">
                <div className="member-name">
                  {member.userId?.name || member.userId?.email || member._id}
                </div>
                <div className="member-role"><Trans>Role:</Trans> {member.role}</div>
                <div className="member-invited">
                  <Trans>Invited By:</Trans>{" "}
                  {member.invitedBy?.name ||
                    member.invitedBy?.email ||
                    member.invitedBy?._id}
                </div>
                <div className="member-invitedAt">
                  {member.invitedAt && (
                    <span><Trans>Invited At:</Trans> {formatDate(member.invitedAt)}</span>
                  )}
                </div>
                <div className="member-updatedAt">
                  {member.updatedAt && (
                    <span><Trans>Updated At:</Trans> {formatDate(member.updatedAt)}</span>
                  )}
                </div>
              </div>
          </>
    )
}