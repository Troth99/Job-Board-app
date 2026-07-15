import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const flags = {
  en: "🇬🇧",
  bg: "🇧🇬",
};

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    const nextLanguage = i18n.language.startsWith("bg") ? "en" : "bg";
    i18n.changeLanguage(nextLanguage);
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
        {isLangOpen
          ? i18n.language.startsWith("bg")
            ? flags.en
            : flags.bg
          : i18n.language.startsWith("bg")
            ? flags.bg
            : flags.en}
      </button>
      {isLangOpen && (
        <div className="language-dropdown">
          <button
            type="button"
            onClick={toggleLanguage}
            className="language-option"
          >
            {i18n.language.startsWith("bg") ? flags.en : flags.bg}
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
