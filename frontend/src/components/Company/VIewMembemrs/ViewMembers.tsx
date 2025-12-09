import "./ViewMembers.css";

export function ViewMembers() {
  const members = [
    { name: "Ivan Ivanov", email: "ivan@company.com", role: "owner" },
    { name: "Maria Petrova", email: "maria@company.com", role: "admin" },
    { name: "Georgi Georgiev", email: "georgi@company.com", role: "member" },
  ];

  return (
    <div className="member-list-page">
    <div className="members-list-container">
      <h2>Company Members</h2>
      <div className="members-cards">
        {members.map((member, idx) => (
          <div className="member-card" key={idx}>
            <div className="member-info">
              <div className="member-name">{member.name}</div>
              <div className="member-email">{member.email}</div>
              <div className="member-role">Role: {member.role}</div>
            </div>
            <div className="member-actions">
              <button className="change-role-btn">Change Role</button>
              <button className="kick-btn">Kick</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}