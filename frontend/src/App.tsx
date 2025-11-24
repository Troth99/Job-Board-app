import { useEffect, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import LoginComponent from "./components/auth/Login/Login";
import HomeSection from "./components/Home/HomeSection";
import RegisterComponent from "./components/auth/Register/Register";
import MainLayout from "./components/Layouts/MainLayout";
import MyProfile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";
import ProtectedRoutes from "./utils/RouteGuards/authRouteGuard";
import GuestGuardRoute from "./utils/RouteGuards/guestRouteGuard";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./components/EditProfile/ChangePassword/ChangePassword";
import RegisterCompany from "./components/Company/RegisterCompany/RegisterCompany";
import { MemberDashboard } from "./components/Company/MemberDashboard/MemberDashboard";
import CompanyRouteGuard from "./utils/RouteGuards/companyRouteGuard";
import { PageNotFound } from "./components/404/404";
import CompanyRegisterGuard from "./utils/RouteGuards/companyRegisterGuard";
import { PostJob } from "./components/Jobs/CreateJob/CreateJob";
import { EditJob } from "./components/Jobs/EditJob/EditJob";
import JobEditRouteGuard from "./utils/RouteGuards/jobEditRouteGuard";
import { DetailsJob } from "./components/Jobs/DetailsJob/DetailsJob";

function App() {
  const [loading, setLoading] = useState(true);
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    async function wakeUpServer() {
      let retries = 0;
      const maxRetries = 5;
      const retryDelay = 2000;

      while (retries < maxRetries) {
        try {
          const response = await fetch(
            "https://job-board-backend-7gfd.onrender.com/"
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
        <Route
          path="/"
          element={
            <MainLayout>
              <HomeSection />
            </MainLayout>
          }
        />

        <Route element={<GuestGuardRoute />}>
          <Route
            path="/login"
            element={
              <MainLayout hideHeaderFooter={true}>
                <LoginComponent />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout hideHeaderFooter={true}>
                <RegisterComponent />
              </MainLayout>
            }
          />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<MainLayout />}>
            <Route index element={<MyProfile />} />
            <Route path="setthings" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<CompanyRegisterGuard />}>
            <Route element={<MainLayout />}>
              <Route path="/register/company" element={<RegisterCompany />} />
            </Route>
          </Route>
        </Route>

        <Route element={<CompanyRouteGuard />}>
          <Route element={<MainLayout />}>
            <Route
              path="/company/:companyId/dashboard"
              element={<MemberDashboard />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/company/:companyId/post-job" element={<PostJob />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<JobEditRouteGuard />}>
            <Route element={<MainLayout />}>
              <Route
                path="/company/:companyId/job/:jobId/edit"
                element={<EditJob />}
              />
            </Route>
          </Route>
        </Route>
        
            <Route element={<ProtectedRoutes />}>
          <Route element={<JobEditRouteGuard />}>
            <Route element={<MainLayout />}>
              <Route
                path="/company/:companyId/job/:jobId/details"
                element={<DetailsJob />}
              />
            </Route>
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
