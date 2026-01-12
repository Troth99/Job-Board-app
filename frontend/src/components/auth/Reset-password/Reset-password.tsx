import useForm from "../../../hooks/useForm";
import { useValidation } from "../../validators/useValidation";
import "./resetPassword.css";

const initialValues = {
  password: "",
  confirmPassword: "",
};
export default function ResetPassword() {
  const { validateForm } = useValidation();

  const resetPasswordHandler = () => {
    //to do reset password handler service 
    
  };

  const { values, register, formHandler, errors } = useForm(
    resetPasswordHandler,
    initialValues,
    validateForm
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
