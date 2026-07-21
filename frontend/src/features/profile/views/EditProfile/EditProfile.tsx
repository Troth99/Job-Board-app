import "./EditProfile.css";
import "./Responsive.css";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import { useNavigate } from "react-router";
import { showSuccess } from "../../../../shared/utils/toast";
import { useValidation } from "../../../auth/validators/useValidation";
import useProfile from "../../hooks/useProfile";
import useForm from "../../../../shared/hooks/useForm";
import { useState, useEffect } from "react";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import useAvatar from "../../hooks/useAvatar";
import { ProfileData } from "../../types/profileSectionTypes";
import { profilePaths } from "../../routes/profilePaths";
import { Trans } from "@lingui/react/macro";

const initialProfileData: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  avatar: "",
};

export default function EditProfile() {
  const { userData, updateUserProfile, handleDeleteProfile } = useProfile();
  const { handleDeleteProfileImage } = useAvatar();
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const seo = generateSeoConfig("editProfile");

  
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

  const formAction = async (values: ProfileData) => {
    setButtonLoading(true);
    try {
      await updateUserProfile(values);
      showSuccess("Profile was updated successfully!");
      navigate(profilePaths.root);
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
    navigate(profilePaths.changePassword);
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
    <>
     <MetaData seo={seo} />
        
    <div className="profile-body" style={{ position: "relative" }}>
      {!userData ? (
        <Spinner overlay={true} />
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <h1><Trans>Edit Profile</Trans></h1>
          </div>

          <form onSubmit={formHandler}>
            <div className="profile-details">
              <div>
                <strong><Trans>First name:</Trans></strong>
                <input type="text" {...register("firstName")} />
                <div className="error-message">{errors.firstName}</div>
              </div>
              <div>
                <strong><Trans>Last name:</Trans></strong>
                <input type="text" {...register("lastName")} />
                <div className="error-message">{errors.lastName}</div>
              </div>
              <div>
                <strong><Trans>Phone:</Trans></strong>
                <input type="text" {...register("phoneNumber")} />
                <div className="error-message">{errors.phoneNumber}</div>
              </div>
              <div>
                <strong><Trans>Email:</Trans></strong>
                <input type="email" {...register("email")} />
                <div className="error-message">{errors.email}</div>
              </div>
              <div>
                <strong><Trans>Location:</Trans></strong>
                <input type="text" {...register("location")} />
                <div className="error-message">{errors.location}</div>
              </div>

              <div className="edit-profile-button-container">
                <button
                  className="edit-profile-button"
                  type="submit"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? <Trans>Saving...</Trans> : <Trans>Save Changes</Trans>}
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
                <Trans>Delete Profile Image</Trans>
              </button>
            </div>
            <div className="change-password-container">
              <button
                className="change-password-button"
                onClick={changePasswordHandler}
                disabled={buttonLoading}
              >
                <Trans>Change Password</Trans>
              </button>
            </div>

            <div className="delete-profile-container">
              <button
                className="delete-profile-button"
                onClick={deleteProfileHandler}
                disabled={buttonLoading}
              >
                <Trans>Delete Profile</Trans>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
       </>
  );
}
