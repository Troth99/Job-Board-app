import { data, Link, useNavigate } from "react-router";
import "./Register.css";
import "./Responsive.css";
import { useEffect, useState } from "react";
import { FieldErrors, registerUser } from "../../../services/auth/authService";
import { useValidation } from "../../../hooks/useValidation";

export default function RegisterComponent() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { validateConfirmPassword } = useValidation();

  const registerHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(event.target as HTMLFormElement);

  
    const password = (formData.get("password") as string).trim();

    const confirmPassword = (formData.get("confirmPassword") as string).trim();

    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
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
      const res = await registerUser(formData);

      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (err: any) {
      console.log('failed to register', err.message)
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
              <input type="text" placeholder="First name" name="firstName" />
              <div className="error-message">{errors.firstName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-user"></i>
              <input type="text" placeholder="Last name" name="lastName" />
              <div className="error-message">{errors.lastName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" placeholder="Email address" name="email" />
              <div className="error-message">{errors.email}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-phone"></i>
              <input type="tel" placeholder="Phone Number" name="phoneNumber" />
              <div className="error-message">{errors.phoneNumber}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-location-dot"></i>
              <input type="text" placeholder="City / Location" name="location" />
              <div className="error-message">{errors.location}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="pwd"
                name="password"
              />
              <button type="button" className="show-hide-btn" id="togglePwd">
                👁
              </button>
              <div className="error-message">{errors.password}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPwd"
                name="confirmPassword"
              />
              <div className="error-message">{errors.confirmPassword}</div>
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
