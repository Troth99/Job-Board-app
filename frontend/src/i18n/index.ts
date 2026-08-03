import { i18n } from "@lingui/core";

//imports for Bulgarian translations
import { messages as bgShared } from "./locales/bg/shared.po";
import { messages as bgAuth } from "./locales/bg/auth.po";
import { messages as bgHomeview } from "./locales/bg/homeview.po";
import { messages as bgJobs } from "./locales/bg/jobs.po";
import { messages as bgCompanies } from "./locales/bg/view-all-companies.po";
import { messages as bgCategories } from "./locales/bg/categories.po";
import { messages as bgProfile } from "./locales/bg/profile.po";
import {messages as bgFooter} from "./locales/bg/footer.po";
import { messages as bgFooterForUs } from "./locales/bg/for-us.po";
import { messages as bgFooterContact } from "./locales/bg/contact.po";
import { messages as bgForEmployers } from "./locales/bg/for-employers.po";
import { messages as bgTermsAndConditions } from "./locales/bg/terms-and-conditions.po";
import { messages as bgPrivacy } from "./locales/bg/privacy.po";
import { messages as bgCookies } from "./locales/bg/cookies.po";
import { messages as bgCvTips } from "./locales/bg/cv-tips.po";
import { messages as bgInterviewPreparation } from "./locales/bg/interview-preparation.po";
import { messages as bgSalaryNegotiation } from "./locales/bg/salary-negotiation.po";
import { messages as bgProfileMainProfilePageProfile } from "./locales/bg/profile.po";
import { messages as bgEditProfileContainer } from "./locales/bg/edit-profile.po";
import {messages as bgViewAllJobs} from "./locales/bg/jobs.po";
import { messages as bgNotifications } from "./locales/bg/notifications.po";
import {messages as bgPostJob} from "./locales/bg/post-job.po";
import {messages as bgPagination} from "./locales/bg/pagination.po";
import { messages as bgCompanyView } from "./locales/bg/company-view.po";
import { messages as bgRegisterCompany } from "./locales/bg/register-company.po";
import {messages as bgDashboard} from "./locales/bg/dashboard.po";
import {messages as bgEditJob} from "./locales/bg/edit-job.po";
import {messages as bgFilteredJobs} from "./locales/bg/filtered-jobs.po";
import {messages as bgHowToPostJob} from "./locales/bg/guide-post-job.po";
import {messages as bgSeo} from "./locales/bg/seoTranslates.po";

//imports for English translations
import { messages as enShared } from "./locales/en/shared.po";
import { messages as enAuth } from "./locales/en/auth.po";
import { messages as enHomeview } from "./locales/en/homeview.po";
import { messages as enJobs } from "./locales/en/jobs.po";
import { messages as enCompanies } from "./locales/en/view-all-companies.po";
import { messages as enCategories } from "./locales/en/categories.po";
import { messages as enProfile } from "./locales/en/profile.po";
import {messages as enFooter} from "./locales/en/footer.po";
import { messages as enFooterForUs } from "./locales/en/for-us.po";
import { messages as enFooterContact } from "./locales/en/contact.po";
import { messages as enForEmployers } from "./locales/en/for-employers.po";
import { messages as enTermsAndConditions } from "./locales/en/terms-and-conditions.po";
import { messages as enPrivacy } from "./locales/en/privacy.po";
import { messages as enCookies } from "./locales/en/cookies.po";
import { messages as enCvTips } from "./locales/en/cv-tips.po";
import { messages as enInterviewPreparation } from "./locales/en/interview-preparation.po";
import { messages as enProfileMainProfilePageProfile } from "./locales/en/profile.po";
import { messages as enEditProfileContainer } from "./locales/en/edit-profile.po";
import {messages as enViewAllJobs} from "./locales/en/jobs.po";
import { messages as enNotifications } from "./locales/en/notifications.po";
import {messages as enPostJob} from "./locales/en/post-job.po";
import {messages as enPagination} from "./locales/en/pagination.po";
import { messages as enCompanyView } from "./locales/en/company-view.po";
import { messages as enRegisterCompany } from "./locales/en/register-company.po";
import { messages as enDashboard } from "./locales/en/dashboard.po";
import { messages as enEditJob } from "./locales/en/edit-job.po";
import { messages as enFilteredJobs } from "./locales/en/filtered-jobs.po";
import {messages as enHowToPostJob} from "./locales/en/guide-post-job.po";
import {messages as enSeo} from "./locales/en/seoTranslates.po";



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
    ...bgTermsAndConditions,
    ...bgPrivacy,
    ...bgCookies,
    ...bgCvTips,
    ...bgInterviewPreparation,
    ...bgSalaryNegotiation,
    ...bgProfileMainProfilePageProfile,
    ...bgEditProfileContainer,
    ...bgViewAllJobs,
    ...bgNotifications,
    ...bgPostJob,
    ...bgPagination,
    ...bgCompanyView,
    ...bgRegisterCompany,
    ...bgDashboard,
    ...bgEditJob,
    ...bgFilteredJobs,
    ...bgHowToPostJob,
    ...bgSeo
  
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
    ...enTermsAndConditions,
    ...enPrivacy,
    ...enCookies,
    ...enCvTips,
    ...enInterviewPreparation,
    ...enDashboard,
    ...enRegisterCompany,   
    ...enPagination,
    ...enPrivacy,
    ...enCookies,
    ...enCvTips,
    ...enInterviewPreparation,
    ...enProfileMainProfilePageProfile,
    ...enEditProfileContainer,
    ...enViewAllJobs,
    ...enNotifications,
    ...enPostJob,
    ...enCompanyView,
    ...enRegisterCompany,
    ...enDashboard,
    ...enEditJob,
    ...enFilteredJobs,
    ...enHowToPostJob,
    ...enSeo
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