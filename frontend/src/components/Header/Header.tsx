import { useTheme } from "../../hooks/useTheme";
import "./Header.css";


type HeaderProps=  {

}


export function Header({}: HeaderProps){
    const {theme, toggleTheme} = useTheme()
    return (
     <header>
      <div className="logo">JB</div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Companies</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <a href="#" className="btn-login">Login</a>
        <a href="#" className="btn-register">Register</a>
        <button 
        onClick={toggleTheme}
        className="theme-toggle-btn"
        >
            {theme === 'light' ? "🌙" : "☀️" }
        </button>
      </div>
    </header>
    )
}