import { useState } from "react";
import { Trans, useLingui } from "@lingui/react/macro";
import "./LanguageSwitcher.css";
import ReactCountryFlag from "react-country-flag";
import { activateLocale } from "../../../i18n";

function LanguageSwitcher() {
  const { i18n, t } = useLingui();
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const currentCountryCode = i18n.locale.startsWith("bg") ? "BG" : "GB";

  const handleLanguageChange = (language: "bg" | "en") => {
    activateLocale(language);
    setIsLangOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        type="button"
        onClick={() => setIsLangOpen((open) => !open)}
        className="language-toggle-btn"
        aria-label={t`Change language`}
      >
        <span className="current-flag">
          <ReactCountryFlag
            countryCode={currentCountryCode}
            svg
            aria-label={i18n.locale.startsWith("bg") ? t`Bulgarian` : t`English`}
            className="language-flag-icon"
          />
        </span>
      </button>

      {isLangOpen && (
        <div className="language-dropdown">
          <button
            type="button"
            className={`language-option ${i18n.locale.startsWith("bg") ? "active" : ""}`}
            onClick={() => handleLanguageChange("bg")}
          >
            <ReactCountryFlag
              countryCode="BG"
              svg
              aria-label={t`Bulgarian`}
              className="language-option-flag language-flag-icon"
            />
            <span className="language-option-label">
              <Trans>Bulgarian</Trans>
            </span>
          </button>

          <button
            type="button"
            className={`language-option ${i18n.locale.startsWith("en") ? "active" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            <ReactCountryFlag
              countryCode="GB"
              svg
              aria-label={t`English`}
              className="language-option-flag language-flag-icon"
            />
            <span className="language-option-label">
              <Trans>English</Trans>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
