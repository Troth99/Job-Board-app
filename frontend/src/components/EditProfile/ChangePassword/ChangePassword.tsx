import "./ChangePassword.css"

export default function ChangePassword(){


    return (
      <div className="profile-container">
  <div className="profile-header">
    <h1>Change Password</h1>
  </div>

  <form className="profile-details">
    <div>
      <strong>Current Password:</strong>
      <input type="password" name="currentPassword" />
      <div className="error-message"></div>
    </div>
    <div>
      <strong>New Password:</strong>
      <input type="password" name="newPassword" />
      <div className="error-message"></div>
    </div>
    <div>
      <strong>Confirm Password:</strong>
      <input type="password" name="confirmPassword" />
      <div className="error-message"></div>
    </div>

    <div className="edit-profile-button-container">
      <button type="submit" className="edit-profile-button">Change Password</button>
    </div>
  </form>
</div>

    )
}