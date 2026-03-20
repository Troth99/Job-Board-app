import "./SendMessage.css";

import { useState } from "react";

export function SendMessage() {
  const [open, setOpen] = useState<Boolean>(false);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {


    //To do service with backend to send messages
  };
  return (
    <>
      <button className="add-button" onClick={() => setOpen(true)}>
        Send message
      </button>

      {open && (
        <div className="send-message-modal-overlay-unique">
          <div className="send-message-modal-unique">
            <button
              className="send-message-modal-close-unique"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <h3 className="send-message-title-unique">Send Message</h3>
            <form className="send-message-form-unique" onSubmit={handleSend}>
              <input
                className="send-message-input-unique"
                type="text"
                placeholder="Email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
              <textarea
                className="send-message-textarea-unique"
                placeholder="Your message."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit" className="send-message-submit-btn-unique">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
