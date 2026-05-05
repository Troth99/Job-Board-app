import { formatDate } from "../../../utils/formData";
import defaultAvatar from "../../../assets/personAvatar.jpg";
import ImageUpload from "../../../features/UploadProfileImage/UploadProfileImage";
import { Link } from "react-router";

interface ProfileContainerProps {
  userData: any;
  avatar: string | null;
  handleFileChange: (file: File) => void;
  userRole: string | null | undefined;
  company: any;
  hasCompanyId: boolean;
  completionPercentage: number;
  completedFields: number;
  totalCompletionFields: number;
}

export default function ProfileContainer({
  userData,
  avatar,
  handleFileChange,
  userRole,
  company,
  hasCompanyId,
  completionPercentage,
  completedFields,
  totalCompletionFields,
}: ProfileContainerProps) {
  const companyStatusLabel = !hasCompanyId
    ? "No company"
    : company
      ? "In company"
      : "Loading company...";

  return (
    <div className="profile-main-card">
      <div className="profile-identity-block">
        <div className="profile-image">
          <img src={avatar || defaultAvatar} alt="Profile" />
          <ImageUpload onFileChange={handleFileChange} />
        </div>

        <div className="profile-headline">
          <h1>
            {userData?.firstName} {userData?.lastName}
          </h1>
          <p>{userData?.email}</p>

          <div className="profile-tags">
            <span className="profile-tag">{userRole || "Job seeker"}</span>
            <span className="profile-tag">{companyStatusLabel}</span>
            <span className="profile-tag">
              Joined: {userData?.createdAt ? formatDate(userData.createdAt) : "-"}
            </span>
          </div>

          <div className="completion-mini-row">
            <span>{completedFields} of {totalCompletionFields} sections complete</span>
            <strong>{completionPercentage}%</strong>
          </div>
          <div className="completion-track">
            <div className="completion-fill" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
      </div>

      <div className="profile-info-grid">
        <div>
          <span>First name</span>
          <strong>{userData?.firstName || "-"}</strong>
        </div>
        <div>
          <span>Last name</span>
          <strong>{userData?.lastName || "-"}</strong>
        </div>
        <div>
          <span>Email</span>
          <strong>{userData?.email || "-"}</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>{userData?.phoneNumber || "-"}</strong>
        </div>
        <div>
          <span>Location</span>
          <strong>{userData?.location || "-"}</strong>
        </div>
        <div>
          <span>Created at</span>
          <strong>{userData?.createdAt ? formatDate(userData.createdAt) : "-"}</strong>
        </div>
      </div>

      <div className="edit-profile-button-container">
        <Link to="/profile/setthings" className="edit-profile-button">
          User settings
        </Link>
      </div>
    </div>
  );
}