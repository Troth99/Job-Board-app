import { useState } from "react";
import { registerFormType } from "../../hooks/useAuth";
import { ProfileData } from "../EditProfile/EditProfile";


type FormDataUnion = Partial<registerFormType> & Partial<ProfileData>;

export function useValidation() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string): string | undefined => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return "Email is required.";
    if (!regex.test(email)) return "Please enter a valid email.";
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return undefined;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string | undefined => {
    if (!confirmPassword) return "Confirm password is required.";
    if (password !== confirmPassword) return "Confirm password do not match.";
    return undefined;
  };

  const validateFirstName = (firstName: string): string | undefined => {
    if (!firstName) return "First name is required.";
    if (!/^[A-Z]/.test(firstName))
      return "First name must start with a capital letter.";
    return undefined;
  };

  const validateLastName = (lastName: string): string | undefined => {
    if (!lastName) return "Last name is required.";
    if (!/^[A-Z]/.test(lastName))
      return "Last name must start with a capital letter.";
    return undefined;
  };

  const validatePhoneNumber = (phoneNumber: string): string | undefined => {
    const regex = /^[0-9]{10}$/;
    if (!phoneNumber) return "Phone number is required.";
    if (!regex.test(phoneNumber)) return "Phone number must be 10 digits.";
    return undefined;
  };

  const validateLocation = (location: string): string | undefined => {
    if (!location) return "Location is required.";
    if (location.length < 3) return "Location must be at least 3 characters.";
    return undefined;
  };

  const validateForm = (data: FormDataUnion) => {
    const newErrors: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(data)) {
      let error;
      switch (key) {
        case "firstName":
          error = validateFirstName(value as string);
          break;
        case "lastName":
          error = validateLastName(value as string);
          break;
        case "email":
          error = validateEmail(value as string);
          break;
        case "password":
          error = validatePassword(value as string);
          break;
        case "confirmPassword":
          error = validateConfirmPassword(data.password || "", value as string);
          break;
        case "phoneNumber":
          error = validatePhoneNumber(value as string);
          break;
        case "location":
          error = validateLocation(value as string);
          break;
        default:
          break;
      }
      if (error) newErrors[key] = error;
    }

    return newErrors;
  };

  return {
    errors,
    setErrors,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateForm,
  };
}
