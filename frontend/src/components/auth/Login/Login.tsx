import { Link, useLocation, useNavigate } from "react-router";
import "./Login.css";
import "./Responsive.css";
import { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useValidation } from "../../validators/useValidation";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import useForm from "../../../hooks/useForm";
import { Container } from "../../Container/Container";
import LoginSocialIcons from "./LoginSocialIcons";

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

  const { values, register, formHandler, errors, setErrors } =
    useForm<LoginFormType>(loginSubmitHandler, initialFormValue, validateForm);

  return (
    <section className="login-shell">
      <Container>
        <div className="login-page">
          <aside className="login-brand-panel">
            <Link to="/" className="login-back-btn">
              <i className="fa-solid fa-arrow-left"></i>
              Back to home
            </Link>
            <Link to="/" className="login-brand-logo">
              JB
            </Link>

            <div className="login-brand-copy">
              <span className="login-eyebrow">Job Board Platform</span>
              <h1>Find your next role faster.</h1>
              <p>
                Sign in to manage your profile, track applications, and explore
                opportunities from trusted companies.
              </p>
            </div>

            <div className="login-brand-points">
              <div className="login-point">
                <span className="login-point-icon">
                  <i className="fa-solid fa-briefcase"></i>
                </span>
                <div>
                  <h3>Curated opportunities</h3>
                  <p>Browse jobs from companies actively hiring.</p>
                </div>
              </div>

              <div className="login-point">
                <span className="login-point-icon">
                  <i className="fa-solid fa-filter"></i>
                </span>
                <div>
                  <h3>Smart filtering</h3>
                  <p>
                    Reach the right positions faster with clear search tools.
                  </p>
                </div>
              </div>

              <div className="login-point">
                <span className="login-point-icon">
                  <i className="fa-solid fa-bolt"></i>
                </span>
                <div>
                  <h3>Faster workflow</h3>
                  <p>
                    Keep your saved jobs, notifications, and profile in one
                    place.
                  </p>
                </div>
              </div>
            </div>
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

                <button
                  type="submit"
                  className="btn-login-loginform"
                  disabled={loading || authLoading}
                >
                  {loading || authLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>
                  <LoginSocialIcons />
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
