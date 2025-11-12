import { Link } from "react-router"
import './Register.css'



export default function RegisterComponent() {



    return (
        <div className="register-wrapper">
     <div className="register-container">
  <div className="content">
    <Link to="/" className="logo">JB</Link>
    <h2>Create Account</h2>
    <form id="registerForm">
      <div className="input-wrap">
        <i className="fa-solid fa-user"></i>
        <input type="text" placeholder="First name" />
        <div className="error-message"></div>
      </div>
      <div className="input-wrap">
        <i className="fa-solid fa-user"></i>
        <input type="text" placeholder="Last name" />
        <div className="error-message"></div>
      </div>
      <div className="input-wrap">
        <i className="fa-solid fa-envelope"></i>
        <input type="email" placeholder="Email address" />
        <div className="error-message"></div>
      </div>
      <div className="input-wrap">
        <i className="fa-solid fa-phone"></i>
        <input type="tel" placeholder="Phone Number" />
        <div className="error-message"></div>
      </div>
      <div className="input-wrap">
        <i className="fa-solid fa-location-dot"></i>
        <input type="text" placeholder="City / Location" />
        <div className="error-message"></div>
      </div>
      <div className="input-wrap">
        <i className="fa-solid fa-lock"></i>
        <input type="password" placeholder="Password" id="pwd" />
        <button type="button" className="show-hide-btn" id="togglePwd">👁</button>
        <div className="error-message"></div>
      </div>
      <div className="input-wrap">
        <i className="fa-solid fa-lock"></i>
        <input type="password" placeholder="Confirm Password" id="confirmPwd" />
        <button type="button" className="show-hide-btn" id="toggleConfirmPwd">👁</button>
        <div className="error-message"></div>
      </div>

      <div className="checkbox-container">
        <input type="checkbox" id="terms" required />
        <label htmlFor="terms" className="checkbox-label">I agree to the Terms & Conditions</label>
      </div>
      <button className="btn-register" type="submit">Register</button>
    </form>
    <div className="links">
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  </div>
</div>
   </div>
    )
}