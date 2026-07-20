import { i18n } from "@lingui/core";

//imports for Bulgarian translations
import { messages as bgShared } from "./locales/bg/shared.po";
import { messages as bgAuth } from "./locales/bg/auth.po";
import { messages as bgHomeview } from "./locales/bg/homeview.po";
import { messages as bgJobs } from "./locales/bg/jobs.po";
import { messages as bgCompanies } from "./locales/bg/companies.po";
import { messages as bgCategories } from "./locales/bg/categories.po";
import { messages as bgNotifications } from "./locales/bg/notifications.po";
import { messages as bgProfile } from "./locales/bg/profile.po";
import {messages as bgFooter} from "./locales/bg/footer.po";
import { messages as bgFooterForUs } from "./locales/bg/for-us.po";
import { messages as bgFooterContact } from "./locales/bg/contact.po";
import { messages as bgForEmployers } from "./locales/bg/for-employers.po";
import { messages as bgTermsAndConditions } from "./locales/bg/terms-and-conditions.po";


//imports for English translations
import { messages as enShared } from "./locales/en/shared.po";
import { messages as enAuth } from "./locales/en/auth.po";
import { messages as enHomeview } from "./locales/en/homeview.po";
import { messages as enJobs } from "./locales/en/jobs.po";
import { messages as enCompanies } from "./locales/en/companies.po";
import { messages as enCategories } from "./locales/en/categories.po";
import { messages as enNotifications } from "./locales/en/notifications.po";
import { messages as enProfile } from "./locales/en/profile.po";
import {messages as enFooter} from "./locales/en/footer.po";
import { messages as enFooterForUs } from "./locales/en/for-us.po";
import { messages as enFooterContact } from "./locales/en/contact.po";
import { messages as enForEmployers } from "./locales/en/for-employers.po";
import { messages as enTermsAndConditions } from "./locales/en/terms-and-conditions.po";



export const locales = ["bg", "en"] as const;
export type AppLocale = (typeof locales)[number];

const fallbackLocale: AppLocale = "en";
const localeStorageKey = "locale";

function normalizeLocale(locale?: string | null): AppLocale {
  if (!locale) {
    return fallbackLocale;
  }

  return locale.toLowerCase().startsWith("bg") ? "bg" : "en";
}

function syncLocale(locale: AppLocale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(localeStorageKey, locale);
  }
}

export function getInitialLocale(): AppLocale {
  if (typeof window === "undefined") {
    return fallbackLocale;
  }

  return normalizeLocale(
    window.localStorage.getItem(localeStorageKey) ?? window.navigator.language,
  );
}

//load translations
i18n.load({
  bg: {
    ...bgShared,
    ...bgAuth,
    ...bgHomeview,
    ...bgJobs,
    ...bgCompanies,
    ...bgCategories,
    ...bgNotifications,
    ...bgProfile,
    ...bgFooter,
    ...bgFooterForUs,
    ...bgFooterContact,
    ...bgForEmployers,
    ...bgTermsAndConditions
  },
  en: {
    ...enShared,
    ...enAuth,
    ...enHomeview,
    ...enJobs,
    ...enCompanies,
    ...enCategories,
    ...enNotifications,
    ...enProfile, 
    ...enFooter,
    ...enFooterForUs,
    ...enFooterContact,
    ...enForEmployers,
    ...enTermsAndConditions
  },
});

//function to activate a locale and sync it with the document and localStorage
export function activateLocale(locale: string) {
  const nextLocale = normalizeLocale(locale);
  i18n.activate(nextLocale);
  syncLocale(nextLocale);
}

activateLocale(getInitialLocale());

export { i18n };