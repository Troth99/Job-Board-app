import { useEffect, useState } from "react";
import {
  deleteUserProfileImage,
  getUserProfile,
  updateUserProfile,
} from "../../services/userService";
import "./EditProfile.css";
import "./Responsive.css";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router";
import { showSuccess } from "../../utils/toast";
import { useValidation } from "../../hooks/useValidation";
import { registerFormType } from "../../services/auth/authService";

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
}

const initialProfileData: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",  
  phoneNumber: "",
  location: "",
  avatar: "",
};
export default function EditProfile() {
  const [avatarInfo, setAvatarInfo] = useState({
    avatar: "",
  });
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<registerFormType>>({});


  const { validateForm } = useValidation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch user for edit page.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  const trimmedValue = value.trim();

  setProfileData((prev) => ({ ...prev as ProfileData, [name]: trimmedValue }));
  setErrors((prev) => ({ ...prev, [name]: "" }));
};

  const handleDeleteProfileImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //TO refracto this function with the message

      const response = await deleteUserProfileImage();
      if (
        response &&
        response.message === "Profile image deleted successfully"
      ) {
        setAvatarInfo({ ...avatarInfo, avatar: "" });
        alert("Profile image deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting profile image:", error);
      alert("Failed to delete profile image.");
    }
  };

  const editSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    setErrors({});

    const formErrors = validateForm(profileData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setButtonLoading(false);
      return;
    }
    try {
      await updateUserProfile(profileData);

      showSuccess("Profile saved scucsesfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to save changes!");
    } finally {
      setButtonLoading(false);
    }
  };
// to Refractor to controlled form
  return (
    <div className="profile-body" style={{ position: "relative" }}>
      {loading && <Spinner overlay={true} />}
      <div className="profile-container">
        <div className="profile-header">
          <h1>Edit Profile</h1>
        </div>

        <form onSubmit={editSubmitHandler}>
          <div className="profile-details">
            <div>
              <strong>First name:</strong>
              <input
                type="text"
                value={profileData?.firstName}
                name="firstName"
                onChange={handleInputChange}
              />
                <div className="error-message">{errors.firstName}</div>
            </div>
            <div>
              <strong>Last name:</strong>
              <input
                type="text"
                value={profileData?.lastName}
                name="lastName"
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.lastName}</div>
            </div>
            <div>
              <strong>Phone:</strong>
              <input
                type="text"
                value={profileData?.phoneNumber}
                name="phoneNumber"
                onChange={handleInputChange}
                
              />
              <div className="error-message">{errors.phoneNumber}</div>
            </div>
            <div>
              <strong>Location:</strong>
              <input
                type="text"
                value={profileData?.location}
                name="location"
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.location}</div>
            </div>

            <div className="edit-profile-button-container">
              <button
                className="edit-profile-button"
                type="submit"
                disabled={buttonLoading}
              >
                {buttonLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
          <div className="button-container">
            <div className="delete-image-container">
              <button
                className="delete-image-button"
                onClick={handleDeleteProfileImage}
              >
                Delete Profile Image
              </button>
            </div>
            <div className="check-profile-logs-container">
              <button className="check-profile-logs-button">View logs</button>
            </div>
            <div className="change-password-container">
              <button className="change-password-button">
                Change Password
              </button>
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
