import { useDispatch } from "react-redux";
import { logOut } from "../../../services/auth/authService";
import { setAuthenticated } from "../../../redux/authSlice";
import { useNavigate } from "react-router";

export function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
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
    }
  };
  return (
    <button className="logout-button" onClick={logOutHandler}>
      Logout
    </button>
  );
}
