import { useNavigate } from "react-router";
import { getAuthToken, logOut } from "../../services/auth/authService";
import "./Profile.css";
import "./Responsive.css";
import { setAuthenticated } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/userService";


export default function MyProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true)
  const [ userData, setUserData] = useState(null);

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
    const data = await getUserProfile()
    console.log(data)
  }


  useEffect(() => {
    getLoggedInUserData()
  }, [])

  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>
      <div className="profile-image">
        <img src="path/to/your/default-image.jpg" alt="Profile" />
        <button className="edit-image-button">Choose Image</button>
      </div>

      {/* Profile information section */}
      <div className="profile-info">
        <div>
          <strong>Name:</strong> Ivan Petrov
        </div>
        <div>
          <strong>Email:</strong> user@example.com
        </div>
        <div>
          <strong>Phone</strong> 45446546464
        </div>
        <div>
          <strong>Created at</strong> 252516
        </div>
      </div>

      {/* Edit profile button */}
      <div className="edit-profile-button-container">
        <button className="edit-profile-button">Edit Profile</button>
      </div>

      {/*-- Role change section (Freelancer or Company)*/}
      <div className="role-change">
        <h3>Role</h3>
        <p>Freelancer</p>
      </div>

      {/*-- Company registration section (if the user is a company) -->*/}
      <div className="company-registration">
        <h3>Company Registration</h3>
        <p>Status: Not Registered</p>
      </div>

      {/* <!-- Application history section (list of job applications) --> */}
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

      {/* <!-- Job application actions (buttons for CV download, adding cover letter, etc.) --> */}
      <div className="job-application-actions">
        <p>Download CV</p>
        <p>Add Cover Letter</p>
        <p>Track Application</p>
      </div>

      {/* <!-- Job posting section (for freelancer job posts or company registration) --> */}
      <div className="job-posting">
        <h3>
          Post a New Job as a Freelancer or Register Company to Hire Your Team
        </h3>

        {/* <!-- Job Title as button --> */}
        <div className="job-title-options">
          <button className="job-title-button">Post Freelance Job</button>
          <button className="job-title-button">Create Company</button>
        </div>

        {/*  <!-- Optional description or form can be here if needed --> */}
        <div className="job-description-info">
          <p>Click one of the options above to proceed.</p>
        </div>
        <div className="logout-container">
          <button className="logout-button" onClick={logOutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
}
