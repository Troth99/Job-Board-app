import { Link, useNavigate } from "react-router";
import "./Register.css";
import "./Responsive.css";
import { useState } from "react";
import useAuth, { registerFormType } from "../../../hooks/shared/useAuth";
import { useValidation } from "../../validators/useValidation";
import useForm from "../../../hooks/shared/useForm";
import { useLocalStorage } from "../../../hooks/shared/useLocalStorage";
import { Container } from "../../Container/Container";
import { LeftSideOfRegister } from "./RegisterElements/LeftSideOfRegister";

const intialValueRegister: registerFormType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  password: "",
  confirmPassword: "",
};

//to refractor stylign and form

export default function RegisterComponent() {
  const [user, setUser] = useLocalStorage("user", {
    _id: "",
    accessToken: "",
    refreshToken: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { validateConfirmPassword, validateForm } = useValidation();
  const { registerUser } = useAuth();

  const registerHandler = async (formValues: registerFormType) => {
    setLoading(true);

    const confirmPasswordError = validateConfirmPassword(
      formValues.password,
      formValues.confirmPassword,
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
        reset()
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

  const { values, register, formHandler, errors, setErrors, reset } =
    useForm<registerFormType>(
      registerHandler,
      intialValueRegister,
      validateForm,
    );

  return (
    <section className="register-shell">
      <Container>
        <div className="register-page">
          <aside className="register-brand-panel">
            <LeftSideOfRegister />
          </aside>

          <div className="register-card">
            <div className="register-card-inner">
              <div className="register-card-header">
                <span className="register-card-badge">JB</span>
                <h2>Create Account</h2>
              </div>

              <form className="register-form" onSubmit={formHandler}>
                <div className="register-field">
                  <label htmlFor="firstName">First name <span className="required-field-add">*</span></label>
                 
                  <div
                    className={`register-input-wrap ${
                      errors.firstName ? "input-error" : ""
                    }`}
                  >
                    <i className="fa-solid fa-user"></i>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                    
                      {...register("firstName")}
                    />
                  </div>
                  {errors.firstName && (
                    <div className="error-message">{errors.firstName}</div>
                  )}
                </div>

                <div className="register-field">
                  <label htmlFor="lastName">Last name <span className="required-field-add">*</span></label>
                  <div
                    className={`register-input-wrap ${
                      errors.lastName ? "input-error" : ""
                    }`}
                  >
                    <i className="fa-solid fa-user"></i>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                  
                      {...register("lastName")}
                    />
                  </div>
                  {errors.lastName && (
                    <div className="error-message">{errors.lastName}</div>
                  )}
                </div>

                <div className="register-field">
                  <label htmlFor="email">Email address <span className="required-field-add">*</span></label>
                  <div
                    className={`register-input-wrap ${
                      errors.email ? "input-error" : ""
                    }`}
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email address"
                    
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="register-field">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <div className="register-input-wrap">
                    <i className="fa-solid fa-phone"></i>
                    <input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Phone Number"
                      {...register("phoneNumber")}
                    />
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="location">City / Location</label>
                  <div className="register-input-wrap">
                    <i className="fa-solid fa-location-dot"></i>
                    <input
                      id="location"
                      type="text"
                      placeholder="City / Location"
                      {...register("location")}
                    />
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="password">Password <span className="required-field-add">*</span></label>
                  <div
                    className={`register-input-wrap ${
                      errors.password ? "input-error" : ""
                    }`}
                  >
                    <i className="fa-solid fa-lock"></i>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="register-field">
                  <label htmlFor="confirmPassword">Confirm Password <span className="required-field-add">*</span></label>
             
                  <div
                    className={`register-input-wrap ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                  >
                    <i className="fa-solid fa-lock"></i>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
               
                      {...register("confirmPassword")}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="register-submit-actions">
                  <button
                    type="submit"
                    className="btn-register-form"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="register-footer">
                <p>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
