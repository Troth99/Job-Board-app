import { AbandonCompanyModal } from "../DangerButtons/AbandonCompany/AbandonCompanyModal";
import { LeaveCompanyModal } from "../DangerButtons/LeaveCompany/LeaveCompanyModal";
import { PromoteOwnerShipModal } from "../PromoteOwnershipModal/PromoteOwnerShipModal";

type ModalsProps = {
  abandonModalOpen: boolean;
  setAbandonModalOpen: (open: boolean) => void;
  leaveModalOpen: boolean;
  setLeaveModalOpen: (open: boolean) => void;
  handleLeaveCompany: () => void;
  handleAbandonCompany: () => void;
  isOwner: boolean;
  submitting: boolean;
  promoteOwnershipModalOpen: boolean;
  setPromoteOwnershipModalOpen: (open: boolean) => void;
  handlePromoteOwnershipModalClose: () => void;
  companyMembers: any[];
  transferOwnership: (memberId: string) => void;
  myMemberId: string;
};

export function MemberDashboardModals(props: ModalsProps) {
  return (
    <>
      <AbandonCompanyModal
        isOpen={props.abandonModalOpen}
        onClose={() => props.setAbandonModalOpen(false)}
        onConfirm={props.handleAbandonCompany}
        isOwner={props.isOwner}
      />

      <LeaveCompanyModal
        isOpen={props.leaveModalOpen}
        onClose={() => props.setLeaveModalOpen(false)}
        onConfirm={props.handleLeaveCompany}
        isOwner={props.isOwner}
        submitting={props.submitting}
      />

      <PromoteOwnerShipModal
        isOpen={props.promoteOwnershipModalOpen}
        onClose={() => props.setPromoteOwnershipModalOpen(false)}
        onPromoteSuccess={props.handlePromoteOwnershipModalClose}
        companyMembers={props.companyMembers}
        transferOwnership={async (memberId: string) => {
          props.transferOwnership(memberId);
        }}
        myMemberId={props.myMemberId}
      />
    </>
  );
}
