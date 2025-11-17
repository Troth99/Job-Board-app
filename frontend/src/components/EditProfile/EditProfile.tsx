import { useEffect, useState } from "react";
import { deleteUserProfileImage, getUserProfile } from "../../services/userService";
import "./EditProfile.css"
import "./Responsive.css"
import Spinner from "../Spinner/Spinner";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
}

export default function EditProfile() {
const [ avatarInfo, setAvatarInfo] = useState({
    avatar: '',
})
const [profileData, setProfileData] = useState<ProfileData>()
const [loading, setLoading] = useState<boolean>(true)


useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getUserProfile()
      setProfileData(data)
    } catch (error) {
      console.error('Failed to fetch user for edit page.')
    }finally{
      setLoading(false)
    }
  }
  fetchProfile()
},[])



    const handleDeleteProfileImage = async (e: React.FormEvent) => {
        e.preventDefault()
        try {


//TO refracto this function with the message

            const response = await deleteUserProfileImage()
               if (response && response.message === 'Profile image deleted successfully') {
        setAvatarInfo({ ...avatarInfo, avatar: '' });
        alert('Profile image deleted successfully');
      }
        } catch (error) {
      console.error('Error deleting profile image:', error);
      alert('Failed to delete profile image.');
        }
    }

    const editSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget)
      const formData = Object.fromEntries(form)

    }

    return (
          <div className="profile-body" style={{ position: "relative" }}>
         
            {loading && <Spinner overlay={true} />}
<div className="profile-container">
  <div className="profile-header">
    <h1>Edit Profile</h1>
  </div>

  <form onSubmit={editSubmitHandler}>
    <div className="profile-info">
      <div>
        <strong>First name:</strong>
        <input type="text" defaultValue={profileData?.firstName} name="firstName"/>
      </div>
      <div>
        <strong>Last name:</strong>
        <input type="text" defaultValue={profileData?.lastName} name="lastName" />
      </div>
      <div>
        <strong>Phone:</strong>
        <input type="text" defaultValue={profileData?.phoneNumber} name="phone"/>
      </div>
      <div>
        <strong>Location:</strong>
        <input type="text" defaultValue={profileData?.location} name="location"/>
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
</div>
  );
}