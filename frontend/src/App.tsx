import { useEffect, useState } from "react";
import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { Route, Routes } from "react-router";
import MainLayout from "./components/Layouts/MainLayout";
import ProtectedRoutes from "./RouteGuards/authRouteGuard";
import GuestGuardRoute from "./RouteGuards/guestRouteGuard";
import CompanyRouteGuard from "./RouteGuards/companyRouteGuard";
import { PageNotFound } from "./components/404/404";
import CompanyRegisterGuard from "./RouteGuards/companyRegisterGuard";
import { JobEditRouteGuard } from "./RouteGuards/jobEditRouteGuard";
import { useDispatch } from "react-redux";
import useCategories from "./hooks/useCategories";
import { setCategories } from "./components/Home/CategoriesSection/categoriesSlice";
import { LogOut } from "./components/auth/Logout/Logout";
import { CandidateJobView } from "./components/Jobs/CandidateJobView/CandidateJobView";
import { FilterJobByCategory } from "./components/FilterJobsByCategory/FilterJobsByCategory";
import { lazy, Suspense } from "react";
import SearchResults from "./components/Home/Search/SearchResults/SearchResults";
import { RoleGuard } from "./RouteGuards/RoleGuard";
import useCompany from "./hooks/useCompany";
import { ViewMembers } from "./components/Company/VIewMembemrs/ViewMembers";
import { ForgotPassowrd } from "./components/auth/forgot-password/Forgot-Password";

const JOB_ALLOWED_ROLES = ["owner", "admin", "recruiter"];

// Lazy loaded components
const LoginComponent = lazy(() => import("./components/auth/Login/Login"));
const RegisterComponent = lazy(
  () => import("./components/auth/Register/Register")
);
const RegisterCompany = lazy(
  () => import("./components/Company/RegisterCompany/RegisterCompany")
);
const MyProfile = lazy(() => import("./components/Profile/Profile"));
const EditProfile = lazy(() => import("./components/EditProfile/EditProfile"));
const ChangePassword = lazy(
  () => import("./components/EditProfile/ChangePassword/ChangePassword")
);
const PostJob = lazy(() => import("./components/Jobs/CreateJob/CreateJob"));
const EditJob = lazy(() => import("./components/Jobs/EditJob/EditJob"));
const DetailsJob = lazy(
  () => import("./components/Jobs/DetailsJob/DetailsJob")
);
const ViewAllJobs = lazy(
  () => import("./components/Jobs/ViewAllJobs/ViewAllJobs")
);
const ViewAllJobsForCompany = lazy(
  () =>
    import("./components/Company/ViewAllJobsForCompany/ViewAllJobsForCompany")
);
const ViewAllCompanies = lazy(
  () => import("./components/Company/ViewAllCompanies/ViewAllCompanies")
);

//lazy loaded components
const MemberDashboard = lazy(
  () => import("./components/Company/MemberDashboard/MemberDashboard")
);
const HomeSection = lazy(() => import("./components/Home/HomeSection"));

function App() {
  const [loading, setLoading] = useState(true);
  const [serverReady, setServerReady] = useState(false);
  const dispatch = useDispatch();
  const { getCategories } = useCategories();
  const { userRole } = useCompany();

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
          <Route
            index
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <HomeSection />
              </Suspense>
            }
          />
          <Route path="job/:jobId" element={<CandidateJobView />} />
          <Route
            path="category/:categoryName"
            element={<FilterJobByCategory />}
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/search" element={<SearchResults />} />
        </Route>

        <Route element={<GuestGuardRoute />}>
          <Route
            path="/login"
            element={
              <MainLayout hideHeaderFooter={true}>
                <Suspense fallback={<FullPageSpinner />}>
                  <LoginComponent />
                </Suspense>
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout hideHeaderFooter={true}>
                <Suspense fallback={<FullPageSpinner />}>
                  <RegisterComponent />
                </Suspense>
              </MainLayout>
            }
          />
          <Route 
            path="/auth/forgot-password"
            element={
              <MainLayout>
                <ForgotPassowrd></ForgotPassowrd>
              </MainLayout>
            }
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="/jobs"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <ViewAllJobs />
              </Suspense>
            }
          />
          <Route
            path="/companies"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <ViewAllCompanies />
              </Suspense>
            }
          />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<FullPageSpinner />}>
                  <MyProfile LogOutComponnent={LogOut} />
                </Suspense>
              }
            />
            <Route
              path="setthings"
              element={
                <Suspense fallback={<FullPageSpinner />}>
                  <EditProfile />
                </Suspense>
              }
            />
            <Route
              path="change-password"
              element={
                <Suspense fallback={<FullPageSpinner />}>
                  <ChangePassword />
                </Suspense>
              }
            />
          </Route>
        </Route>

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
            <Route
              path="/company/:companyId/job/:jobId/details"
              element={
                <RoleGuard allowedRoles={JOB_ALLOWED_ROLES}>
                  <Suspense fallback={<FullPageSpinner />}>
                    <DetailsJob />
                  </Suspense>
                </RoleGuard>
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

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route
              path="/company/:companyId/post-job"
              element={
                <RoleGuard allowedRoles={JOB_ALLOWED_ROLES}>
                  <Suspense fallback={<FullPageSpinner />}>
                    <PostJob />
                  </Suspense>
                </RoleGuard>
              }
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route
              path="/company/:companyId/jobs"
              element={
                <Suspense fallback={<FullPageSpinner />}>
                  <ViewAllJobsForCompany />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/company/:companyId/job/:jobId/edit"
            element={
              <RoleGuard allowedRoles={JOB_ALLOWED_ROLES}>
                <JobEditRouteGuard>
                  <Suspense fallback={<FullPageSpinner />}>
                    <EditJob />
                  </Suspense>
                </JobEditRouteGuard>
              </RoleGuard>
            }
          />
        </Route>

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
