import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import "./Header.css";
import "./Responsive.css";
import { Link, useLocation } from "react-router";
import { getRefreshToken } from "../../features/auth/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { NotificationMailIcon } from "./NotificationMailIcon";

export function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs </Link>
          </li>
          <li>
            <Link to="/companies">Companies</Link>
          </li>
        </ul>

        <div className="auth-buttons mobile-auth">
          {isAuthenticated ? (
            <>
           <NotificationMailIcon />
              <Link to="/profile" className="btn-profile">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Register
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
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-register">
              Register
            </Link>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <button
        type="button"
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={hamburgerMenuHandler}
        aria-label="Toggle Menu"
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
