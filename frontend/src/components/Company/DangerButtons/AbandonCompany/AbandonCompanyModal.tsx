import "./AbandonCompany.css";

interface AbandonCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isOwner: boolean;
}


export function AbandonCompanyModal({ isOpen, onClose, onConfirm, isOwner }: AbandonCompanyModalProps) {
if(!isOpen) return null;


    return (
    <div className="abandon-modal-backdrop">
      <div className="abandon-modal">
        <button className="abandon-modal-close-btn" onClick={onClose}>×</button>
        <h3>Abandon company</h3>
        {isOwner ? (
          <>
            <p>Are you sure you want to abandon the company? This action cannot be undone.</p>
            <button className="abandon-modal-btn-danger" onClick={onConfirm}>
              Yes, abandon
            </button>
          </>
        ) : (
          <>
            <p>Only the owner can abandon the company. You do not have permission to perform this action.</p>
            <button className="abandon-modal-btn-secondary" onClick={onClose}>OK</button>
          </>
        )}
      </div>
    </div>
    )
}