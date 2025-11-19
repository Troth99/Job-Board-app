import { useState } from "react";
import "./ChangePassword.css";
import { useChangePasswordValidation } from "../../../hooks/useChangePasswordValidation";
import { changePassword } from "../../../services/userService";
import { useNavigate } from "react-router";
import { showSuccess } from "../../../utils/toast";

export interface changePasswordForm {
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
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<changePasswordForm>>({});
  const { validate } = useChangePasswordValidation();
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const trimValue = value.trim();

    setForm((prev) => ({
      ...prev,
      [name]: trimValue,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const changePasswordSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validation = validate(form);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setLoading(false);
      return;
    }


    try {
      await changePassword(form);
      showSuccess("Password changed succsessfully!");
      navigate("/profile");
    } catch (error: any) {
      setErrors({ currentPassword: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Change Password</h1>
      </div>

      <form className="profile-details" onSubmit={changePasswordSubmitHandler}>
        <div>
          <strong>Current Password:</strong>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.currentPassword}</div>
        </div>
        <div>
          <strong>New Password:</strong>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={onChangeHandler}
          />
          <div className="error-message">{errors.newPassword}</div>
        </div>
        <div>
          <strong>Confirm Password:</strong>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChangeHandler}
          />
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
