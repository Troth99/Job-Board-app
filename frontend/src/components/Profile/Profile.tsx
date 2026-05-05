import "./Profile.css";
import "./Responsive.css";
import { useEffect } from "react";
import { formatDate } from "../../utils/formData";
import defaultAvatar from "../../assets/personAvatar.jpg";
import Spinner from "../Spinner/Spinner";
import useUserProfile from "../../hooks/useProfile";
import { Link, useNavigate } from "react-router";
import useCompany from "../../hooks/useCompany";
import ImageUpload from "../../features/UploadProfileImage/UploadProfileImage";
import { useRole } from "../../context/RoleContext";
import { useUserData } from "../../context/UseDataContext";
import { LoadingIndicator } from "../../LoadingIndicator/LoadingIndicator";
import { Container } from "../Container/Container";
import { RoleAndCompanySection } from "./RoleAndCompanySection/RoleAndCompanySection";
import JobPosting from "./JobPosting/JobPosting";
import ProfileContainer from "./ProfileContainer/ProfileContainer";

//To refractor styling and add edit profile page and company registration page.
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
  const { userRole } = useRole();
  const { loading: companyLoading, company, getCompanyById } = useCompany();
  const navigate = useNavigate();
  const { setUserData } = useUserData();

  // Fetch company data on mount
  useEffect(() => {
    if (!userData || !userData.company) return;
    if (userData) {
      setUserData(userData);
    }
    if (userData?.company) {
      getCompanyById(userData.company);
    }
  }, [userData?.company]);

  const registerCompanyNavigation = () => {
    navigate("/register/company");
  };

  const postJobNavigation = () => {
    navigate(`/company/${company?._id}/post-job`);
  };

  if (userLoading || !userData) {
    return <Spinner overlay={true} />;
  }

  const completionPercentage = 0; // Placeholder for actual completion logic
  return (
    <Container maxwith="1520px" padding="0 12px">
      <div className="profile-container">
        <section className="profile-top-grid">
          <ProfileContainer
            userData={userData}
            avatar={avatar}
            handleFileChange={handleFileChange}
            userRole={userRole}
            company={company}
            completionPercentage={0}
            completedFields={0}
          />

          <RoleAndCompanySection
            userRole={userRole}
            company={company}
            companyLoading={companyLoading}
          />
        </section>

        <section className="profile-bottom-grid">
          <JobPosting
            company={company}
            postJobNavigation={postJobNavigation}
            registerCompanyNavigation={registerCompanyNavigation}
          />

          <div className="profile-activity-card">
            <h3>Recent account activity</h3>
            <ul>
              <li>
                <span>Profile completion</span>
                <strong>{completionPercentage}% complete</strong>
              </li>
              <li>
                <span>Company access</span>
                <strong>{company ? "Enabled" : "Not enabled"}</strong>
              </li>
              <li>
                <span>Role summary</span>
                <strong>{userRole || "No company role"}</strong>
              </li>
            </ul>
          </div>
        </section>

        <div className="logout-container">
          <LogOutComponnent />
        </div>
      </div>
    </Container>
  );
}
