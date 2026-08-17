import { useState } from "react";
import useCompanies from "../../hooks/useCompanyAPI";
import "../../styles/dashboard.css";
import { useNavigate, useParams } from "react-router";
import { CompanyJobsList } from "../../components/CompanyJobList/CompanyJobList";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import { CompanyMembers } from "../../components/InviteMemberToCompany/InviteMemberToCompany";
import { SendMessage } from "../../components/SendMessage/SendMessage";
import { getUserFromLocalStorage } from "../../../auth/hooks/useAuth";
import { useUserData } from "../../../../context/UseDataContext";
import { useRole } from "../../../../context/RoleContext";
import { MemberDashboardModals } from "../../components/DashboardSidebarUI/modals/Modals";
import { CalendarModal } from "../../components/DashboardComponents/CompanyCalendar/CalendarModal";
import { useCompanyMember } from "../../hooks/useCompanyMember";
import { CompanyMember } from "../../types/CompanyMember.model";
import { toast } from "react-toastify";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import useMembers from "../../hooks/useMembers";
import { MemberDashboardSideBar } from "../../components/DashboardSidebarUI/DashboardSidebarUI";
import { Trans, } from "@lingui/react/macro";


export default function Dashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const {
    loading: loadingRole,
   
    transferOwnership,
    abandonCompany
  } = useCompanies();

  const{ getCompanyMembers, kickMemberFromCompany } = useMembers();
  const [abandonModalOpen, setAbandonModalOpen] = useState<boolean>(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);


  const { members, localRole, loading, refresh, company } = useCompanyMember(companyId);

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  // Get current user data and role from context and local storage
  const user = getUserFromLocalStorage();
  const { setUserData, userData } = useUserData();
  const { setUserRole } = useRole();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [promoteOwnershipModalOpen, setPromoteOwnershipModalOpen] =
    useState<boolean>(false);
  const [refreshingAfterTransfer, setRefreshingAfterTransfer] =
    useState<boolean>(false);

  const seo = () => generateSeoConfig("companyDashboard");

  // Find the current user's membership in the company to determine their role and permissions
  const myMember = members.find((m: CompanyMember) => m.userId._id === user?._id);
  const myMemberId = myMember?._id;

  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
  };
  


  const handlePromoteOwnershipModalClose = async () => {
    setPromoteOwnershipModalOpen(false);
    setRefreshingAfterTransfer(true);
    try {
      await refresh();
    } catch (error) {
      console.error(
        "Error updating company members and role after ownership transfer:",
        error,
      );
    } finally {
      setRefreshingAfterTransfer(false);
    }
  };

  const handleAbandonCompany = async () => {
    if(!companyId) return;
    setSubmitting(true);
    setAbandonModalOpen(false);

    try {
      const abandonResponse = await abandonCompany(companyId);
      toast.success("Company abandoned successfully");
      if(userData) {
        setUserData({ ...userData, company: null });
      }

      if(user) {
        delete user.company;
        localStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/");
    } catch (error) {
      console.error("Error abandoning company:", error);
      toast.error("Failed to abandon company");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLeaveCompany = async () => {
    if (!companyId || !localRole) {
      return;
    }
    setSubmitting(true);
    try {
      const membersList = await getCompanyMembers(companyId);
      const myMember = membersList.find((m: CompanyMember) => m.userId._id === user?._id);
      const myMemberId = myMember?._id;
      if (!myMemberId) {
        console.error("Current user is not a member of the company");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 4000));
      await kickMemberFromCompany(companyId, myMemberId);

      // Update user data in context and local storage
      
      if (userData) {
        setUserData({ ...userData, company: null });
      }
      setUserRole(null);
      if (user) {
        delete user.company;
        localStorage.setItem("user", JSON.stringify(user));
      }
      setLeaveModalOpen(false);
      await refresh();
      navigate("/");
    } catch (error) {
      console.error("Error leaving company:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const canPostJob =
    localRole === "admin" || localRole === "owner" || localRole === "recruiter";

  if (loading || refreshingAfterTransfer ||!localRole) {
    return <Spinner overlay={true} />;
  }
  return (
    <>
     <MetaData seo={seo} />


      {success && (
        <div className="success-message">
          <span><Trans>Your message has been sent successfully!</Trans></span>
          <button className="success-close" onClick={() => setSuccess(false)}>
            ×
          </button>
        </div>
      )}
      <div className="dashboard">
        {/* Sidebar */}

        <MemberDashboardSideBar
          company={company}
          localRole={localRole || ""}
          companyId={companyId!}
          setPromoteOwnershipModalOpen={setPromoteOwnershipModalOpen}
          setAbandonModalOpen={setAbandonModalOpen}
          setLeaveModalOpen={setLeaveModalOpen}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          
        />

        {/* Main Content Area */}
        <div className="main-content">
          <div id="overview-section" className="dashboard-panel dashboard-overview">
            <p className="dashboard-kicker"><Trans>Operational overview</Trans></p>
            <h1 className="dashboard-title"><Trans>Company dashboard</Trans></h1>
            <p className="dashboard-subtitle">
              <Trans>Streamline team coordination, internal communication, and hiring execution from a single control panel.</Trans>
            </p>
          </div>

          {/* Members Section */}
          <section id="team-section" className="dashboard-panel dashboard-section">
            <div className="section-heading">
              <h2><Trans>Team tools</Trans></h2>
              <p><Trans>Invite members and send internal messages.</Trans></p>
            </div>
            <div className="content-header section-body">
              <CompanyMembers />
              <SendMessage onSuccess={() => setSuccess(true)} />
            </div>
          </section>

          <section id="jobs-section" className="dashboard-panel dashboard-section">
            <div className="section-heading">
              <h2><Trans>Jobs board control</Trans></h2>
              <p><Trans>Post new jobs and monitor recent openings for your company.</Trans></p>
            </div>


            {/* Jobs Section */}
            <div className="section-body">
              <CompanyJobsList
                companyId={companyId!}
                canPostJob={canPostJob}
                onPostJob={postJobHandlerNavigate}
                isReadOnly={localRole === "member"}
              />
            </div>
          </section>

          <section className="dashboard-panel dashboard-section dashboard-future-section">
            <div className="section-heading">
              <h2><Trans>Future modules</Trans></h2>
              <p><Trans>Add more options here as your company workflow grows.</Trans></p>
            </div>
            <div className="future-module-grid">
              <article className="future-module-card">
                <h3><Trans>Announcements</Trans></h3>
                <p><Trans>Share updates with all company members in one feed.</Trans></p>
              </article>
              <article className="future-module-card">
                <h3><Trans>Insights</Trans></h3>
                <p><Trans>Monitor hiring activity and member engagement trends.</Trans></   p>
              </article>
            </div>
          </section>
         

          {/*announcements section 
  
  <div className="content-header">
    <h3>Announcements</h3>
  </div>

  <div className="announcement-list">
    <div className="announcement-card">
 
    </div>
    </div>

  */}
        </div>
      </div>
      {/* Modals for abandoning/leaving company and promoting ownership */}
      <MemberDashboardModals
        abandonModalOpen={abandonModalOpen}
        setAbandonModalOpen={setAbandonModalOpen}
        leaveModalOpen={leaveModalOpen}
        setLeaveModalOpen={setLeaveModalOpen}
        handleLeaveCompany={handleLeaveCompany}
        isOwner={localRole === "owner"}
        submitting={submitting}
        promoteOwnershipModalOpen={promoteOwnershipModalOpen}
        setPromoteOwnershipModalOpen={setPromoteOwnershipModalOpen}
        handlePromoteOwnershipModalClose={handlePromoteOwnershipModalClose}
        companyMembers={members}
        transferOwnership={async (memberId: string) =>
          await transferOwnership(companyId!, memberId)
        }
        myMemberId={myMemberId || ""}
        handleAbandonCompany={handleAbandonCompany}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </>
  );
}
