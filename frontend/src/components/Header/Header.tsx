import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import "./Header.css";
import "./Responsive.css"
import { Link, Routes } from "react-router";

export function Header(){
    const {theme, toggleTheme} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const hamburgerMenuHandler = () => {
      setIsMenuOpen(isMenuOpen => !isMenuOpen)
    }
    return (
    <header className={`header ${theme}`}>
      <div className="logo">JB</div>

      <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Companies</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

          <div className="auth-buttons mobile-auth">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Register</Link>
      
        </div>

      </nav>

       <div className="auth-buttons desktop-auth">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Register</Link>
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