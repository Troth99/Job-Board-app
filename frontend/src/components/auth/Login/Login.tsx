import { Link, useNavigate } from "react-router";
import "./Login.css";
import "./Responsive.css";
import { useState } from "react";
import { loginUser } from "../../../services/auth/authService";
import { useValidation } from "../../../hooks/useValidation";

export default function LoginComponent() {
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { validateEmail, validatePassword } = useValidation();

  const loginSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(event.target as HTMLFormElement)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      setLoading(false);
      return;
    }

    try {
      const user = await loginUser(email, password);

      if (user?.token) {
        localStorage.setItem("token", user.token);
        navigate("/");
  
      } else  {
        setErrors({
          email: "User does not exist.",
        });
      }
    } catch (err: any) {
      if (err?.message?.includes("User does not exist.")) {
        setErrors({ email: "User does not exist." });
      } else {
        setErrors({
          email: "Invalid Email or password.",
          password: "Invalid Email or password.",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="content">
          <Link to="/" className="logo">
            JB
          </Link>

          <h2>Login to Your Account</h2>
          <form id="loginForm" onSubmit={loginSubmitHandler}>
            <div
              className={`input-wrap ${
                errors.email ? "input-error" : ""
              }`}
            >
              <i className="fa-solid fa-envelope"></i>
              <input
                placeholder="Email address"
                id="email"
                name='email'
                onInput={() => setErrors(prev => ({...prev, email: undefined}))}
              />
              {errors && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div
              className={`input-wrap ${
                errors.password ? "input-error" : ""
              }`}
            >
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="pwd"
                name="password"
           onInput={() => setErrors(prev => ({...prev, password: undefined}))}
              />
              {errors && (
                <div className="error-message">{errors.password}</div>
              )}
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

          <div className="links">
            <p>
              <a href="#">Forgot password?</a>
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
