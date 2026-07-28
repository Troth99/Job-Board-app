import { Trans } from "@lingui/react/macro";
import "./LeaveCompany.css";
interface LeaveCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isOwner: boolean;
  submitting: boolean;
}


export function LeaveCompanyModal({ onClose, isOwner, isOpen, onConfirm, submitting }: LeaveCompanyModalProps) {

  if (!isOpen) return null;

  return (
    <div className="abandon-modal-backdrop">
      <div className="abandon-modal">
        <button className="abandon-modal-close-btn" onClick={onClose}>×</button>
        <div className="abandon-modal-icon-wrapper">
          {/* Warning SVG icon */}
          <svg className="abandon-modal-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b30000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1.2" fill="#b30000"/><path d="M12 8v4" stroke="#b30000"/></svg>
        </div>
        <h3 className="abandon-modal-title"><Trans>Leave Company</Trans></h3>
        {!isOwner ? (
          <>
            <div className="abandon-modal-subtitle"><Trans>Are you sure you want to leave the company?</Trans></div>
            <p><Trans>This action is irreversible and you will lose access to company resources.</Trans></p>
            <div className="abandon-modal-btns-row">
              <button className="abandon-modal-btn-danger" onClick={onConfirm} disabled={submitting}>
                {submitting ? <Trans>Leaving...</Trans> : <Trans>Yes, leave</Trans>}
              </button>
              <button className="abandon-modal-btn-secondary" onClick={onClose}>
                <Trans>Cancel</Trans>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="abandon-modal-subtitle"><Trans>You are the owner of the company</Trans></div>
            <p><Trans>You cannot leave the company until you transfer ownership to another member.</Trans></p>
            <div className="abandon-modal-btns-row">
              <button className="abandon-modal-btn-secondary" onClick={onClose}><Trans>OK</Trans></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
