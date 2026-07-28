import { useState } from "react";
import "./PromoteOwnerShipModal.css";
import { CompanyMember } from "../../types/CompanyMember.model";
import { Trans } from "@lingui/react/macro";

interface PromoteOwnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPromoteSuccess: () => void;
  companyMembers: CompanyMember[];
  transferOwnership: (memberId: string) => Promise<void>;
  myMemberId?: string;
}

export function PromoteOwnerShipModal({
  isOpen,
  onClose,
  onPromoteSuccess,
  companyMembers,
  myMemberId,
  transferOwnership,
}: PromoteOwnershipModalProps) {
  if (!isOpen) return null;

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedMemberId) {
        setLoading(true);
        await transferOwnership(selectedMemberId);
        onPromoteSuccess();
      }
    } catch (error) {
      console.error("Failed to promote member to owner", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="promote-owner-modal" className="promote-owner-modal__backdrop">
      <div className="promote-owner-modal__container">
        <button
          className="promote-owner-modal__close"
          aria-label="Close promote ownership modal"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="promote-owner-modal__title"><Trans>Promote Member to Owner</Trans></h2>
        <form className="promote-owner-modal__form" onSubmit={submitHandler}>
          <label
            htmlFor="promote-owner-select"
            className="promote-owner-modal__label"
          >
              <Trans>Select member:</Trans>
          </label>
          <select
            id="promote-owner-select"
            className="promote-owner-modal__select"
            value={selectedMemberId ?? ""}
            onChange={(e) => setSelectedMemberId(e.target.value)}
          >
            <option value="" disabled>
              <Trans>Select a member</Trans>
            </option>
            {companyMembers
              .filter((member) => member.role !== "owner")
              .map((member) => (
                <option key={member._id} value={member._id}>
                  {member.userId.email} ({member.role})
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="promote-owner-modal__submit"
            disabled={!selectedMemberId || loading}
          >
            {loading ? <Trans>Promoting...</Trans> : <Trans>Promote to Owner</Trans>}
          </button>
        </form>
      </div>
    </div>
  );
}
