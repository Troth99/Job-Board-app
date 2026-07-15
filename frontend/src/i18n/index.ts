import { i18n } from "@lingui/core";
import { messages as bgMessages } from "./locales/bg/messages.po";
import { messages as enMessages } from "./locales/en/messages.po";


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

i18n.load({
  bg: bgMessages,
  en: enMessages,
});

export function activateLocale(locale: string) {
  const nextLocale = normalizeLocale(locale);
  i18n.activate(nextLocale);
  syncLocale(nextLocale);
}

activateLocale(getInitialLocale());

export { i18n };