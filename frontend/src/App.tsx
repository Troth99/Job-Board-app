import { useEffect, useState } from "react";
import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { Route, Routes } from "react-router";
import MainLayout from "./components/Layouts/MainLayout";
import { PageNotFound } from "./components/404/404";
import { useDispatch } from "react-redux";
import useCategories from "./hooks/useCategories";
import { setCategories } from "./components/Home/CategoriesSection/categoriesSlice";
import { lazy, Suspense } from "react";
import SearchResults from "./components/Home/Search/SearchResults/SearchResults";
import { footerRoutes } from "./Routes/FooterRoutes";
import { jobsRoutes } from "./Routes/JobsRoutes";
import { authRoutes } from "./Routes/AuthRoutes";
import { notificationsRoutes } from "./Routes/NotificationRoutes";
import { ProfileRoutes } from "./Routes/ProfileRoutes";
import { CompanyRoutes } from "./Routes/CompanyRoutes";

interface AppProps {
  setUserId: (id: string) => void;
}
//lazy loaded components
const HomeSection = lazy(() => import("./components/Home/HomeSection"));

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

      while (retries < maxRetries) {
        try {
          const response = await fetch(
            "https://job-board-backend-7gfd.onrender.com/",
          );
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
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <HomeSection />
              </Suspense>
            }
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
