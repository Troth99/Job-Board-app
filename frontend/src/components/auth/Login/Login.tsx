import { Link, useNavigate } from "react-router";
import "./Login.css";
import "./Responsive.css";
import { useState } from "react";
import { loginUser } from "../../../services/auth/authService";
import { useValidation } from "../../../hooks/useValidation";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [serverErrors, setServerErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { errors, validateEmail, validatePassword } = useValidation();

   const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setServerErrors({}); 

  
   const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

    if (emailError || passwordError) {
       setServerErrors({
      email: emailError,
      password: passwordError
    });
      return;
    }

    try {
      const user = await loginUser(email, password);

      if (user?.token) {
        localStorage.setItem("token", user.token);
        navigate("/"); 
        setEmail("");
        setPassword("");
      } else if (user?.error === 'User does not exist.') {
  
        setServerErrors({
          email: "User does not exist.",
     
        });
      }
    } catch (err: any) {
      
      if(err?.message?.includes('User does not exist.')) {
        setServerErrors({email: 'User does not exist.'})
      }else {
        setServerErrors({email: "Invalid Email or password.", password: 'Invalid Email or password.'})
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
          <form id="loginForm" onSubmit={submitHandler}>
          <div className={`input-wrap ${serverErrors.email ? 'input-error' : ''}`}>
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Email address"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
              />
             {serverErrors && <div className="error-message">{serverErrors.email}</div>}
            </div>
           <div className={`input-wrap ${serverErrors.password ? 'input-error' : ''}`}>
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="pwd"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                />
             {serverErrors && <div className="error-message">{serverErrors.password}</div>}
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
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
