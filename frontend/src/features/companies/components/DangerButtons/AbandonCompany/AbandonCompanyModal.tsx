
import { useState } from "react";
import "./AbandonCompany.css";
import { Trans } from "@lingui/react/macro";

interface AbandonCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isOwner: boolean;
}

export function AbandonCompanyModal({
  isOpen,
  onClose,
  onConfirm,
  isOwner,
}: AbandonCompanyModalProps) {

  const [inputValue, setInputValue] = useState("");
  const isAbandonEnabled = inputValue === "ABANDON";

  if (!isOpen) return null;

  return (
    <div className="abandon-modal-backdrop">
      <div className="abandon-modal">
        <button className="abandon-modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h3><Trans>Abandon company</Trans></h3>
        {isOwner ? (
          <>
            <p>
              <Trans>Are you sure you want to abandon the company? This action cannot
              be undone.</Trans>
            </p>
            <p>
             <Trans><span className="abandon-modal-warning">WARNING:</span> This action is irreversible and will result in the loss
              of all company data. Members and jobs associated with the company
              will be deleted.</Trans>
            </p>
            <p><Trans>Type <span className="abandon-modal-warning">ABANDON</span> in order to proceed:</Trans></p>
            <div className="input-abandon">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Type ABANDON to confirm"
              />
            </div>
            <button
              className="abandon-modal-btn-danger"
              onClick={onConfirm}
              disabled={!isAbandonEnabled}
            >
              <Trans>Yes, abandon</Trans>
            </button>
          </>
        ) : (
          <>
            <p>
              <Trans>Only the owner can abandon the company. You do not have permission
              to perform this action.</Trans>
            </p>
            <button className="abandon-modal-btn-secondary" onClick={onClose}>
              <Trans>OK</Trans>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
