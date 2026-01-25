import { useEffect, useState } from "react";
import "./ForgotPassword.css";
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";
import useAuth from "../../../hooks/useAuth";

const initialFormValue = {
  email: "",
};
export function ForgotPassowrd() {
  const [timer, setTimer] = useState<number>(0);
  const [success, setSuccess] = useState<string>("");
  const { validateForm } = useValidation();
  const { sendResetPasswordLink } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("resetTimer");
    if (saved) {
      const remaining = Math.floor((parseInt(saved) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimer(remaining);
      } else {
        localStorage.removeItem("resetTimer");
      }
    }
  }, []);

  //Dynamic timer reducer

  useEffect(() => {
    if (timer > 0) {
      let interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            localStorage.removeItem("resetTimer");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const resetLinkSendHandler = async (values: { email: string }) => {
    try {
      await sendResetPasswordLink(values.email);
      setSuccess("Reset link has been sent to your email.");
      setTimer(60);
      localStorage.setItem("resetTimer", (Date.now() + 60000).toString());
    } catch (error: any) {
      if (error.message === "User not found") {
        setErrors({ email: error.message });
      }
      console.error("Failed to send reset password email");
    }
  };

  const { values, register, formHandler, errors, setErrors } = useForm(
    resetLinkSendHandler,
    initialFormValue,
    validateForm,
  );

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot password</h2>
        <form className="forgot-password-form" onSubmit={formHandler}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Peter@yahoo.com"
            {...register("email")}
            required
          />
          {errors && <div className="error-message">{errors.email}</div>}
          <button type="submit" disabled={timer > 0}>
            {timer > 0
              ? `Request again after ${timer}c`
              : "Request reset link."}
          </button>
        </form>
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
}
