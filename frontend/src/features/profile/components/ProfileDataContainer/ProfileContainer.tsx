import { formatDate } from "../../../../shared/utils/formData";
import defaultAvatar from "../../../../assets/personAvatar.jpg";
import ImageUpload from "../UploadProfileImage/UploadProfileImage";
import { Link } from "react-router";
import { ProfileContainerProps } from "../../types/profileSectionTypes";
import { profilePaths } from "../../routes/profilePaths";
import { Trans } from "@lingui/react/macro";
import { LoadingIndicator } from "../../../../shared/components/LoadingIndicator/LoadingIndicator";

export default function ProfileContainer({
  userData,
  avatar,
  handleFileChange,
  completionPercentage,
  completedFields,
  totalCompletionFields,
  isUploading,
}: ProfileContainerProps) {
  return (
    <div className="profile-main-card">
      <div className="profile-identity-block">
        <div className="profile-image">
          <img
            src={avatar || userData?.avatar || defaultAvatar}
            alt="Profile"
          />
          {isUploading && (
            <div className="avatar-spinner-overlay">
              <LoadingIndicator size="small" message="" />
            </div>
          )}

          <ImageUpload onFileChange={handleFileChange} />
        </div>

        <div className="profile-headline">
          <h1>
            {userData?.firstName} {userData?.lastName}
          </h1>
          <p>{userData?.email}</p>

          <div className="profile-tags">
            <span className="profile-tag">
              <Trans>Joined:</Trans>{" "}
              {userData?.createdAt ? formatDate(userData.createdAt) : "-"}
            </span>
          </div>

          <div className="completion-mini-row">
            <span>
              {completedFields} <Trans>of</Trans> {totalCompletionFields}{" "}
              <Trans>sections complete</Trans>
            </span>
            <strong>{completionPercentage}%</strong>
          </div>
          <div className="completion-track">
            <div
              className="completion-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="profile-info-grid">
        <div>
          <span>
            <Trans>First name</Trans>
          </span>
          <strong>{userData?.firstName || "-"}</strong>
        </div>
        <div>
          <span>
            <Trans>Last name</Trans>
          </span>
          <strong>{userData?.lastName || "-"}</strong>
        </div>
        <div>
          <span>
            <Trans>Email</Trans>
          </span>
          <strong>{userData?.email || "-"}</strong>
        </div>
        <div>
          <span>
            <Trans>Phone</Trans>
          </span>
          <strong>{userData?.phoneNumber || "-"}</strong>
        </div>
        <div>
          <span>
            <Trans>Location</Trans>
          </span>
          <strong>{userData?.location || "-"}</strong>
        </div>
        <div>
          <span>
            <Trans>Created at</Trans>
          </span>
          <strong>
            {userData?.createdAt ? formatDate(userData.createdAt) : "-"}
          </strong>
        </div>
      </div>

      <div className="edit-profile-button-container">
        <Link to={profilePaths.settings} className="edit-profile-button">
          <Trans>User settings</Trans>
        </Link>
      </div>
    </div>
  );
}
