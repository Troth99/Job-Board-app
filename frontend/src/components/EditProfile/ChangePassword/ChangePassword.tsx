import { useState } from "react";
import "./ChangePassword.css";
import { useChangePasswordValidation } from "../../validators/useChangePasswordValidation";
import { useNavigate } from "react-router";
import { showSuccess } from "../../../utils/toast";
import useUserProfile from "../../../hooks/useProfile";
import useForm from "../../../hooks/useForm";

export interface changePasswordForm extends Record<string, string> {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const initialForm: changePasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const { validate } = useChangePasswordValidation();
  const navigate = useNavigate();
  const { changePassword } = useUserProfile();

  const validateForm = (values: changePasswordForm) => validate(values);

  const onSubmit = async (values: changePasswordForm) => {
    setLoading(true);
    try {
      await changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      showSuccess("Password changed succsessfully!");
      navigate("/profile");
    } catch (error: any) {
      throw new Error(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const { register, formHandler, errors } = useForm<changePasswordForm>(onSubmit, initialForm, validateForm);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Change Password</h1>
      </div>

      <form className="profile-details" onSubmit={formHandler}>
        <div>
          <strong>Current Password:</strong>
          <input type="password" {...register("currentPassword")} />
          <div className="error-message">{errors.currentPassword}</div>
        </div>
        <div>
          <strong>New Password:</strong>
          <input type="password" {...register("newPassword")} />
          <div className="error-message">{errors.newPassword}</div>
        </div>
        <div>
          <strong>Confirm Password:</strong>
          <input type="password" {...register("confirmPassword")} />
          <div className="error-message">{errors.confirmPassword}</div>
        </div>

        <div className="edit-profile-button-container">
          <button
            type="submit"
            className="edit-profile-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Change password"}
          </button>
        </div>
      </form>
    </div>
  );
}
