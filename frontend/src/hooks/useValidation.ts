import { useState } from "react";

export function useValidation() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

const validateEmail = (email: string): string | undefined => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return "Email is required.";
  }
  if (!regex.test(email)) {
    return "Please enter a valid email.";
  }
  return undefined;
};
  const validatePassword = (password: string): string  | undefined => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
       return undefined
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined=> {

  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return undefined
};
  
  return {
    errors,
    setErrors, 
    validateEmail,
    validatePassword,
    validateConfirmPassword

  };
}
