import { Link, useNavigate } from "react-router";
import "./Profile.css";
import "./Responsive.css";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
  uploadUserProfileImage,
} from "../../services/userService";
import { formatDate } from "../../utils/formData";
import defaultAvatar from "../../assets/personAvatar.jpg";
import Spinner from "../Spinner/Spinner";
import { getMyCompany, getUserRole } from "../../services/companyService";
import { RegisterCompanyInterface } from "../Company/RegisterCompany/RegisterCompany";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
  createdAt?: string;
}
interface ProfileProps {
  LogOutComponnent: React.ComponentType
}
export default function MyProfile(
  {LogOutComponnent}: ProfileProps
) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [error, setError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [company, setCompany] = useState<RegisterCompanyInterface>();
  const [userHasCompany, setUserHasCompany] = useState(false);
  const [userRole, setUserRole] = useState<string>("");

  
  const getLoggedInUserData = async () => {
    try {
      const data = await getUserProfile();

      if (data) {
        setUserData(data);
        setAvatar(data.avatar || defaultAvatar);
        return data;
      }
    } catch (error) {
      setError("Failed to fetch user data");
      console.error(error);
    } finally {
    }
  };

  const handleFileChange = async (file: File) => {
    try {
      const imageUrl = await uploadUserProfileImage(file);
      setAvatar(imageUrl);

      await updateUserProfile({ avatar: imageUrl });
    } catch (err: any) {
      console.error("Image upload failed:", err.message);
      alert("Failed to upload image");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [user, myCompany] = await Promise.all([
          getLoggedInUserData(),
          getMyCompany(),
        ]);

        setUserData(user);
        setCompany(myCompany);
        setUserHasCompany(Boolean(myCompany));

        if (myCompany?._id) {
          const userRole = await getUserRole(myCompany._id);

          const role = userRole[0]?.role;

          if (role) {
            const formatted = role.charAt(0).toUpperCase() + role.slice(1);
            setUserRole(formatted);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const registerCompanyNavigation = () => {
    navigate("/register/company");
  };

  const postJobNavigation = () => {
    navigate(`/company/${company?._id}/post-job`);
  };
  return (
    <>
      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <h1>My Profile</h1>
          </div>
          <div className="profile-image">
            <img src={avatar || defaultAvatar} alt="Profile" />
            <button
              className="edit-image-button"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Image
            </button>
          </div>

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

          <div className="edit-profile-button-container">
            <Link to="/profile/setthings" className="edit-profile-button">
              User settings
            </Link>
          </div>

          <div className="role-change">
            <h3>Role:</h3>

            <p>
              {" "}
              {userRole
                ? `${userRole} of ${company?.name}`
                : "Not part of a company yet."}
            </p>
          </div>

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
          <div className="application-history">
            <h3>Application History</h3>
            <div className="application-card">
              <p>Frontend Developer at Google</p>
              <span>Status: Interview</span>
            </div>
            <div className="application-card">
              <p>Backend Developer at Amazon</p>
              <span>Status: Awaiting Response</span>
            </div>
          </div>

          <div className="job-application-actions">
            <p>Download CV</p>
            <p>Add Cover Letter</p>
            <p>Track Application</p>
          </div>

          <div className="job-posting">
            <h3>
              {userHasCompany
                ? "You are part of a company. You can post your job offer."
                : "You must register a company before you post a job."}
            </h3>

            <div className="job-title-options">
              <button
                className="job-title-button"
                onClick={() => {
                  if (userHasCompany) {
                    postJobNavigation();
                  } else {
                    registerCompanyNavigation();
                  }
                }}
              >
                {userHasCompany ? "Post a Job" : "Register Company"}
              </button>
            </div>

            <div className="job-description-info">
              <p>
                {userHasCompany
                  ? "Click 'Post a Job' to hire your team."
                  : "Click 'Register Company' to hire your team."}
              </p>
            </div>

            <div className="logout-container">
             <LogOutComponnent />
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              handleFileChange(file);
            }}
          />
        </div>
      )}
</>
  );
}
