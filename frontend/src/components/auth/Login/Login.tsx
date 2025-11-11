import { Link, useNavigate } from "react-router";
import "./Login.css";
import "./Responsive.css";
import  { useState } from "react";
import { loginUser } from "../../../services/auth/authService";

export default  function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate()

  const  submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');


    try {
      const user = await loginUser(email, password);
      if (user?.token) {
        localStorage.setItem('token', user.token);
    
        navigate('/')
        
       setEmail('');  
        setPassword('');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
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
            <div className="input-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" 
              placeholder="Email address" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              />
            </div>
            <div className="input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input type="password"
               placeholder="Password" 
               id="pwd" 
          
               onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <button type='submit' className="btn-login">
              Login
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
