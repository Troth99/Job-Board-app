import { Link, useNavigate } from "react-router";
import "./Register.css";
import "./Responsive.css";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  RegisterData,
  registerUser,
} from "../../../services/auth/authService";
import { useValidation } from "../../../hooks/useValidation";

export default function RegisterComponent() {
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
    const {  validateConfirmPassword  } = useValidation();


  const [formData, setFormData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    location: "",
  });

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerErrors({});

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword)
    
    if (confirmPasswordError) {
      setServerErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
      }));
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser(formData);

      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (err: any) {
      setServerErrors(err.fieldErrors || {});
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
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });

                  setServerErrors((prev) => ({ ...prev, firstName: "" }));
                }}
              />
              <div className="error-message">{serverErrors.firstName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });

                  setServerErrors((prev) => ({ ...prev, lastName: "" }));
                }}
              />
              <div className="error-message">{serverErrors.lastName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });

                  setServerErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              <div className="error-message">{serverErrors.email}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-phone"></i>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({ ...formData, phoneNumber: e.target.value });

                  setServerErrors((prev) => ({ ...prev, phoneNumber: "" }));
                }}
              />
              <div className="error-message">{serverErrors.phoneNumber}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-location-dot"></i>
              <input
                type="text"
                placeholder="City / Location"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });

                  setServerErrors((prev) => ({ ...prev, location: "" }));
                }}
              />
              <div className="error-message">{serverErrors.location}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="pwd"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });

                  setServerErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <button type="button" className="show-hide-btn" id="togglePwd">
                👁
              </button>
              <div className="error-message">{serverErrors.password}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPwd"
                  value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });

                  setServerErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
              />
              <div className="error-message">
                {serverErrors.confirmPassword}
              </div>
              <button
                type="button"
                className="show-hide-btn"
                id="toggleConfirmPwd"
              >
                👁
              </button>
             
            </div>

            <div className="checkbox-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the Terms & Conditions
              </label>
            </div>
            <button className="btn-register" type="submit">
              Register
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

//TO DO password validation matching and eye on the form
