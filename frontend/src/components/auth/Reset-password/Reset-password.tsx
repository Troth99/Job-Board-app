import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";
import "./resetPassword.css";
import { useState } from "react";

const initialValues = {
  password: "",
  confirmPassword: "",
};
export default function ResetPassword() {
  const { validateForm } = useValidation();
  const { resetPassword } = useAuth();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [success, setSuccess] = useState<string | null>(null);

  const resetPasswordHandler = async () => {
    console.log("resetPasswordHandler called");
    setLoading(true);
    setSuccess(null);
    const passowrd = values.password;
    try {
      if (!token) {
        throw new Error("Token is missing!");
      }
      const message = await resetPassword(token, passowrd);
   
      setSuccess(message || "Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setError(error.message || "Something went wrong with reseting password.");
    } finally {
      setLoading(false);
    }
  };

  const { values, register, formHandler, errors } = useForm(
    resetPasswordHandler,
    initialValues,
    validateForm,
  );
  return (
    <div className="reset-password-container">
      <div className="logo">JB</div>
      <h2>Reset Your Password</h2>
      <form onSubmit={formHandler}>
        <div className="reset-password-field">
          <input
            type="password"
            placeholder="New password"
            {...register("password")}
            required
          />
          <div className="error">{errors.password}</div>
        </div>
        <div className="reset-password-field">
          <input
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
            required
          />
          <div className="error">{errors.confirmPassword}</div>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
