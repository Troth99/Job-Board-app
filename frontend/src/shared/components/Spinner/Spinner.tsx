import { useEffect, useState } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import "./Spinner.css";

interface SpinnerProps {
  /** "fullpage": fixed branded overlay for route/auth loading. "block": fills the surrounding content area (default). "inline": compact spinner for cards/lists/buttons. */
  variant?: "fullpage" | "block" | "inline";
  /** Only affects the "inline" variant's diameter. */
  size?: "small" | "medium" | "large";
  /** Optional label shown under the spinner ("block"/"inline" only). */
  message?: string;
}

const inlineDiameters = { small: 20, medium: 28, large: 36 };
// Skip rendering if the loading state clears within this window, so fast responses never flash a spinner.
const APPEARANCE_DELAY_MS = 300;

export default function Spinner({ variant = "block", size = "medium", message }: SpinnerProps) {
  const { theme } = useThemeContext();
  const darkClass = theme === "dark" ? "dark-theme" : "";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), APPEARANCE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  if (variant === "fullpage") {
    return (
      <div className="spinner-overlay">
        <div className={`spinner-ring ${darkClass}`}></div>
        <div className={`spinner-logo ${darkClass}`}>JB</div>
        {message && <p className="spinner-message spinner-message--fullpage">{message}</p>}
      </div>
    );
  }

  if (variant === "inline") {
    const diameter = inlineDiameters[size];
    return (
      <div className="spinner-inline-wrap" role="status" aria-label="Loading">
        <div
          className={`spinner-ring ${darkClass}`}
          style={{ width: diameter, height: diameter, borderWidth: Math.max(3, diameter / 7) }}
        ></div>
        {message && <p className="spinner-message">{message}</p>}
      </div>
    );
  }

  return (
    <div className="spinner-block" role="status" aria-label="Loading">
      <div className={`spinner-ring ${darkClass}`}></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
}
