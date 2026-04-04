import { useState } from "react";
import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import "./PromoteOwnerShipModal.css";

interface PromoteOwnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyMembers: CompanyMember[];
  changeMemberRole: (memberId: string, newRole: string) => Promise<void>;
}

//Todo: implement the promote ownership modal, which will be opened when the owner clicks on the "Promote ownership" button in the member dashboard. The modal will allow the owner to select a member to promote to ownership and confirm the action.
export function PromoteOwnerShipModal({
  isOpen,
  onClose,
  companyMembers,
  changeMemberRole,
}: PromoteOwnershipModalProps) {
  if (!isOpen) return null;

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (selectedMemberId) {
        setLoading(true);
        await changeMemberRole(selectedMemberId, "owner");
      }
    } catch (error) {
      console.error("Failed to promote member to owner", error);
    } finally {
      setLoading(false);
    }
    onClose();
  };
  return (
    <div id="promote-owner-modal" className="promote-owner-modal__backdrop">
      <div className="promote-owner-modal__container">
        <button
          className="promote-owner-modal__close"
          aria-label="Close"
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
            disabled={!selectedMemberId}
          >
            {loading ? "Promoting..." : "Promote to Owner"}
          </button>
        </form>
      </div>
    </div>
  );
}
