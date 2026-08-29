import { i18n } from "@lingui/core";

//bulgarian imports

import { messages as bgApplyModal } from "./locales/bg/applyModalForJob.po";
import { messages as bgAuth } from "./locales/bg/auth.po";
import { messages as bgCategories } from "./locales/bg/categories.po";
import { messages as bgCompanyView } from "./locales/bg/company-view.po";
import { messages as bgContact } from "./locales/bg/contact.po";
import { messages as bgCookies } from "./locales/bg/cookies.po";
import { messages as bgCvTips } from "./locales/bg/cv-tips.po";
import { messages as bgDashboard } from "./locales/bg/dashboard.po";
import { messages as bgEditJob } from "./locales/bg/edit-job.po";
import { messages as bgEditProfile } from "./locales/bg/edit-profile.po";
import { messages as bgFilteredJobs } from "./locales/bg/filtered-jobs.po";
import { messages as bgFooter } from "./locales/bg/footer.po";
import { messages as bgForEmployers } from "./locales/bg/for-employers.po";
import { messages as bgForUs } from "./locales/bg/for-us.po";
import { messages as bgGuidePostJob } from "./locales/bg/guide-post-job.po";
import { messages as bgHomeview } from "./locales/bg/homeview.po";
import { messages as bgInterviewPreparation } from "./locales/bg/interview-preparation.po";
import { messages as bgJobDetails } from "./locales/bg/jobsDetails.po";
import { messages as bgJobs } from "./locales/bg/jobs.po";
import { messages as bgMembersView } from "./locales/bg/members-view.po";
import { messages as bgNotifications } from "./locales/bg/notifications.po";
import { messages as bgPagination } from "./locales/bg/pagination.po";
import { messages as bgPostJob } from "./locales/bg/post-job.po";
import { messages as bgPrivacy } from "./locales/bg/privacy.po";
import { messages as bgProfile } from "./locales/bg/profile.po";
import { messages as bgRegisterCompany } from "./locales/bg/register-company.po";
import { messages as bgSalaryNegotiation } from "./locales/bg/salary-negotiation.po";
import { messages as bgSavedJobs } from "./locales/bg/saved-jobs.po";
import { messages as bgShowCompanyJobs } from "./locales/bg/show-company-jobs.po";
import { messages as bgSeo } from "./locales/bg/seoTranslates.po";
import { messages as bgShared } from "./locales/bg/shared.po";
import { messages as bgTermsAndConditions } from "./locales/bg/terms-and-conditions.po";
import { messages as bgViewAllCompanies } from "./locales/bg/view-all-companies.po";
import {messages as bgDetailsForJob} from "./locales/bg/detailsForJob.po";
import { messages as bgCandidateJobView } from "./locales/bg/candidateJobView.po";

//english imports
import { messages as enApplyModal } from "./locales/en/applyModalForJob.po";
import { messages as enAuth } from "./locales/en/auth.po";
import { messages as enCategories } from "./locales/en/categories.po";
import { messages as enCompanyView } from "./locales/en/company-view.po";
import { messages as enContact } from "./locales/en/contact.po";
import { messages as enCookies } from "./locales/en/cookies.po";
import { messages as enCvTips } from "./locales/en/cv-tips.po";
import { messages as enDashboard } from "./locales/en/dashboard.po";
import { messages as enEditJob } from "./locales/en/edit-job.po";
import { messages as enEditProfile } from "./locales/en/edit-profile.po";
import { messages as enFilteredJobs } from "./locales/en/filtered-jobs.po";
import { messages as enFooter } from "./locales/en/footer.po";
import { messages as enForEmployers } from "./locales/en/for-employers.po";
import { messages as enForUs } from "./locales/en/for-us.po";
import { messages as enGuidePostJob } from "./locales/en/guide-post-job.po";
import { messages as enHomeview } from "./locales/en/homeview.po";
import { messages as enInterviewPreparation } from "./locales/en/interview-preparation.po";
import { messages as enJobDetails } from "./locales/en/jobsDetails.po";
import { messages as enJobs } from "./locales/en/jobs.po";
import { messages as enMembersView } from "./locales/en/members-view.po";
import { messages as enNotifications } from "./locales/en/notifications.po";
import { messages as enPagination } from "./locales/en/pagination.po";
import { messages as enPostJob } from "./locales/en/post-job.po";
import { messages as enPrivacy } from "./locales/en/privacy.po";
import { messages as enProfile } from "./locales/en/profile.po";
import { messages as enRegisterCompany } from "./locales/en/register-company.po";
import { messages as enSalaryNegotiation } from "./locales/en/salary-negotiation.po";
import { messages as enSavedJobs } from "./locales/en/saved-jobs.po";
import { messages as enShowCompanyJobs } from "./locales/en/show-company-jobs.po";
import { messages as enSeo } from "./locales/en/seoTranslates.po";
import { messages as enShared } from "./locales/en/shared.po";
import { messages as enTermsAndConditions } from "./locales/en/terms-and-conditions.po";
import { messages as enViewAllCompanies } from "./locales/en/view-all-companies.po";
import {messages as enDetailsForJob} from "./locales/en/detailsForJob.po";
import {messages as enCandidateJobView } from "./locales/en/candidateJobView.po";

export const locales = ["bg", "en"] as const;
export type AppLocale = (typeof locales)[number];

const fallbackLocale: AppLocale = "en";
const localeStorageKey = "locale";

const bgMessages = {
  ...bgShared,
  ...bgAuth,
  ...bgHomeview,
  ...bgJobs,
  ...bgViewAllCompanies,
  ...bgCategories,
  ...bgNotifications,
  ...bgProfile,
  ...bgFooter,
  ...bgForUs,
  ...bgContact,
  ...bgForEmployers,
  ...bgTermsAndConditions,
  ...bgPrivacy,
  ...bgCookies,
  ...bgCvTips,
  ...bgInterviewPreparation,
  ...bgSalaryNegotiation,
  ...bgEditProfile,
  ...bgPostJob,
  ...bgPagination,
  ...bgCompanyView,
  ...bgRegisterCompany,
  ...bgDashboard,
  ...bgEditJob,
  ...bgFilteredJobs,
  ...bgGuidePostJob,
  ...bgSeo,
  ...bgMembersView,
  ...bgSavedJobs,
  ...bgShowCompanyJobs,
  ...bgApplyModal,
  ...bgJobDetails,
  ...bgDetailsForJob,
  ...bgCandidateJobView,
};

const enMessages = {
  ...enShared,
  ...enAuth,
  ...enHomeview,
  ...enJobs,
  ...enViewAllCompanies,
  ...enCategories,
  ...enNotifications,
  ...enProfile,
  ...enFooter,
  ...enForUs,
  ...enContact,
  ...enForEmployers,
  ...enTermsAndConditions,
  ...enPrivacy,
  ...enCookies,
  ...enCvTips,
  ...enInterviewPreparation,
  ...enSalaryNegotiation,
  ...enEditProfile,
  ...enPostJob,
  ...enCandidateJobView,
  ...enPagination,
  ...enCompanyView,
  ...enRegisterCompany,
  ...enDashboard,
  ...enEditJob,
  ...enFilteredJobs,
  ...enGuidePostJob,
  ...enSeo,
  ...enMembersView,
  ...enSavedJobs,
  ...enShowCompanyJobs,
  ...enApplyModal,
  ...enJobDetails,
  ...enDetailsForJob,
};

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