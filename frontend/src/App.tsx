import { useEffect, useState } from "react";
import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { Route, Routes } from "react-router";
import MainLayout from "./components/Layouts/MainLayout";
import ProtectedRoutes from "./RouteGuards/authRouteGuard";
import CompanyRouteGuard from "./RouteGuards/companyRouteGuard";
import { PageNotFound } from "./components/404/404";
import CompanyRegisterGuard from "./RouteGuards/companyRegisterGuard";
import { useDispatch } from "react-redux";
import useCategories from "./hooks/useCategories";
import { setCategories } from "./components/Home/CategoriesSection/categoriesSlice";
import { lazy, Suspense } from "react";
import SearchResults from "./components/Home/Search/SearchResults/SearchResults";
import { ViewMembers } from "./components/Company/VIewMembemrs/ViewMembers";
import { footerRoutes } from "./Routes/FooterRoutes";
import { jobsRoutes } from "./Routes/JobsRoutes";
import { authRoutes } from "./Routes/AuthRoutes";
import { notificationsRoutes } from "./Routes/NotificationRoutes";
import { ProfileRoutes } from "./Routes/ProfileRoutes";

interface AppProps {
  setUserId: (id: string) => void;
}

// Lazy loaded components

const RegisterCompany = lazy(
  () => import("./components/Company/RegisterCompany/RegisterCompany"),
);


const ViewAllCompanies = lazy(
  () => import("./components/Company/ViewAllCompanies/ViewAllCompanies"),
);

//lazy loaded components
const MemberDashboard = lazy(
  () => import("./components/Company/MemberDashboard/MemberDashboard"),
);
const HomeSection = lazy(() => import("./components/Home/HomeSection"));


// to refractor and move to a separate file

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

        <Route element={<MainLayout />}>
          <Route
            path="/companies"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <ViewAllCompanies />
              </Suspense>
            }
          />
        </Route>
                   {/* Profile routes */}
            {ProfileRoutes}

        <Route element={<ProtectedRoutes />}>
          <Route element={<CompanyRegisterGuard />}>
            <Route element={<MainLayout />}>
              <Route
                path="/register/company"
                element={
                  <Suspense fallback={<FullPageSpinner />}>
                    <RegisterCompany />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>

        <Route element={<CompanyRouteGuard />}>
          <Route element={<MainLayout />}>
            <Route
              path="/company/:companyId/dashboard"
              element={
                <Suspense fallback={<FullPageSpinner />}>
                  <MemberDashboard />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route element={<CompanyRouteGuard />}>
            <Route
              path="/company/:companyId/members"
              element={<ViewMembers />}
            ></Route>
          </Route>
        </Route>

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
