import './LoginSocialIcons.css'
import { API_BASE } from '../../../../services/api';




export default function LoginSocialIcons() {

  const hnadleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
    }

    const facebookkLoginHandler = () => {

        console.log("Facebook login clicked");
    }

  return (
     <div className="login-social login-social-icons">
      <button
        type="button"
        className="social-btn social-btn-google"
        aria-label="Continue with Google"
        title="Continue with Google"
        onClick={hnadleGoogleLogin}
      >
        <i className="fa-brands fa-google" aria-hidden="true"></i>
        <span className="social-btn-label">Sign in with Google</span>
      </button>

    </div>
  );
}
