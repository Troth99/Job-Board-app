import { useState } from "react";
import { deleteUserProfileImage } from "../../services/userService";
import "./EditProfile.css"
import "./Responsive.css"

export default function EditProfile() {
const [ profileData, setProfileData] = useState({
    avatar: '',
})

    const handleDeleteProfileImage = async (e: React.FormEvent) => {
        e.preventDefault()
        try {


//TO refracto this function with the message

            const response = await deleteUserProfileImage()
               if (response && response.message === 'Profile image deleted successfully') {
        setProfileData({ ...profileData, avatar: '' });
        alert('Profile image deleted successfully');
      }
        } catch (error) {
      console.error('Error deleting profile image:', error);
      alert('Failed to delete profile image.');
        }
    }


    return (
<div className="profile-container">
  <div className="profile-header">
    <h1>Edit Profile</h1>
  </div>

  <form>
    <div className="profile-info">
      <div>
        <strong>First name:</strong>
        <input type="text" value="John" />
      </div>
      <div>
        <strong>Last name:</strong>
        <input type="text" value="Doe" />
      </div>
      <div>
        <strong>Phone:</strong>
        <input type="text" value="123123123123" />
      </div>
      <div>
        <strong>Location:</strong>
        <input type="text" value="New York" />
      </div>
      <div>
        <strong>Role:</strong>
        <input type="text" value="Developer" />
      </div>

      <div className="edit-profile-button-container">
        <button className="edit-profile-button" type="submit">Save Changes</button>
      </div>
    </div>
        <div className="button-container">
    <div className="delete-image-container">
      <button className="delete-image-button" onClick={handleDeleteProfileImage}>Delete Profile Image</button>
    </div>
 <div className="check-profile-logs-container">
      <button className="check-profile-logs-button">View logs</button>
    </div>
    <div className="change-password-container">
      <button className="change-password-button">Change Password</button>
    </div>

    <div className="delete-profile-container">
      <button className="delete-profile-button">Delete Profile</button>
    </div>
       </div>

    <div className="role-change">
      <h3>Change Role</h3>
      <p>Select a new role for your profile.</p>
    </div>

    <div className="company-registration">
      <h3>Company Registration</h3>
      <p>If you have registered a new company, you can add it here.</p>
    </div>
  </form>
</div>
  );
}