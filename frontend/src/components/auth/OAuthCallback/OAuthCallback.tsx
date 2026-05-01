import { useEffect } from "react";
import { useNavigate } from "react-router";
import { API_BASE } from "../../../services/api";
import FullPageSpinner from "../../FullPageSpinner/FullPageSpinner";

interface OAuthCallbackProps {
  setUserId: (id: string) => void;
}

export default function OAuthCallback({ setUserId }: OAuthCallbackProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");

      if (!accessToken || !refreshToken) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load profile");
        }

        const profile = await response.json();

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: profile._id,
            accessToken,
            refreshToken,
          }),
        );

        sessionStorage.setItem("fromLogin", "true");
        setUserId(profile._id);
        navigate("/", { replace: true });
      } catch {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    };

    finishLogin();
  }, [navigate, setUserId]);

  return <FullPageSpinner />;
}
