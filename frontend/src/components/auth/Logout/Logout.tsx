import { useDispatch } from "react-redux";
import { logOut } from "../../../services/auth/authService";
import { setAuthenticated } from "../../../redux/authSlice";
import { useNavigate } from "react-router";
import { useState } from "react";

export function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState<boolean>(false)

  const logOutHandler = async () => {
    setLoadingButton(true)
    try {
      const success = await logOut();

      if (success) {
        dispatch(setAuthenticated(false));

        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error: any) {
      console.log("failed to log out", error.message);
      alert("An error occurred while logging out.");
    }finally {
      setLoadingButton(false)
    }
  };
  return (
    <button className="logout-button" onClick={logOutHandler} disabled={loadingButton}>
     {loadingButton ? "Logging out" : 'Log out'}
    </button>
  );
}
