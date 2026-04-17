import { lazy, Suspense } from "react";
import { Route } from "react-router";
import Spinner from "../components/Spinner/Spinner";
import ForUs from "../components/Footer/FooterPages/ForUs/ForUs";
import MainLayout from "../components/Layouts/MainLayout";
import Contacts from "../components/Footer/FooterPages/Contacts/Contacts";

const forUsPage = lazy(
  () => import("../components/Footer/FooterPages/ForUs/ForUs"),
);

const contactsPage = lazy(
  () => import("../components/Footer/FooterPages/Contacts/Contacts"),
);

export const footerRoutes = [
  <Route element={<MainLayout />} key="footer-layout">
    <Route
      key="for-us"
      path="/for-us"
      element={
        <Suspense fallback={<Spinner />}>
          <ForUs />
        </Suspense>
      }
    />
    ,
    <Route
      key="contacts"
      path="/contacts"
      element={
        <Suspense fallback={<Spinner />}>
          <Contacts />
        </Suspense>
      }
    />
  </Route>,
];
