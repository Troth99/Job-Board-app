import { Link, useLocation, useNavigate } from "react-router";
import "./Login.css";
import "./Responsive.css";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useValidation } from "../../validators/useValidation";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import useForm from "../../../hooks/useForm";

export interface LoginFormType {
  email: string;
  password: string;
  [key: string]: string | undefined;
}

const initialFormValue = {
  email: "",
  password: "",
};

export default function LoginComponent() {
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

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  const loginSubmitHandler = async (formValues: LoginFormType) => {
    setLoading(true);
    try {
      const user = await loginUser(formValues);

      setUser({
        _id: user.user._id,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
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
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-content">
          <Link to="/" className="logo">
            JB
          </Link>
          <h2>Login to Your Account</h2>
          <form id="loginForm" onSubmit={formHandler}>
            <div
              className={`login-input-wrap ${
                errors.email ? "input-error" : ""
              }`}
            >
              <i className="fa-solid fa-envelope"></i>
              <input
                ref={focusRef}
                placeholder="Email address"
                {...register("email")}
              />
              {errors && <div className="error-message">{errors.email}</div>}
            </div>
            <div
              className={`login-input-wrap ${
                errors.password ? "input-error" : ""
              }`}
            >
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors && <div className="error-message">{errors.password}</div>}
            </div>
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="social-login">
            <button className="btn-google">
              <i className="fa-brands fa-google"></i> Login with Google
            </button>
            <button className="btn-apple">
              <i className="fa-brands fa-apple"></i> Login with Apple
            </button>
          </div>

          <div className="login-links">
            <p>
           <Link to="/auth/forgot-password">Forgot password?</Link>
            </p>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
