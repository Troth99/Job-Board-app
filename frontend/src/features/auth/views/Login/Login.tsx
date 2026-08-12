import { Link, useLocation, useNavigate } from "react-router";
import "./Login.css";
import "./Responsive.css";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";

import { useLocalStorage } from "../../../../shared/hooks/useLocalStorage";
import useForm from "../../../../shared/hooks/useForm";
import { Container } from "../../../../shared/components/Container/Container";
import { useValidation } from "../../validators/useValidation";
import LoginAside from "../../components/login-UI/LoginAside";
import LoginSocialIcons from "../../components/login-UI/LoginSocialIcons";
import { LoginFormType } from "../../types/loginFormType";
import { Trans, useLingui } from "@lingui/react/macro";

const initialFormValue = {
  email: "",
  password: "",
};


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

  const {t} = useLingui();
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

    
  const {  register, formHandler, errors, setErrors } =
    useForm<LoginFormType>(loginSubmitHandler, initialFormValue, validateForm);

  return (
    <section className="login-shell">
      <Container>
        <div className="login-page">
          <aside className="login-brand-panel">
          <LoginAside/>
          </aside>

          <div className="login-card">
            <div className="login-card-inner">
              <div className="login-card-header">
                <span className="login-card-badge">
                  <Trans>Welcome back</Trans>
                </span>
                <h2>
                  <Trans>Sign in to your account</Trans>
                </h2>
                <p>
                  <Trans>
                    Continue to your dashboard, saved jobs, and application
                    activity.
                  </Trans>
                </p>
              </div>
              <form className="login-form" onSubmit={formHandler}>
                <div className="login-field">
                  <label htmlFor="email">
                    <Trans>Email address</Trans>
                  </label>
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
                      placeholder={t`Enter your email address`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="login-field">
                  <div className="login-field-row">
                    <label htmlFor="password">
                      <Trans>Password</Trans>
                    </label>
                    <Link
                      to="/auth/forgot-password"
                      className="login-inline-link"
                    >
                      <Trans>Forgot password?</Trans>
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
                      placeholder={t`Enter your password`}
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
                    {loading || authLoading ? <Trans>Signing in...</Trans> : <Trans>Sign In</Trans>}
                  </button>
                  <LoginSocialIcons />
                </div>
              </form>
              <div className="login-footer">
                <p>
                  <Trans>
                    Don't have an account? <Link to="/register">Create one</Link>
                  </Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
