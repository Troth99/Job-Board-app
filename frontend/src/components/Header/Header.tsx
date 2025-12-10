import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import "./Header.css";
import "./Responsive.css";
import { Link} from "react-router";
import { getRefreshToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../redux/authSlice";  
import { RootState } from "../../redux/store";


export function Header() {
    const dispatch = useDispatch();

  const { theme, toggleTheme } = useThemeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); 


useEffect(() => {
  const token = getRefreshToken();


  if (!token) {
    dispatch(setAuthenticated({ isAuthenticated: false, }));
  } else {
    dispatch(setAuthenticated({ isAuthenticated: true }));
  }
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
            <Link to="/jobs">Jobs </Link>
          </li> 
          <li>
            <Link to="/companies">Companies</Link>
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
