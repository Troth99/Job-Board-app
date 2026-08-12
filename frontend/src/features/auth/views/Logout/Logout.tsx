import { useDispatch } from "react-redux";

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { setAuthenticated } from "../../authSlice/authSlice";
import { Trans } from "@lingui/react/macro";

export function LogOut() {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const { logOut } = useAuth();

  const logOutHandler = async () => {
    setLoadingButton(true)
    try {
      // Clear localStorage immediately
      localStorage.removeItem('user');
      dispatch(setAuthenticated({ isAuthenticated: false }));
      
      // Try to notify backend (but don't wait for it)
      logOut().catch((err: any) => console.error('Backend logout failed:', err));
      
      // Force page reload to clear all state
      window.location.href = "/";
    } catch (error: any) {
      console.log("failed to log out", error.message);
      // Still clear local state even on error
      localStorage.removeItem('user');
      window.location.href = "/";
    } finally {
      setLoadingButton(false)
    }
  };
  return (
    <button className="logout-button" onClick={logOutHandler} disabled={loadingButton}>
     {loadingButton ? <Trans>Logging out</Trans> : <Trans>Log out</Trans>}
    </button>
  );
}
