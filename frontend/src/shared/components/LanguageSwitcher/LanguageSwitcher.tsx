import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";
import ReactCountryFlag from "react-country-flag";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const currentCountryCode = i18n.language.startsWith("bg") ? "BG" : "GB";

  const handleLanguageChange = (language: "bg" | "en") => {
    void i18n.changeLanguage(language);
    setIsLangOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        type="button"
        onClick={() => setIsLangOpen((open) => !open)}
        className="language-toggle-btn"
        aria-label="Change language"
      >
        <span className="current-flag">
          <ReactCountryFlag
            countryCode={currentCountryCode}
            svg
            aria-label={i18n.language.startsWith("bg") ? "Bulgarian" : "English"}
            className="language-flag-icon"
          />
        </span>
      </button>

      {isLangOpen && (
        <div className="language-dropdown">
          <button
            type="button"
            className={`language-option ${i18n.language.startsWith("bg") ? "active" : ""}`}
            onClick={() => handleLanguageChange("bg")}
          >
            <ReactCountryFlag
              countryCode="BG"
              svg
              aria-label="Bulgarian"
              className="language-option-flag language-flag-icon"
            />
            <span className="language-option-label">Български</span>
          </button>

          <button
            type="button"
            className={`language-option ${i18n.language.startsWith("en") ? "active" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            <ReactCountryFlag
              countryCode="GB"
              svg
              aria-label="English"
              className="language-option-flag language-flag-icon"
            />
            <span className="language-option-label">English</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
