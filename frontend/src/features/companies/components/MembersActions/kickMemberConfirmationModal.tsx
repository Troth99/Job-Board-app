import { Trans } from "@lingui/react/macro";
import "../DangerButtons/LeaveCompany/LeaveCompany.css";
import { KickMemberConfirmationModalProps } from "../../types/kickMemberFromCompany.model";

export function KickMemberConfirmationModal({
  isOpen,
  memberName,
  submitting,
  onClose,
  onConfirm,
}: KickMemberConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="abandon-modal-backdrop">
      <div className="abandon-modal">
        <button className="abandon-modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h3 className="abandon-modal-title">
          <Trans>Remove Member</Trans>
        </h3>
        <div className="abandon-modal-subtitle">
          <Trans>
            Are you sure you want to remove {memberName} from the company?
          </Trans>
        </div>
        <div className="abandon-modal-btns-row">
          <button
            className="abandon-modal-btn-danger"
            onClick={onConfirm}
            disabled={submitting}
          >
            {submitting ? (
              <Trans>Removing...</Trans>
            ) : (
              <Trans>Yes, remove</Trans>
            )}
          </button>
          <button
            className="abandon-modal-btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            <Trans>Cancel</Trans>
          </button>
        </div>
      </div>
    </div>
  );
}
