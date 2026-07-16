import './LoginSocialIcons.css'
import { API_BASE } from '../../../../config/api';
import { Trans } from '@lingui/react/macro';



export default function LoginSocialIcons() {

  const handleGoogleLogin = () => {
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
        onClick={handleGoogleLogin}
      >
        <i className="fa-brands fa-google" aria-hidden="true"></i>
        <span className="social-btn-label"><Trans>Sign in with Google</Trans></span>
      </button>

    </div>
  );
}
