import { Link, useNavigate } from "react-router";
import { getAuthToken, logOut } from "../../services/auth/authService";
import "./Profile.css";
import "./Responsive.css";
import { setAuthenticated } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUserProfile, updateUserProfile, uploadUserProfileImage } from "../../services/userService";
import {formatDate} from "../../utils/formData"
import defaultAvatar from "../../assets/personAvatar.jpg"
import spinner from "../../components/Spinner/Spinner"
import Spinner from "../../components/Spinner/Spinner";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
  createdAt?: string;
}

export default function MyProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true)
  const [ userData, setUserData] = useState<User | null>(null);
  const [ avatar, setAvatar] = useState<string>(defaultAvatar)
    const [error, setError] = useState<string>(); 
    const fileInputRef = useRef<HTMLInputElement>(null);



  const logOutHandler = async () => {
    try {
      const success = await logOut();
  
      if (success) {
       dispatch(setAuthenticated(false));

        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error: any) {
      console.log('failed to log out', error.message)
      alert("An error occurred while logging out.", );
    }
  };
  const getLoggedInUserData = async () => {

    try {
      const data = await getUserProfile()
      
      if(data){
        setUserData(data)
        setAvatar(data.avatar || defaultAvatar);
        return data
      }

    } catch (error) {
      setError("Failed to fetch user data"); 
      console.error(error);
    }finally {
      setLoading(false)
    }
  }

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
    getLoggedInUserData()
  }, [])

  
  return (
       <div className="profile-body" style={{ position: "relative" }}>
   
      {loading && <Spinner overlay={true} />}

  
      <div style={{ display: loading ? "none" : "block" }}>
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
            <Link to="/profile/setthings" className="edit-profile-button" >
          Edit Profile
        </Link>
          </div>

          <div className="role-change">
            <h3>Role</h3>
            <p>Freelancer</p>
          </div>

          <div className="company-registration">
            <h3>Company Registration</h3>
            <p>Status: Not Registered</p>
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
              Post a New Job as a Freelancer or Register Company to Hire Your
              Team
            </h3>
            <div className="job-title-options">
              <button className="job-title-button">Post Freelance Job</button>
              <button className="job-title-button">Create Company</button>
            </div>
            <div className="job-description-info">
              <p>Click one of the options above to proceed.</p>
            </div>
            <div className="logout-container">
              <button className="logout-button" onClick={logOutHandler}>
                Logout
              </button>
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
      </div>
    </div>
  );
 
}
