import { useState } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { useNavigate, useParams } from "react-router";
import useCompany from "../../../hooks/utils/useCompany";
import { CompanyJobsList } from "../CompanyJobList/CompanyJobList";
import Spinner from "../../Spinner/Spinner";
import { CompanyMembers } from "../InviteMemberToCompany/InviteMemberToCompany";
import { SendMessage } from "../SendMessage/SendMessage";
import { getUserFromLocalStorage } from "../../../hooks/shared/useAuth";
import { useUserData } from "../../../context/UseDataContext";
import { useRole } from "../../../context/RoleContext";
import { MemberDashboardModals } from "./Modals";
import { MemberDashboardSideBar } from "./MemberSidebar";
import { useCompanyMember } from "../../../hooks/utils/useCompanyMember";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import { toast } from "react-toastify";
import { generateSeoConfig } from "../../../seo/seo";
import { Helmet } from "react-helmet-async";

export default function MemberDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const {
    loading: loadingRole,
    getCompanyMembers,
    kickMemberFromCompany,
    transferOwnership,
    abandonCompany
  } = useCompany();

  const [abandonModalOpen, setAbandonModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { members, localRole, loading, refresh, company } = useCompanyMember(companyId);

  // Get current user data and role from context and local storage
  const user = getUserFromLocalStorage();
  const { setUserData, userData } = useUserData();
  const { setUserRole } = useRole();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [promoteOwnershipModalOpen, setPromoteOwnershipModalOpen] =
    useState<boolean>(false);
  const [refreshingAfterTransfer, setRefreshingAfterTransfer] =
    useState<boolean>(false);

    const seo = generateSeoConfig("companyDashboard");
    
  // Find the current user's membership in the company to determine their role and permissions
  const myMember = members.find((m: CompanyMember) => m.userId._id === user?._id);
  const myMemberId = myMember?._id;

  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
  };
  //
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
    <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
    </Helmet>
      {success && (
        <div className="success-message">
          <span>Your message has been sent successfully!</span>
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
        />

        {/* Main Content Area */}
        <div className="main-content">
          <div id="overview-section" className="dashboard-panel dashboard-overview">
            <p className="dashboard-kicker">Member workspace</p>
            <h1 className="dashboard-title">Company member dashboard</h1>
            <p className="dashboard-subtitle">
              Manage your team, communication, and open positions from one place.
            </p>
          </div>

          {/* Members Section */}
          <section id="team-section" className="dashboard-panel dashboard-section">
            <div className="section-heading">
              <h2>Team tools</h2>
              <p>Invite members and send internal messages.</p>
            </div>
            <div className="content-header section-body">
              <CompanyMembers />
              <SendMessage onSuccess={() => setSuccess(true)} />
            </div>
          </section>

          <section id="jobs-section" className="dashboard-panel dashboard-section">
            <div className="section-heading">
              <h2>Jobs board control</h2>
              <p>Post new jobs and monitor recent openings for your company.</p>
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
              <h2>Future modules</h2>
              <p>Add more options here as your company workflow grows.</p>
            </div>
            <div className="future-module-grid">
              <article className="future-module-card">
                <h3>Announcements</h3>
                <p>Share updates with all company members in one feed.</p>
              </article>
              <article className="future-module-card">
                <h3>Calendar</h3>
                <p>Track interviews, deadlines, and team milestones.</p>
              </article>
              <article className="future-module-card">
                <h3>Insights</h3>
                <p>Monitor hiring activity and member engagement trends.</p>
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
    </>
  );
}
