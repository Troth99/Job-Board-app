import { useEffect, useState } from "react";
import { useTheme } from "../../utils/useTheme";
import "./Header.css";
import "./Responsive.css";
import { Link, Routes } from "react-router";
import { getAuthToken } from "../../services/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../redux/authSlice";  
import { RootState } from "../../redux/store";


export function Header() {
    const dispatch = useDispatch();

  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); 


  useEffect(() => {
    const token = getAuthToken();
    dispatch(setAuthenticated(!!token));  
  }, [dispatch]);


  const hamburgerMenuHandler = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };
  return (
    <header className={`header ${theme}`}>
      <div className="logo">JB</div>

      <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Companies</a>
          </li>
          <li>
            <a href="#">Events</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        <div className="auth-buttons mobile-auth">
        {isAuthenticated ? (
    <>
      <Link to="/profile" className="btn-profile">Profile</Link>
  
    </>
  ) : (
    <>
      <Link to="/login" className="btn-login">Login</Link>
      <Link to="/register" className="btn-register">Register</Link>
    </>
  )}
        </div>
      </nav>

     <div className="auth-buttons desktop-auth">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="btn-profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-register">Register</Link>
          </>
        )}
      </div>

      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <button
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={hamburgerMenuHandler}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
