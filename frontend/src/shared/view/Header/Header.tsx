import { useEffect, useState } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import "./Header.css";
import "./Responsive.css";
import { Link, useLocation } from "react-router";
import { getRefreshToken } from "../../../features/auth/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../../features/auth/authSlice/authSlice";
import { RootState } from "../../../store/store";
import { NotificationMailIcon } from "../../components/NotificationBadge/NotificationMailIcon";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { Trans, useLingui } from "@lingui/react/macro";



export function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useLingui();

  const { theme, toggleTheme } = useThemeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );


  useEffect(() => {
    const token = getRefreshToken();

    if (!token) {
      dispatch(setAuthenticated({ isAuthenticated: false }));
    } else {
      dispatch(setAuthenticated({ isAuthenticated: true }));
    }
  }, [dispatch]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const hamburgerMenuHandler = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };



  return (
    <header className={`header ${theme}`}>
      <Link className="logo" to="/">
        JB
      </Link>

      <nav id="main-navigation" className={`nav ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/">
            <Trans>Home</Trans>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
            <Trans>Jobs</Trans>
            </Link>
          </li>
          <li>
            <Link to="/companies"
            ><Trans>Companies</Trans>
            </Link>
          </li>
        </ul>

        <div className="auth-buttons mobile-auth">
          {isAuthenticated ? (
            <>
           <NotificationMailIcon />
              <Link to="/profile" className="btn-profile">
                <Trans>Profile</Trans>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                <Trans>Login</Trans>
              </Link>
              <Link to="/register" className="btn-register">
                <Trans>Register</Trans>
              </Link>
            </>
          )}
        </div>
      </nav>

      {isMenuOpen && <div className="mobile-nav-backdrop" onClick={() => setIsMenuOpen(false)} />}

      <div className="auth-buttons desktop-auth">
        {isAuthenticated ? (
          <>
     <NotificationMailIcon />

            <Link to="/profile" className="btn-profile">
              <Trans>Profile</Trans>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">
              <Trans>Login</Trans>
            </Link>
            <Link to="/register" className="btn-register">
              <Trans>Register</Trans>
            </Link>
          </>
        )}
      </div>

      <div className="header-utility-controls">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label={t`Toggle theme`}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {theme === "light" ? "🌙" : "☀️"}
          </span>
        </button>
      </div>

      <button
        type="button"
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={hamburgerMenuHandler}
        aria-label={t`Toggle Menu`}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
