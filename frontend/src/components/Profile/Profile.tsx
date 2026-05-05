import "./Profile.css";
import "./Responsive.css";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import useUserProfile from "../../hooks/useProfile";
import { useNavigate } from "react-router";
import useCompany from "../../hooks/useCompany";
import { useRole } from "../../context/RoleContext";
import { useUserData } from "../../context/UseDataContext";
import { Container } from "../Container/Container";
import { RoleAndCompanySection } from "./RoleAndCompanySection/RoleAndCompanySection";
import JobPosting from "./JobPosting/JobPosting";
import ProfileContainer from "./ProfileContainer/ProfileContainer";

//To do better spiiner loading for userData roles

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

  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (!userData?.company) return;
    getCompanyById(userData.company);
  }, [userData?.company]);

  const registerCompanyNavigation = () => {
    navigate("/register/company");
  };

  const postJobNavigation = () => {
    navigate(`/company/${company?._id}/post-job`);
  };

  //refactor to use hasCompanyId instead of company for better loading state handling and to avoid showing "No company" when company data is still loading
  const hasCompanyId = Boolean(userData?.company);

  const isProfileReady =
    !userLoading &&
    !!userData;

  if (!isProfileReady || !userData) {
    return <Spinner overlay={true} />;
  }

  const completionChecks = [
    Boolean(userData.firstName),
    Boolean(userData.lastName),
    Boolean(userData.email),
    Boolean(userData.phoneNumber),
    Boolean(userData.location),
    Boolean(avatar),
  ];
  const totalCompletionFields = completionChecks.length;
  const completedFields = completionChecks.filter(Boolean).length;
  const completionPercentage = Math.round(
    (completedFields / totalCompletionFields) * 100,
  );

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
            hasCompanyId={hasCompanyId}
            completionPercentage={completionPercentage}
            completedFields={completedFields}
            totalCompletionFields={totalCompletionFields}
          />

          {userLoading ? (
            <div className="profile-side-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Spinner />
            </div>
          ) : (
            <RoleAndCompanySection
              userRole={userRole}
              company={company}
              companyLoading={companyLoading}
              hasCompanyId={hasCompanyId}
            />
          )}

          
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
                <strong>
                  {!hasCompanyId
                    ? "Not enabled"
                    : company
                      ? "Enabled"
                      : "Loading..."}
                </strong>
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
