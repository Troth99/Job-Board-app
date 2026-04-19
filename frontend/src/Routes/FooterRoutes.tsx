import { lazy, Suspense } from "react";
import { Route } from "react-router";
import Spinner from "../components/Spinner/Spinner";
import MainLayout from "../components/Layouts/MainLayout";


const ForUsPage = lazy(
  () => import("../components/Footer/FooterPages/ForUs/ForUs"),
);

const ContactsPage = lazy(
  () => import("../components/Footer/FooterPages/Contacts/Contacts"),
);

const ForEmployersPage = lazy(
  () => import("../components/Footer/FooterPages/ForEmployers/ForEmployers"),
);

const TermsAndConditionsPage = lazy(
  () => import("../components/Footer/FooterPages/TOS/termsAndConditions"),
);

const PrivacyPage = lazy(
  () => import("../components/Footer/FooterPages/Privacy/Privacy"),
);
const CookiesPage = lazy(
  () => import("../components/Footer/FooterPages/Cookies/Cookies"),
);
const CVTipsPage = lazy(
  () => import("../components/Footer/FooterPages/CareerAdvice/CVTips/CVTips"),
);
const InterviewPreparationPage = lazy(
  () => import("../components/Footer/FooterPages/CareerAdvice/interviewPreparation/InterviewPreparation"),
);
const SalaryNegotiationPage = lazy(
  () => import("../components/Footer/FooterPages/CareerAdvice/SalaryNegotiation/SalaryNegotiation"),
);

export const footerRoutes = [
  <Route element={<MainLayout />} key="footer-layout">
    <Route
      key="for-us"
      path="/for-us"
      element={
        <Suspense fallback={<Spinner />}>
          <ForUsPage />
        </Suspense>
      }
    />
    ,
    <Route
      key="contacts"
      path="/contacts"
      element={
        <Suspense fallback={<Spinner />}>
          <ContactsPage />
        </Suspense>
      }
    />
    <Route
      key="for-employers"
      path="/for-employers"
      element={
        <Suspense fallback={<Spinner />}>
          <ForEmployersPage />
        </Suspense>
      }
    />
    <Route
      key="terms-and-conditions"
      path="/terms-and-conditions"
      element={
        <Suspense fallback={<Spinner />}>
          <TermsAndConditionsPage />
        </Suspense>
      }
      />
      <Route 
      key="privacy"
      path="/privacy"
      element={
        <Suspense fallback={<Spinner />}>
          <PrivacyPage />
        </Suspense>
      }
      />
      <Route 
      key="cookies"
      path="/cookies"
      element={
        <Suspense fallback={<Spinner />}>
          <CookiesPage />
        </Suspense>
      }
      />
      <Route 
      key="cv-tips"
      path="/career-advice/cv-tips"
      element={
        <Suspense fallback={<Spinner />}>
          <CVTipsPage />
        </Suspense>
      }
      />
      <Route 
      key="interview-preparation"
      path="/career-advice/interview-preparation"
      element={
        <Suspense fallback={<Spinner />}>
          <InterviewPreparationPage />
        </Suspense>
      }
      />
      <Route 
      key="salary-negotiation"
      path="/career-advice/salary-negotiation"
      element={
        <Suspense fallback={<Spinner />}>
         <SalaryNegotiationPage />
        </Suspense>
      }
      />
"
  </Route>,
];
