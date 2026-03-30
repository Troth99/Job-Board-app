import useCompany from "../../../hooks/useCompany";
import { useNotification } from "../../../hooks/useNotification";
import { useValidation } from "../../validators/useValidation";
import "./SendMessage.css";

import { useState } from "react";

export function SendMessage({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState<Boolean>(false);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const { createNotification } = useNotification();
  const { validateEmail } = useValidation();
  const [errors, setErrors] = useState<{ email?: string }>({});
  const { checkUser } = useCompany();
  const [isSending, setIsSending] = useState(false);

  const emailError = validateEmail(recipient);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    try {
      setIsSending(true);

      const userCheck = await checkUser(recipient);
      if (!userCheck || userCheck.message === "User does not exist") {
        setErrors({ email: "User with this email was not found." });
        return;
      }

      // Call the notification service to send the message
   
      await createNotification({
        email: recipient,
        message: message,
        type: "message",
      });
      // If the message was sent successfully, call the onSuccess callback and close the modal
      if (onSuccess) {
        onSuccess();
      }

      //  Reset form and close modal
      setOpen(false);
      setRecipient("");
      setMessage("");
    } catch (error: any) {

      // Handle errors from the notification service

      if (error?.response?.data?.error === "User not found") {
        setErrors({ email: "User with this email was not found." });
      } else {
        setErrors({ email: "Error sending message." });
      }
      console.error("Error sending message.", error);
    } finally {
      setIsSending(false);
    }
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
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setErrors({ email: "" });
                }}
                required
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
              <textarea
                className="send-message-textarea-unique"
                placeholder="Your message."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                className="modal-reply-send"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
