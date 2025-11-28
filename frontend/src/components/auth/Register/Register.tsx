import { data, Link, useNavigate } from "react-router";
import "./Register.css";
import "./Responsive.css";
import { useEffect, useState } from "react";
import {
  registerFormType,
  registerUser,
} from "../../../services/auth/authService";
import { useValidation } from "../../../utils/useValidation";

const intialValueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterComponent() {
  const [errors, setErrors] = useState<Partial<registerFormType>>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<registerFormType>(intialValueRegister);

  const navigate = useNavigate();
  const { validateConfirmPassword, validateForm } = useValidation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "confirmPassword") {
      error = validateConfirmPassword(form.password, form.confirmPassword);
    } else {
      const formErrors = validateForm(form);
      error = formErrors[name] || "";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const formErrors = validateForm(form);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setLoading(false);
      return;
    }

    const confirmPasswordError = validateConfirmPassword(
      form.password,
      form.confirmPassword
    );

    if (confirmPasswordError) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
      }));
      setLoading(false);
      return;
    }

    try {
      const user = await registerUser(form);

      if (user.accessToken) {
             const userData = {
          _id: user.user._id,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      }
    } catch (err: any) {
      if (err.message.includes("User already exists")) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="content">
          <Link to="/" className="logo">
            JB
          </Link>
          <h2>Create Account</h2>
          <form id="registerForm" onSubmit={registerHandler}>
            <div className="input-wrap">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                value={form.firstName}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.firstName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                value={form.lastName}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.lastName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="text"
                placeholder="Email address"
                name="email"
                value={form.email}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.email}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-phone"></i>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={form.phoneNumber}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.phoneNumber}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-location-dot"></i>
              <input
                type="text"
                placeholder="City / Location"
                name="location"
                value={form.location}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.location}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="pwd"
                name="password"
                value={form.password}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />

              <div className="error-message">{errors.password}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPwd"
                name="confirmPassword"
                value={form.confirmPassword}
                onBlur={handleBlur}
                onChange={handleInputChange}
              />
              <div className="error-message">{errors.confirmPassword}</div>
            </div>

            <div className="checkbox-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the Terms & Conditions
              </label>
            </div>
            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? "Submitting..." : "Register"}
            </button>
          </form>
          <div className="links">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
