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
  () => import("../components/Footer/FooterPages/TOS/TermsAndConditions"),
);

const PrivacyPage = lazy(
  () => import("../components/Footer/FooterPages/Privacy/Privacy"),
);
const CookiesPage = lazy(
  () => import("../components/Footer/FooterPages/Cookies/Cookies"),
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

  </Route>,
];
