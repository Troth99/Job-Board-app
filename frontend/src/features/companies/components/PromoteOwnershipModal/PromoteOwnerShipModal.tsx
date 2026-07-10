import { useState } from "react";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import "./PromoteOwnerShipModal.css";

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
        <h2 className="promote-owner-modal__title">Promote Member to Owner</h2>
        <form className="promote-owner-modal__form" onSubmit={submitHandler}>
          <label
            htmlFor="promote-owner-select"
            className="promote-owner-modal__label"
          >
            Select member:
          </label>
          <select
            id="promote-owner-select"
            className="promote-owner-modal__select"
            value={selectedMemberId ?? ""}
            onChange={(e) => setSelectedMemberId(e.target.value)}
          >
            <option value="" disabled>
              Select a member
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
            {loading ? "Promoting..." : "Promote to Owner"}
          </button>
        </form>
      </div>
    </div>
  );
}
