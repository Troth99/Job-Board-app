import { CompanyMember } from "../../../interfaces/CompanyMember.model";
import "./PromoteOwnerShipModal.css"

interface PromoteOwnershipModalProps {
    isOpen: boolean;
    onClose: () => void;
    companyMembers: CompanyMember[]
}

//Todo: implement the promote ownership modal, which will be opened when the owner clicks on the "Promote ownership" button in the member dashboard. The modal will allow the owner to select a member to promote to ownership and confirm the action.
export function PromoteOwnerShipModal( {isOpen, onClose, companyMembers} :PromoteOwnershipModalProps) {
    if (!isOpen) return null;

    console.log(companyMembers);
    return (
      <div id="promote-owner-modal" className="promote-owner-modal__backdrop">
  <div className="promote-owner-modal__container">
    <button className="promote-owner-modal__close" aria-label="Close" onClick={onClose}>×</button>
    <h2 className="promote-owner-modal__title">Promote Member to Owner</h2>
    <form className="promote-owner-modal__form">
      <label htmlFor="promote-owner-select" className="promote-owner-modal__label">
        Select member:
      </label>
      <select id="promote-owner-select" className="promote-owner-modal__select">
        <option value="" disabled selected>Select a member</option>
        {companyMembers.filter(member => member.role !== "owner").map((member) =>  (
          <option key={member._id} value={member._id}>
            {member.userId.email} ({member.role})
          </option>
        ))}
      </select>
      <button type="submit" className="promote-owner-modal__submit">Promote</button>
    </form>
  </div>
</div>
    )
}