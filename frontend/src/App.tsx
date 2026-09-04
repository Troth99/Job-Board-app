import { useEffect, useState } from "react";
import "./styles/global.css";
import { Route, Routes } from "react-router";
import { PageNotFound } from "./shared/pages/404/404";
import { useDispatch } from "react-redux";
import useCategories from "./features/categories/hooks/useCategories";
import { Suspense } from "react";
import { footerRoutes } from "./shared/routes/FooterRoutes";
import { jobsRoutes } from "./features/jobs/routes/JobsRoutes";
import { authRoutes } from "./features/auth/routes/AuthRoutes";
import { notificationsRoutes } from "./features/notifications/routes/NotificationRoutes";
import { ProfileRoutes } from "./features/profile/routes/ProfileRoutes";
import { CompanyRoutes } from "./features/companies/routes/CompanyRoutes";
import MainLayout from "./shared/Layouts/MainLayout";
import FullPageSpinner from "./shared/components/FullPageSpinner/FullPageSpinner";
import { setCategories } from "./features/categories/components/CategoriesSection/categoriesSlice";
import SearchResults from "./features/homeview/components/Search/SearchResults/SearchResults";
import HomeSection from "./features/homeview/view/HomeSection";
import { API_BASE } from "./config/api";


interface AppProps {
  setUserId: (id: string) => void;
}

function App({ setUserId }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [serverReady, setServerReady] = useState(false);
  const dispatch = useDispatch();
  const { getCategories } = useCategories();

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await getCategories();
        dispatch(setCategories(categories));
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
    loadCategories();
  }, [dispatch]);

  useEffect(() => {
    async function wakeUpServer() {
      let retries = 0;
      const maxRetries = 3;
      const retryDelay = 1000;
      // Ping the backend that this environment actually talks to, not a hardcoded production URL.
      const pingUrl = API_BASE.replace(/\/api\/?$/, "/");

      while (retries < maxRetries) {
        try {
          // Bound each attempt so a cold/unreachable server can't hang the spinner forever.
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          const response = await fetch(pingUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (response.ok) {
            setServerReady(true);
            console.log("Server is up and ready!");
            break;
          } else {
            console.log("Server returned non-OK status:", response.status);
          }
        } catch (err) {
          console.error("Error pinging the server:", err);
        }

        retries++;
        console.log(`Retrying... attempt ${retries} of ${maxRetries}`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }

      setLoading(false);
    }

    wakeUpServer();
  }, []);

  if (loading) {
    return <FullPageSpinner />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={<HomeSection />}
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/search" element={<SearchResults />} />
        </Route>

        {/* Auth routes */}
        {authRoutes(setUserId)}

        {/* Job routes */}
        {jobsRoutes}

  
                   {/* Profile routes */}
            {ProfileRoutes}

        {/* Company routes */}
        {CompanyRoutes}

        {/* Notification routes */}
        {notificationsRoutes}

        {/* Footer routes */}
        {footerRoutes}

        <Route element={<MainLayout />}>
          <Route
            path="*"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
