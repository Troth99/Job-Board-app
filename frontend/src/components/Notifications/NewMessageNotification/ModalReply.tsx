import { use, useState } from "react";
import { useMessageValidation } from "../../validators/useMessageValidation";
import { useNotification } from "../../../hooks/useNotification";

interface ModalReplyProps {
  isOpen: boolean;
  onClose: () => void;
  replyToUserEmail?: string;
}

export function ModalReply({
  isOpen,
  onClose,
  replyToUserEmail,
}: ModalReplyProps) {
  if (!isOpen) return null;

  const [message, setMessage] = useState<string>("");
  const {createNotification} = useNotification();
  const {error, validateMessage, setError} =useMessageValidation()

  //to make the form functional, you would typically add state to manage the reply message and then handle the submission logic to send the reply to the server or update the UI accordingly.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!validateMessage(message)) {
      return;
    }

    try {
      await createNotification({
        email: replyToUserEmail,
        message: message,
        type: "message",
      })
      setMessage("")
      setError(null);
      onClose();
    } catch (error) {
      console.error("Error sending reply message.", error);
    }



    console.log("Reply submitted");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-reply-size">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Reply to message</h2>
        <form className="modal-reply-form" onSubmit={handleSubmit}>
          <label htmlFor="reply-message" className="reply-message-modal-label">
            Replying to: <span>{replyToUserEmail}</span>
          </label>
          <textarea
            id="reply-message"
            name="reply-message"
            className="modal-reply-textarea"
            rows={15}
            placeholder="Type your reply here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
           <div className="error-message">{error}</div>
          <button type="submit" className="modal-reply-send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
