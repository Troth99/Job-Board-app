import React, { useState } from "react";
import "./fullPageSpinner.css";
import { useTheme } from "../../hooks/useTheme";

export default function FullPageSpinner() {
const {theme} = useTheme()
  return (
     <div className="spinner-overlay">
      <div className={`spinner ${theme === 'dark' ? 'dark-theme' : ''}`}></div>
      <div className={`spinner-logo ${theme === 'dark' ? 'dark-theme' : ''}`}>JB</div>
    </div>
  );
}