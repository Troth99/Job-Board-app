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
  const seo = () => generateSeoConfig("editProfile");

  
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
      <div className="profile-body">
        {!userData ? (
          <Spinner overlay={true} />
        ) : (
          <div className="profile-container">
            <div className="profile-header">
              <div>
                <h1><Trans>Edit Profile</Trans></h1>
                <p className="profile-subtitle">
                  <Trans>Update your personal information and keep your account details current.</Trans>
                </p>
              </div>
            </div>

            <div className="profile-card">
              <aside className="avatar-panel">
                <div className="avatar-preview">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Profile avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {profileData.firstName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="avatar-meta">
                    <h2>{`${profileData.firstName || ""} ${profileData.lastName || ""}`.trim() || "User"}</h2>
                    <p>{profileData.email}</p>
                  </div>
                </div>

                <div className="avatar-actions">
                  <button
                    type="button"
                    className="delete-image-button secondary"
                    onClick={imageDeleteHandler}
                    disabled={buttonLoading}
                  >
                    <Trans>Delete Profile Image</Trans>
                  </button>
                </div>
              </aside>

              <section className="profile-form">
                <form onSubmit={formHandler}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName"><Trans>First name</Trans></label>
                      <input id="firstName" type="text" {...register("firstName")} />
                      <div className="error-message">{errors.firstName}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName"><Trans>Last name</Trans></label>
                      <input id="lastName" type="text" {...register("lastName")} />
                      <div className="error-message">{errors.lastName}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber"><Trans>Phone</Trans></label>
                      <input id="phoneNumber" type="text" {...register("phoneNumber")} />
                      <div className="error-message">{errors.phoneNumber}</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email"><Trans>Email</Trans></label>
                      <input id="email" type="email" {...register("email")} />
                      <div className="error-message">{errors.email}</div>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="location"><Trans>Location</Trans></label>
                      <input id="location" type="text" {...register("location")} />
                      <div className="error-message">{errors.location}</div>
                    </div>
                  </div>

                  <div className="form-footer">
                    <button
                      type="submit"
                      className="edit-profile-button primary"
                      disabled={buttonLoading}
                    >
                      {buttonLoading ? <Trans>Saving...</Trans> : <Trans>Save Changes</Trans>}
                    </button>
                  </div>
                </form>

                <div className="profile-actions">
                  <button
                    type="button"
                    className="profile-action-button secondary"
                    onClick={changePasswordHandler}
                    disabled={buttonLoading}
                  >
                    <Trans>Change Password</Trans>
                  </button>
                  <button
                    type="button"
                    className="profile-action-button danger"
                    onClick={deleteProfileHandler}
                    disabled={buttonLoading}
                  >
                    <Trans>Delete Profile</Trans>
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
