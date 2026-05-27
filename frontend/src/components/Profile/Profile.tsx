import "./Profile.css";
import "./Responsive.css";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import useUserProfile from "../../hooks/utils/useProfile";
import { useNavigate } from "react-router";
import useCompany from "../../hooks/utils/useCompany";
import { useRole } from "../../context/RoleContext";
import { useUserData } from "../../context/UseDataContext";
import { Container } from "../Container/Container";
import { ProfileRightPanel } from "./RoleAndCompanySection/ProfileRightPanel";
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
  const [isCompanyReady, setIsCompanyReady] = useState(false);
  const companyValue = userData?.company as
    | string
    | { _id?: string }
    | undefined;
  const companyId =
    typeof companyValue === "string" ? companyValue : companyValue?._id;

  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (!userData) {
      setIsCompanyReady(false);
      return;
    }

    if (!companyId) {
      setIsCompanyReady(true);
      return;
    }

    let isMounted = true;
    setIsCompanyReady(false);

    getCompanyById(companyId).finally(() => {
      if (isMounted) {
        setIsCompanyReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [companyId, userData]);

  const registerCompanyNavigation = () => {
    navigate("/register/company");
  };

  const postJobNavigation = () => {
    navigate(`/company/${company?._id}/post-job`);
  };

  const hasCompanyId = Boolean(companyId);

  if (userLoading || (!!userData && !isCompanyReady)) {
    return <Spinner overlay={true} />;
  }

  if (!userData) {
    return (
      <Container maxwith="820px" padding="0 12px">
        <div className="profile-container">
          <div className="profile-activity-card">
            <h3>Unable to load profile</h3>
            <p>This account data could not be loaded right now.</p>
          </div>
        </div>
      </Container>
    );
  }

  const completionChecks = [
    Boolean(userData.firstName),
    Boolean(userData.lastName),
    Boolean(userData.email),
    Boolean(userData.phoneNumber),
    Boolean(userData.location),
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
            completionPercentage={completionPercentage}
            completedFields={completedFields}
            totalCompletionFields={totalCompletionFields}
          />

          <ProfileRightPanel
            userRole={userRole}
            company={company}
            companyLoading={companyLoading}
            hasCompanyId={hasCompanyId}
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
