export interface KickMemberConfirmationModalProps {
  isOpen: boolean;
  memberName: string;
  submitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}