interface ModalReplyProps {
  isOpen: boolean;
  onClose: () => void;
  replyToUserEmail?: string;
}

export function ModalReply({ isOpen, onClose , replyToUserEmail }: ModalReplyProps) {
  if (!isOpen) return null;


    // Handler for form submission (currently just prevents default behavior)


    //to make the form functional, you would typically add state to manage the reply message and then handle the submission logic to send the reply to the server or update the UI accordingly.
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    }

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-reply-size">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Reply to message</h2>
        <form className="modal-reply-form">
          <label htmlFor="reply-message" className="reply-message-modal-label">Replying to: <span>{replyToUserEmail}</span></label>
          <textarea
            id="reply-message"
            name="reply-message"
            className="modal-reply-textarea"
            rows={15}
            placeholder="Type your reply here..."
          ></textarea>
          <button type="submit" className="modal-reply-send">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
