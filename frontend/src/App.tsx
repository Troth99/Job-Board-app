import { useEffect, useState } from "react";
import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import {  Route, Routes } from "react-router";
import LoginComponent from "./components/auth/Login/Login";
import HomeSection from "./components/Home/HomeSection";
import RegisterComponent from "./components/auth/Register/Register";
import MainLayout from "./components/Layouts/MainLayout";
import MyProfile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";
import ProtectedRoutes from "./RouteGuards/authRouteGuard";
import GuestGuardRoute from "./RouteGuards/guestRouteGuard";
import ChangePassword from "./components/EditProfile/ChangePassword/ChangePassword";
import RegisterCompany from "./components/Company/RegisterCompany/RegisterCompany";
import { MemberDashboard } from "./components/Company/MemberDashboard/MemberDashboard";
import CompanyRouteGuard from "./RouteGuards/companyRouteGuard";
import { PageNotFound } from "./components/404/404";
import CompanyRegisterGuard from "./RouteGuards/companyRegisterGuard";
import { PostJob } from "./components/Jobs/CreateJob/CreateJob";
import { EditJob } from "./components/Jobs/EditJob/EditJob";
import { DetailsJob } from "./components/Jobs/DetailsJob/DetailsJob";
import { JobEditRouteGuard } from "./RouteGuards/jobEditRouteGuard";  
import { useDispatch } from "react-redux";
import useCategories from "./hooks/useCategories";
import { setCategories } from "./components/Home/CategoriesSection/categoriesSlice";
import { LogOut } from "./components/auth/Logout/Logout";
import { CandidateJobView } from "./components/Jobs/CandidateJobView/CandidateJobView";
import { FilterJobByCategory } from "./components/FilterJobsByCategory/FilterJobsByCategory";

function App() {
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
       <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeSection />} /> 
        <Route path="job/:id" element={<CandidateJobView />} />
        <Route path="category/:categoryName" element={<FilterJobByCategory />} />
      </Route>

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
            <Route index element={<MyProfile LogOutComponnent={LogOut} />} />
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

      <Route element={<MainLayout />}>
          <Route
            path="/company/:companyId/job/:jobId/edit"
            element={
              <JobEditRouteGuard>
                <EditJob />
              </JobEditRouteGuard>
       
            }
          />
        </Route>
        
       <Route element={<MainLayout />}>
          <Route
            path="/company/:companyId/job/:jobId/details"
            element={
              <JobEditRouteGuard>
                <DetailsJob />
              </JobEditRouteGuard>
       
            }
          />
        </Route>
     

        <Route element={<MainLayout />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
