import { useEffect, useState } from "react";
import {
  deleteUserProfile,
  deleteUserProfileImage,
  getUserProfile,
  updateUserProfile,
} from "../../services/userService";
import "./EditProfile.css";
import "./Responsive.css";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router";
import { showSuccess } from "../../utils/toast";
import { useValidation } from "../../utils/useValidation";
import { logOut, registerFormType } from "../../services/auth/authService";
import { useDispatch } from "react-redux";
import { logout, setAuthenticated } from "../../redux/authSlice";

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
  const [profileData, setProfileData] =
    useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<registerFormType>>({});
  const dispatch = useDispatch();

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

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const trimmedValue = value.trim();

    setProfileData((prev) => ({
      ...(prev as ProfileData),
      [name]: trimmedValue,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDeleteProfileImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await deleteUserProfileImage();
      if (response.message === "Profile image deleted successfully") {
        setAvatarInfo((prev) => ({ ...prev, avatar: "" }));
        showSuccess("Profile image deleted successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error deleting profile image:", error);
      alert("Failed to delete profile image.");
    }
  };

  const changePasswordHandler = () => {
    navigate("/profile/change-password");
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

  const deleteProfileHandler = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile??"
    );
    if (!isConfirmed) {
      return;
    }
    const password = window.prompt(
      "Please enter your password to confirm the deletion:"
    );

    if (!password) {
      alert("Password is required to delete the profile.");
      return;
    }

    setLoading(true);
    try {
      await deleteUserProfile();
      const success = await logOut();
      
      dispatch(setAuthenticated(false));
      if (success) {
        dispatch(setAuthenticated(false));

        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("An error occurred while deleting your profile.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profile-body" style={{ position: "relative" }}>
      {loading && <Spinner overlay={true} />}

      {!loading && (
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
                  onChange={onChangeHandler}
                />
                <div className="error-message">{errors.firstName}</div>
              </div>
              <div>
                <strong>Last name:</strong>
                <input
                  type="text"
                  value={profileData?.lastName}
                  name="lastName"
                  onChange={onChangeHandler}
                />
                <div className="error-message">{errors.lastName}</div>
              </div>
              <div>
                <strong>Phone:</strong>
                <input
                  type="text"
                  value={profileData?.phoneNumber}
                  name="phoneNumber"
                  onChange={onChangeHandler}
                />
                <div className="error-message">{errors.phoneNumber}</div>
              </div>
              <div>
                <strong>Location:</strong>
                <input
                  type="text"
                  value={profileData?.location}
                  name="location"
                  onChange={onChangeHandler}
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
          </form>
          <div className="button-container">
            <div className="delete-image-container">
              <button
                className="delete-image-button"
                onClick={handleDeleteProfileImage}
                disabled={buttonLoading}
              >
                Delete Profile Image
              </button>
            </div>
            <div className="change-password-container">
              <button
                className="change-password-button"
                onClick={changePasswordHandler}
                disabled={buttonLoading}
              >
                Change Password
              </button>
            </div>

            <div className="delete-profile-container">
              <button
                className="delete-profile-button"
                onClick={deleteProfileHandler}
                disabled={buttonLoading}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
