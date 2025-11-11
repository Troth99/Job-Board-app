import { Link } from 'react-router'
import './Login.css'
import "./Responsive.css"

export default  function LoginComponent() {

    return (
        <div className="login-wrapper">
 <div className="login-container">
    <div className="content">
        <Link to="/" className='logo'>
        JB
        </Link>
   
      <h2>Login to Your Account</h2>
      <form id="loginForm">
        <div className="input-wrap">
          <i className="fa-solid fa-envelope"></i>
          <input type="email" placeholder="Email address" id="email" />
        </div>
        <div className="input-wrap">
          <i className="fa-solid fa-lock"></i>
          <input type="password" placeholder="Password" id="pwd" />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>

      <div className="social-login">
        <button className="btn-google"><i className="fa-brands fa-google"></i> Login with Google</button>
        <button className="btn-apple"><i className="fa-brands fa-apple"></i> Login with Apple</button>
      </div>

      <div className="links">
        <p><a href="#">Forgot password?</a></p>
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </div>
  </div>
  </div>
  );
};
