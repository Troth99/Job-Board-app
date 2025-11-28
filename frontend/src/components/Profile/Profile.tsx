import "./Profile.css";
import "./Responsive.css";
import { useRef, useState, useEffect } from "react";

import { formatDate } from "../../utils/formData";
import defaultAvatar from "../../assets/personAvatar.jpg";
import Spinner from "../Spinner/Spinner";
import useUserProfile from "../../hooks/useProfile";
import { Link, useNavigate } from "react-router";
import useCompany from "../../hooks/useCompany";
import ImageUpload from "../../features/UploadProfileImage/UploadProfileImage";

interface ProfileProps {
  LogOutComponnent: React.ComponentType;
}
export default function MyProfile({ LogOutComponnent }: ProfileProps) {
  const {
    loading: userLoading,
    userData,
    avatar,
    handleFileChange,
  } = useUserProfile();

  const { loading: companyLoading, company, userRole } = useCompany();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const registerCompanyNavigation = () => {
    navigate("/register/company");
  };

  const postJobNavigation = () => {
    navigate(`/company/${company?._id}/post-job`);
  };

  if (userLoading || companyLoading) {
    return <Spinner overlay={true} />;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      {/* Profile image section */}
 <div className="profile-image">
  <img src={avatar || defaultAvatar} alt="Profile" />
  <ImageUpload onFileChange={handleFileChange} />
</div>
      {/* Profile info */}
      <div className="profile-info">
        <div>
          <strong>First name:</strong> {userData?.firstName}
        </div>
        <div>
          <strong>Last name:</strong> {userData?.lastName}
        </div>
        <div>
          <strong>Email:</strong> {userData?.email}
        </div>
        <div>
          <strong>Phone:</strong> {userData?.phoneNumber}
        </div>
        <div>
          <strong>Location:</strong> {userData?.location}
        </div>
        <div>
          <strong>Created at:</strong>{" "}
          {userData?.createdAt && formatDate(userData.createdAt)}
        </div>
      </div>

      {/* Edit profile button */}
      <div className="edit-profile-button-container">
        <Link to="/profile/setthings" className="edit-profile-button">
          User settings
        </Link>
      </div>

      {/* Role and company section */}
      <div className="role-change">
        <h3>Role:</h3>
        <p>
          {userRole
            ? `${userRole} of ${company?.name}`
            : "Not part of a company yet."}
        </p>
      </div>

      {/* Company registration */}
      <div className="company-registration">
        {company ? (
          <>
            <h3>{company.name}</h3>
            <p>Industry: {company.industry}</p>
            <p>Location: {company.location}</p>
            <button
              className="create-company-button"
              onClick={() => navigate(`/company/${company._id}/dashboard`)}
            >
              Go to Dashboard
            </button>
          </>
        ) : (
          <>
            <h3>Company Registration</h3>
            <p>Status: Not Registered</p>
          </>
        )}
      </div>

      {/* Job posting and application section */}
      <div className="job-posting">
        <h3>
          {company
            ? "You are part of a company. You can post your job offer."
            : "You must register a company before you post a job."}
        </h3>
        <div className="job-title-options">
          <button
            className="job-title-button"
            onClick={() => {
              if (company) {
                postJobNavigation();
              } else {
                registerCompanyNavigation();
              }
            }}
          >
            {company ? "Post a Job" : "Register Company"}
          </button>
        </div>

        <div className="job-description-info">
          <p>
            {company
              ? "Click 'Post a Job' to hire your team."
              : "Click 'Register Company' to hire your team."}
          </p>
        </div>
      </div>

      {/* Logout button */}
      <div className="logout-container">
        <LogOutComponnent />
      </div>

      {/* Hidden file input for uploading avatar */}
    </div>
  );
}
