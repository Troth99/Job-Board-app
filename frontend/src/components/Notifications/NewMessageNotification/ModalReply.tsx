interface ModalReplyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalReply({ isOpen, onClose }: ModalReplyProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-reply-size">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Reply to message</h2>
        <form className="modal-reply-form">
          <label htmlFor="reply-message">Replying to: troth1234@abv.bg</label>
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
