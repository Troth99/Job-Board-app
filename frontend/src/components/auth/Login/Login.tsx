import { Link, useLocation, useNavigate } from "react-router";
import "./Login.css";
import "./Responsive.css";
import { useRef, useState } from "react";
import useAuth from "../../../hooks/common/useAuth";
import { useValidation } from "../../validators/useValidation";
import { useLocalStorage } from "../../../hooks/common/useLocalStorage";
import useForm from "../../../hooks/common/useForm";
import { Container } from "../../Container/Container";
import LoginSocialIcons from "./LoginElements/LoginSocialIcons";
import LeftSideLogin from "./LoginElements/LeftSideLogin";

export interface LoginFormType {
  email: string;
  password: string;
  [key: string]: string | undefined;
}

const initialFormValue = {
  email: "",
  password: "",
};

//And to refractor styling
//To make login with google and apple, we need to implement the backend first. So I will implement it later.

export default function LoginComponent({
  setUserId,
}: {
  setUserId: (id: string) => void;
}) {
  const [user, setUser] = useLocalStorage("user", {
    _id: "",
    accessToken: "",
    refreshToken: "",
  });
  const focusRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { validateForm } = useValidation();
  const { loginUser, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const from = location.state?.from || "/";

  const loginSubmitHandler = async (formValues: LoginFormType) => {
    setLoading(true);
    try {
      const user = await loginUser(formValues);

      setUser({
        _id: user.user._id,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });

      // trigger notification update context
      setUserId(user.user._id);

      //Temporally session storage to check if the user is commming from login page for the guard.
      sessionStorage.setItem("fromLogin", "true");
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrors({
        email: "Invalid email or password.",
        password: "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

    //To attach the button login with google and page with auth callback 

    
  const { values, register, formHandler, errors, setErrors } =
    useForm<LoginFormType>(loginSubmitHandler, initialFormValue, validateForm);

  return (
    <section className="login-shell">
      <Container>
        <div className="login-page">
          <aside className="login-brand-panel">
          <LeftSideLogin/>
          </aside>

          <div className="login-card">
            <div className="login-card-inner">
              <div className="login-card-header">
                <span className="login-card-badge">Welcome back</span>
                <h2>Sign in to your account</h2>
                <p>
                  Continue to your dashboard, saved jobs, and application
                  activity.
                </p>
              </div>
              <form className="login-form" onSubmit={formHandler}>
                <div className="login-field">
                  <label htmlFor="email">Email address</label>
                  <div
                    className={`login-input-wrap ${
                      errors.email ? "input-error" : ""
                    }`}
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      id="email"
                      ref={focusRef}
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="login-field">
                  <div className="login-field-row">
                    <label htmlFor="password">Password</label>
                    <Link
                      to="/auth/forgot-password"
                      className="login-inline-link"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div
                    className={`login-input-wrap ${
                      errors.password ? "input-error" : ""
                    }`}
                  >
                    <i className="fa-solid fa-lock"></i>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="login-submit-actions">
                  <button
                    type="submit"
                    className="btn-login-loginform"
                    disabled={loading || authLoading}
                  >
                    {loading || authLoading ? "Signing in..." : "Sign In"}
                  </button>
                  <LoginSocialIcons />
                </div>
              </form>
              <div className="login-footer">
                <p>
                  Don't have an account? <Link to="/register">Create one</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
