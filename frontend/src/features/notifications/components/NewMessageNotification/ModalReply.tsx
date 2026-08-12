import { useState } from "react";
import { useMessageValidation } from "../../../../shared/validators/useMessageValidation";
import useNotifications from "../../hooks/useNotifications";
import { getUserFromLocalStorage } from "../../../auth/hooks/useAuth";
import { Trans, useLingui } from "@lingui/react/macro";

interface ModalReplyProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  replyToUserEmail?: string;
}

export function ModalReply({
  isOpen,
  onClose,
  replyToUserEmail,
  onSuccess,
}: ModalReplyProps) {
  if (!isOpen) return null;

  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const {createNotification} = useNotifications();
  const {error, validateMessage, setError} =useMessageValidation();

  const currentUserId = getUserFromLocalStorage()._id

  const {t} = useLingui();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMessage(message)) {
      return;
    }

    setIsSending(true);
    //back end service for sending the reply message - you would replace this with your actual API call
    try {
      await createNotification({
        email: replyToUserEmail,
        message: message,
        type: "message",
        sender: currentUserId
      });
    
      //onSucess callback to notify the component that the message was sent.
      if(onSuccess) {
        onSuccess();
      }

      setMessage("");
      setError(null);
      onClose();
    } catch (error) {
      console.error("Error sending reply message.", error);
    } finally {
      setIsSending(false);
    }
    console.log("Reply submitted");
  };

  return (
    <div className="reply-modal-overlay" onClick={onClose}>
      <div
        className="reply-modal-content modal-reply-size"
        onClick={e => e.stopPropagation()}
      >
        <button className="reply-modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h2><Trans>Reply to message</Trans></h2>
        <form className="modal-reply-form" onSubmit={handleSubmit}>
          <label htmlFor="reply-message" className="reply-message-modal-label">
            <Trans>Replying to:</Trans> <span>{replyToUserEmail}</span>
          </label>
          <textarea
            id="reply-message"
            name="reply-message"
            className="modal-reply-textarea"
            rows={15}
            placeholder={t`Type your reply here...`}
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
           <div className="error-message">{error}</div>
          <button type="submit" className="modal-reply-send" disabled={isSending}>
            {isSending ? t`Sending...` : t`Send`}
          </button>
        </form>
      </div>
    </div>
  );
}
