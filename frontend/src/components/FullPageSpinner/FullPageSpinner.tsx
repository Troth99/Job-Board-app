import "./FullPageSpinner.css";
import { useThemeContext } from "../../context/ThemeContext";

export default function FullPageSpinner() {
const {theme} = useThemeContext()
  return (
     <div className="spinner-overlay">
      <div className={`spinner ${theme === 'dark' ? 'dark-theme' : ''}`}></div>
      <div className={`spinner-logo ${theme === 'dark' ? 'dark-theme' : ''}`}>JB</div>
    </div>
  );
}