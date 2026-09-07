import { Trans } from "@lingui/react/macro";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { DEMO_CREDENTIALS } from "../../../config/api";
import "./loginDemo.css";

export default function LogInAsDemo() {
  const { loginUser, loading } = useAuth();
  const [, setUser] = useLocalStorage("user", {
    _id: "",
    accessToken: "",
    refreshToken: "",
  });

  const logInAsDemo = async () => {
    try {
      const response = await loginUser(DEMO_CREDENTIALS);

      setUser({
        _id: response.user._id,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      sessionStorage.setItem("fromLogin", "true");
      // Full reload so main.tsx re-reads the user from localStorage without prop-drilling setUserId into Header.
      window.location.href = "/";
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
    }
  };

    return (
        <button className="btn-login-as-demo" type="button" onClick={logInAsDemo} disabled={loading}>
            {loading ? <Trans>Logging in...</Trans> : <Trans>Log In as Demo</Trans>}
        </button>
    )
}