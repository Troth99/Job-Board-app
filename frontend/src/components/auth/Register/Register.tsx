import {  Link, useNavigate } from "react-router";
import "./Register.css";
import "./Responsive.css";
import { useState } from "react";
import useAuth, { registerFormType } from "../../../hooks/useAuth";
import { useValidation } from "../../validators/useValidation";
import useForm from "../../../hooks/useForm";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const intialValueRegister: registerFormType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  password: "",
  confirmPassword: "",
};


export default function RegisterComponent() {
const [user, setUser] = useLocalStorage('user', { _id: '', accessToken: '', refreshToken: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { validateConfirmPassword, validateForm } = useValidation();
  const { registerUser } = useAuth();

  const registerHandler = async (formValues: registerFormType) => {
    setLoading(true);

    const confirmPasswordError = validateConfirmPassword(
      formValues.password,
      formValues.confirmPassword
    );

    if (confirmPasswordError) {
     
      setLoading(false);
      return;
    }

    try {
      const user = await registerUser(formValues);

      if (user.accessToken) {
         setUser({
          _id: user.user._id,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        });
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

  const { values, register, formHandler, errors, setErrors } = useForm<registerFormType>(
    registerHandler,
    intialValueRegister,
    validateForm
  );


  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="content">
          <Link to="/" className="logo">
            JB
          </Link>
          <h2>Create Account</h2>
          <form id="registerForm" onSubmit={formHandler}>
            <div className="input-wrap">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="First name"
                {...register("firstName")}
              />
              <div className="error-message">{errors.firstName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName")}
              />
              <div className="error-message">{errors.lastName}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="text"
                placeholder="Email address"
                {...register("email")}
              />
              <div className="error-message">{errors.email}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-phone"></i>
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNumber")}
              />
              <div className="error-message">{errors.phoneNumber}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-location-dot"></i>
              <input
                type="text"
                placeholder="City / Location"
                {...register("location")}
              />
              <div className="error-message">{errors.location}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="pwd"
                {...register("password")}
              />

              <div className="error-message">{errors.password}</div>
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPwd"
                {...register("confirmPassword")}
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
