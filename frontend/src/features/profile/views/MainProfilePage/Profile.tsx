import "../../styles/profile.css"
import "../../styles/buttons.css"
import { useEffect, useState } from "react";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import useProfile from "../../hooks/useProfile";
import { useNavigate } from "react-router";
import { useRole } from "../../../../context/RoleContext";
import { useUserData } from "../../../../context/UseDataContext";
import useCompany from "../../../companies/hooks/useCompanyAPI";
import { Container } from "../../../../shared/components/Container/Container";
import { ProfileRightPanel } from "../../components/RoleAndCompanySection/ProfileRightPanel";
import JobPosting from "../../components/JobPosting/JobPosting";
import ProfileContainer from "../../components/ProfileDataContainer/ProfileContainer";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import useAvatar from "../../hooks/useAvatar";
import { ProfileProps } from "../../types/profileSectionTypes";
import { Trans } from "@lingui/react/macro";

export default function MyProfile({ LogOutComponnent }: ProfileProps) {
  const { loading: userLoading, isInitialized, userData } = useProfile();
  const { avatar, handleFileChange } = useAvatar();
 
  const { userRole } = useRole();
  const { loading: companyLoading, company, getCompanyById } = useCompany();
  const navigate = useNavigate();
  const { setUserData } = useUserData();
  const [isCompanyReady, setIsCompanyReady] = useState(false);

  // Determine the company ID based on the userData if its not populated yet, 
  // it will be undefined and the company section will not be displayed
const companyId = userData?.company;


  useEffect(() => {
   
    if (userData) {
      setUserData(userData);
    }
  }, [userData]);

  //orchestrates the company data fetching and sets the isCompanyReady state accordingly
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

  const seo = () => generateSeoConfig("profile");

  const isProfilePending = userLoading || !isInitialized;

  if (!userData && isProfilePending) {
    return <Spinner overlay={true} />;
  }

  if (!userData) {
    return (
      <>
        <MetaData seo={seo} />

        <Container maxwith="820px" padding="0 12px">
          <div className="profile-container">
            <div className="profile-activity-card">
              <h3><Trans>Unable to load profile</Trans></h3>
              <p><Trans>This account data could not be loaded right now.</Trans></p>
            </div>
          </div>
        </Container>
      </>
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
    <>
      <MetaData seo={seo} />

      {userLoading ||
      (!isInitialized && !userData) ||
      (!!userData && !isCompanyReady) ? (
        <Spinner overlay={true} />
      ) : (
        <Container maxwith="1520px" padding="0 12px">
          <div className="profile-container">
            <section className="profile-top-grid">
              <ProfileContainer
                userData={userData}
                avatar={avatar || userData.avatar || null}
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
                <h3><Trans>Recent account activity</Trans></h3>
                <ul>
                  <li>
                    <span><Trans>Profile completion</Trans></span>
                    <strong>{completionPercentage}% <Trans>complete</Trans></strong>
                  </li>
                  <li>
                    <span><Trans>Company access</Trans></span>
                    <strong>
                      {!hasCompanyId
                        ? <Trans>Not enabled</Trans>
                        : company
                          ? <Trans>Enabled</Trans>
                          : <Trans>Loading...</Trans>}
                    </strong>
                  </li>
                  <li>
                    <span><Trans>Role summary</Trans></span>
                    <strong>{userRole || <Trans>No company role</Trans>}</strong>
                  </li>
                </ul>
              </div>
            </section>

            <div className="logout-container">
              <LogOutComponnent />
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
