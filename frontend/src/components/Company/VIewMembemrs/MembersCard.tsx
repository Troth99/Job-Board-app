import { BsChatDots } from "react-icons/bs";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import { formatDate } from "../../../utils/formData";


export default function MembersCard({ member }: { member: CompanyMember }) {


    return (
        <>
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
          </>
    )
}