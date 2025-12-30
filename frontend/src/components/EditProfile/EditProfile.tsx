import "./EditProfile.css";
import "./Responsive.css";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router";
import { showSuccess } from "../../utils/toast";
import { useValidation } from "../validators/useValidation";
import useUserProfile from "../../hooks/useProfile";
import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
  [key: string]: string | undefined;
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
  const {
    userData,
    updateUserProfile,
    handleDeleteProfileImage,
    handleDeleteProfile,
  } = useUserProfile();

  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        location: userData.location || "",
        avatar: userData.avatar || "",
      });
    }
  }, [userData]);

  const { validateForm } = useValidation();
  const navigate = useNavigate();

  const formAction = async (values: any) => {
    setButtonLoading(true);
    try {
      await updateUserProfile(values);
      showSuccess("Profile was updated successfully!");
      navigate("/profile");
    } catch (error: any) {
      if (error.message === "Email already exists.") {
        setErrors((prev: Partial<ProfileData>) => ({ ...prev, email: "Email already exists" }));
        setButtonLoading(false);
        return;
      }
      console.error("Failed to update profile.");
    }
    setButtonLoading(false);
  };

  const { register, formHandler, values, errors, setErrors } = useForm(
    formAction,
    profileData,
    validateForm
  );

  const [buttonLoading, setButtonLoading] = useState(false);

  const changePasswordHandler = () => {
    navigate("/profile/change-password");
  };

  const imageDeleteHandler = async () => {
    setButtonLoading(true);
    try {
      await handleDeleteProfileImage();
      showSuccess("Profile image deleted successfully!");
    } catch (error) {
      alert("Failed to delete profile image.");
    } finally {
      setButtonLoading(false);
    }
  };

  const deleteProfileHandler = async () => {
    setButtonLoading(true);
    try {
      await handleDeleteProfile(() => {
        showSuccess("Profile deleted successfully!");
        navigate("/");
      });
    } catch (error) {
      alert("Failed to delete profile.");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="profile-body" style={{ position: "relative" }}>
      {!userData ? (
        <Spinner overlay={true} />
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <h1>Edit Profile</h1>
          </div>

          <form onSubmit={formHandler}>
            <div className="profile-details">
              <div>
                <strong>First name:</strong>
                <input type="text" {...register("firstName")} />
                <div className="error-message">{errors.firstName}</div>
              </div>
              <div>
                <strong>Last name:</strong>
                <input type="text" {...register("lastName")} />
                <div className="error-message">{errors.lastName}</div>
              </div>
              <div>
                <strong>Phone:</strong>
                <input type="text" {...register("phoneNumber")} />
                <div className="error-message">{errors.phoneNumber}</div>
              </div>
              <div>
                <strong>Email:</strong>
                <input type="email" {...register("email")} />
                <div className="error-message">{errors.email}</div>
              </div>
              <div>
                <strong>Location:</strong>
                <input type="text" {...register("location")} />
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
                onClick={imageDeleteHandler}
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
