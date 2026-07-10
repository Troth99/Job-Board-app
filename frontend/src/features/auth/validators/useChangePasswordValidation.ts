import { useState } from "react";

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useChangePasswordValidation() {
  const [errors, setErrors] = useState<Partial<ChangePasswordForm>>({});

  const validate = (form: ChangePasswordForm) => {
    const newErrors: Partial<ChangePasswordForm> = {};

   
    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }


    if (!form.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters.";
    } else if (form.newPassword === form.currentPassword) {
      newErrors.newPassword = "New password must be different from current password.";
    }


    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (form.confirmPassword !== form.newPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  return { errors, setErrors, validate };
}
