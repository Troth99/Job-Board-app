import './LoginSocialIcons.css'


export default function LoginSocialIcons() {



    const hnadleGoogleLogin = () => {

        console.log("Google login clicked");
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
      </button>

      <button
        type="button"
        className="social-btn social-btn-facebook"
        aria-label="Continue with Facebook"
        title="Continue with Facebook"
        onClick={facebookkLoginHandler}
      >
        <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
      </button>

      <button
        type="button"
        className="social-btn social-btn-apple"
        aria-label="Continue with Apple"
        title="Continue with Apple"
      >
        <i className="fa-brands fa-apple" aria-hidden="true"></i>
      </button>
    </div>
  );
}
