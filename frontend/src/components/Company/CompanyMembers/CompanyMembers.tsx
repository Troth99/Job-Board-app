import { useState } from "react"

export function CompanyMembers() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
   <div className="content-header">
          <h3>Members</h3>
          <button className="add-button" onClick={() => setShowModal(true)}>+ Add Member</button>
        </div>

        {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add Member</h3>
            <form>
              <input type="email" placeholder="Enter member email" required />
              <button type="submit">Add</button>
            </form>
            <button className="modal-close-f2" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
        )}
        
        {/* Displaying Member List */}
        <div className="members-list">
          <div className="member-card">
            <img src="https://i.imgur.com/OqVaosK.jpeg" alt="Member 1" />
            <div className="member-info">
              <h4>John Doe</h4>
              <p>Role: Developer</p>
              <p>Status: Active</p>
            </div>
          </div>

          <div className="member-card">
            <img src="https://i.imgur.com/OqVaosK.jpeg" alt="Member 2" />
            <div className="member-info">
              <h4>Jane Smith</h4>
              <p>Role: Designer</p>
              <p>Status: Active</p>
            </div>
          </div>
        </div>
        </>
    )
    
}