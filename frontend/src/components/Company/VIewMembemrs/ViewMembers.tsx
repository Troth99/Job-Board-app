import { useEffect, useState } from "react";
import "./ViewMembers.css";
import { useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import { formatDate } from "../../../utils/formData";
import Spinner from "../../Spinner/Spinner";

export function ViewMembers() {
  const { companyId } = useParams();
  const { getCompanyMembers, loading } = useCompany();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (companyId) {
        const data = await getCompanyMembers(companyId);
        console.log(data)
        setMembers(data);
      }
    };
    fetchMembers();
  }, [companyId]);
 if(loading) {
    return <Spinner overlay={true} />
 }
  return (
    <div className="member-list-page">
      <div className="members-list-container">
        <h2>Company Members</h2>
        <div className="members-cards">
          {members.map((member: any, idx: number) => (
            <div className="member-card" key={member._id || idx}>
              <div className="member-info">
                <div className="member-name">
                  {member.userId?.name || member.userId?.email || member.userId}
                </div>
                <div className="member-email">
                  {member.userId?.email || ''}
                </div>
                <div className="member-role">Role: {member.role}</div>
                <div className="member-invited">Invited By: {member.invitedBy?.name || member.invitedBy?.email || member.invitedBy}</div>
                <div className="member-invitedAt">Invited At: {formatDate(member.invitedAt)}</div>
                <div className="member-updatedAt">Updated At: {formatDate(member.updatedAt)}</div>
              </div>
              <div className="member-actions">
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}