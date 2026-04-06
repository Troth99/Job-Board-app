import { useEffect, useState } from "react";
import "./MemberDashboard.css";
import "./Responsive.css";
import { Link, useNavigate, useParams } from "react-router";
import useCompany from "../../../hooks/useCompany";
import { CompanyJobsList } from "../CompanyJobList/CompanyJobList";
import Spinner from "../../Spinner/Spinner";
import { CompanyMembers } from "../CompanyMembers/CompanyMembers";
import { SendMessage } from "../SendMessage/SendMessage";
import { getUserFromLocalStorage } from "../../../hooks/useAuth";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import { useUserData } from "../../../context/UseDataContext";
import { useRole } from "../../../context/RoleContext";
import { MemberDashboardModals } from "./Modals";

export default function MemberDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const {
    company,
    getCompanyById,
    getUserRole,
    loading: loadingRole,
    getCompanyMembers,
    kickMemberFromCompany,
    transferOwnership,
  } = useCompany();
  const [localRole, setLocalRole] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [members, setMembers] = useState<CompanyMember[]>([]);

  const [abandonModalOpen, setAbandonModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  //TODO: move the modals to a different component later, but for now it's easier to keep them here since they are closely related to the member dashboard and need access to its state and functions.

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
  const myMember = members.find((m) => m.userId._id === user?._id);
  const myMemberId = myMember?._id;

  //
  const handlePromoteOwnershipModalClose = async () => {
    setPromoteOwnershipModalOpen(false);
    setRefreshingAfterTransfer(true);
    try {
      if (!companyId) return;
      const updatedMembers = await getCompanyMembers(companyId);
      const updatedRole = await getUserRole(companyId);
      setMembers(updatedMembers);
      setLocalRole(updatedRole);
    } catch (error) {
      console.error(
        "Error updating company members and role after ownership transfer:",
        error,
      );
    } finally {
      setRefreshingAfterTransfer(false);
    }
  };
  useEffect(() => {
    if (!companyId) return;
    getCompanyById(companyId);
    getUserRole(companyId).then(setLocalRole);
  }, [companyId]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!companyId) return;
      const membersResult = await getCompanyMembers(companyId);
      setMembers(membersResult);
    };
    fetchMembers();
  }, [companyId]);
  const postJobHandlerNavigate = () => {
    navigate(`/company/${companyId}/post-job`);
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

    const members = await getCompanyMembers(companyId);
    const myMember = members.find(
      (m: CompanyMember) => m.userId._id === user?._id,
    );
    const myMemberId = myMember?._id;
    if (!myMemberId) {
      console.error("Current user is not a member of the company");
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      await kickMemberFromCompany(companyId, myMemberId);

      // Update user data in context and local storage
      if (userData) {
        setUserData({ ...userData, company: null });
      }

      // Update role in context
      setUserRole(null);

      // Update localStorage
      if (user) {
        delete user.company;
        localStorage.setItem("user", JSON.stringify(user));
      }
      setLeaveModalOpen(false);
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
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>
              Welcome to <span className="company-name">{company?.name}</span>{" "}
              dashboard.
            </h2>
            <p className="user-role">Role: {localRole}</p>
          </div>
          <div className="sidebar-nav">
            <div className="job-card-dashboard-image">
              <img
                src={
                  company?.logo && company.logo.trim().startsWith("http")
                    ? company.logo
                    : "/assets/defaultCompany.png"
                }
                alt={
                  company?.logo && company.logo.trim() !== ""
                    ? company.name
                    : "Default Company Logo"
                }
                className="company-logo"
              />
            </div>
            <ul>
              <li>
                <Link to={`/company/${companyId}/members`}>Members</Link>
              </li>

              {localRole === "owner" && (
                <li>
                  <button
                    className="promote-ownership-btn"
                    onClick={() => setPromoteOwnershipModalOpen(true)}
                  >
                    Promote ownership
                  </button>
                </li>
              )}
              {/* Here can be added more menu items */}
            </ul>
            <div className="sidebar-danger-actions">
              <button
                className="sidebar-btn-danger"
                onClick={() => setAbandonModalOpen(true)}
              >
                Abandon company
              </button>

              <button
                className="sidebar-btn-danger"
                onClick={() => setLeaveModalOpen(true)}
              >
                Leave company
              </button>
            </div>
          </div>
        </div>

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
