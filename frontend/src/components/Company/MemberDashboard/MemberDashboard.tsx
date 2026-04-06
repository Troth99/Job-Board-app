// Handler for navigating to post job page

import { useState } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { useNavigate, useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import { CompanyJobsList } from "../CompanyJobList/CompanyJobList";
import Spinner from "../../Spinner/Spinner";
import { CompanyMembers } from "../CompanyMembers/CompanyMembers";
import { SendMessage } from "../SendMessage/SendMessage";
import { getUserFromLocalStorage } from "../../../hooks/useAuth";
import { useUserData } from "../../../context/UseDataContext";
import { useRole } from "../../../context/RoleContext";
import { MemberDashboardModals } from "./Modals";
import { MemberDashboardSideBar } from "./MemberSidebar";
import { useCompanyMember } from "../../../hooks/useCompanyMember";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";

export default function MemberDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const {
    company,
    loading: loadingRole,
    getCompanyMembers,
    kickMemberFromCompany,
    transferOwnership,
  } = useCompany();

  const [abandonModalOpen, setAbandonModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { members, localRole, loading, refresh } = useCompanyMember(companyId);

  // Get current user data and role from context and local storage
  const user = getUserFromLocalStorage();
  const { setUserData, userData } = useUserData();
  const { setUserRole } = useRole();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [promoteOwnershipModalOpen, setPromoteOwnershipModalOpen] =
    useState<boolean>(false);
  const [refreshingAfterTransfer, setRefreshingAfterTransfer] =
    useState<boolean>(false);
    
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

  //TODO: implement the actual abandon company logic, this is just a placeholder for now
  const handleAbandonCompany = () => {
    // Here you would typically call an API to abandon the company
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

  if (loadingRole || refreshingAfterTransfer) {
    return <Spinner overlay={true} />;
  }
  return (
    <>
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
          {/* Members Section */}
          <div className="content-header">
            <CompanyMembers />
            <SendMessage onSuccess={() => setSuccess(true)} />
          </div>

          {/* Jobs Section */}
          <CompanyJobsList
            companyId={companyId!}
            canPostJob={canPostJob}
            onPostJob={postJobHandlerNavigate}
          />

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
      />
    </>
  );
}
