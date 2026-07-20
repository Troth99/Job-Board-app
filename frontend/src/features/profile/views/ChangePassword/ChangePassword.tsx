import { useState } from "react";
import "./ChangePassword.css";
import { useChangePasswordValidation } from "../../../auth/validators/useChangePasswordValidation";
import { useNavigate } from "react-router";
import { showSuccess } from "../../../../shared/utils/toast";
import useProfile from "../../hooks/useProfile";
import useForm from "../../../../shared/hooks/useForm";
import { changePasswordForm } from "../../types/profileSectionTypes";
import { Container } from "../../../../shared/components/Container/Container";
import { profilePaths } from "../../routes/profilePaths";


const initialForm: changePasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

//Change password functionallity
export default function ChangePassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { validate } = useChangePasswordValidation();
  const navigate = useNavigate();
  const { changePassword } = useProfile();

  const validateForm = (values: changePasswordForm) => validate(values);

  const onSubmit = async (values: changePasswordForm) => {
    setLoading(true);
    setSubmitError(null);
    try {
      await changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      showSuccess("Password changed succsessfully!");
      navigate(profilePaths.root);
    } catch (error: any) {

      //backend error for incorrect current password is handled here and displayed to the user
      const message = error.message || "Failed to change password";
      setSubmitError(message);
      setErrors((prev) => ({
        ...prev,
        currentPassword:
          message === "Incorrect current password."
            ? message
            : prev.currentPassword,
      }));
      return;
    } finally {
      setLoading(false);
    }
  };

  const { register, formHandler, errors, setErrors } = useForm<changePasswordForm>(onSubmit, initialForm, validateForm);

  return (
    <Container maxwith="980px" padding="0 12px">
      <div className="cp-page">
        <section className="cp-shell">
          <div className="cp-header">
            <span className="cp-eyebrow">Security</span>
            <h1>Change Password</h1>
            <p>
              Update your account password to keep your profile secure.
            </p>
          </div>

          <form className="cp-form" onSubmit={formHandler}>
            {submitError && !errors.currentPassword ? (
              <div className="cp-form-error" role="alert">{submitError}</div>
            ) : null}

            <label className="cp-field">
              <span>Current password</span>
              <input type="password" {...register("currentPassword")} />
              <div className="cp-error">{errors.currentPassword}</div>
            </label>

            <label className="cp-field">
              <span>New password</span>
              <input type="password" {...register("newPassword")} />
              <div className="cp-error">{errors.newPassword}</div>
            </label>

            <label className="cp-field">
              <span>Confirm password</span>
              <input type="password" {...register("confirmPassword")} />
              <div className="cp-error">{errors.confirmPassword}</div>
            </label>

            <div className="cp-actions">
              <button
                type="button"
                className="cp-secondary-button"
                onClick={() => navigate(profilePaths.settings)}
                disabled={loading}
              >
                Back to settings
              </button>
              <button
                type="submit"
                className="cp-primary-button"
                disabled={loading}
              >
                {loading ? "Saving..." : "Change password"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </Container>
  );
}
