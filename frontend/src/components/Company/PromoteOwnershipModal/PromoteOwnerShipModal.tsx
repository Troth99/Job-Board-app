import { P } from "react-router/dist/development/instrumentation-iAqbU5Q4";

interface PromoteOwnershipModalProps {
    isOpen: boolean;
    onClose: () => void;
}

//Todo: implement the promote ownership modal, which will be opened when the owner clicks on the "Promote ownership" button in the member dashboard. The modal will allow the owner to select a member to promote to ownership and confirm the action.
export function PromoteOwnerShipModal( {isOpen, onClose} :PromoteOwnershipModalProps) {
    if (!isOpen) return null;

    console.log("Promote ownership modal opened");
    return (
       <h1>Promote Ownership Modal</h1>
    )
}