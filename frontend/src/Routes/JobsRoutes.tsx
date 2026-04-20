import { lazy, Suspense } from "react";
import { Route } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";
import FullPageSpinner from "../components/FullPageSpinner/FullPageSpinner";
import { RoleGuard } from "../RouteGuards/RoleGuard";
import ProtectedRoutes from "../RouteGuards/authRouteGuard";
import { JobEditRouteGuard } from "../RouteGuards/jobEditRouteGuard";
import { JobDetailsRouteGuard } from "../RouteGuards/jobDetailsRouteGuard";

const ViewAllJobs = lazy(() => {
  return import("../components/Jobs/ViewAllJobs/ViewAllJobs");
});

const DetailsJob = lazy(() => {
  return import("../components/Jobs/DetailsJob/DetailsJob");
});

const PostJob = lazy(() => import("../components/Jobs/CreateJob/CreateJob"));

const EditJob = lazy(() => import("../components/Jobs/EditJob/EditJob"));

const ViewAllJobsForCompany = lazy(
  () =>
    import("../components/Company/ViewAllJobsForCompany/ViewAllJobsForCompany"),
);

const CandidateJobView = lazy(
  () => import("../components/Jobs/CandidateJobView/CandidateJobView"),
);

const FilterJobByCategory = lazy(
  () => import("../components/FilterJobsByCategory/FilterJobsByCategory"),
);

const JOB_ALLOWED_ROLES = ["owner", "admin", "recruiter"];

export const jobsRoutes = [
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
      path="job/:jobId"
      element={
        <Suspense fallback={<FullPageSpinner />}>
          <CandidateJobView />
        </Suspense>
      }
    />
    <Route
      path="category/:categoryName"
      element={
        <Suspense fallback={<FullPageSpinner />}>
            <FilterJobByCategory />
        </Suspense>
        }
        />
  </Route>,

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
      <Route
        path="/company/:companyId/jobs"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <ViewAllJobsForCompany />
          </Suspense>
        }
      />
    </Route>
  </Route>,
  <Route element={<ProtectedRoutes />}>
    <Route element={<MainLayout />}>
      <Route
        path="/company/:companyId/job/:jobId/details"
        element={
          <RoleGuard allowedRoles={JOB_ALLOWED_ROLES}>
            <JobDetailsRouteGuard>
              <Suspense fallback={<FullPageSpinner />}>
                <DetailsJob />
              </Suspense>
            </JobDetailsRouteGuard>
          </RoleGuard>
        }
      />
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
  </Route>,

  // Placeholder for future job-related routes
  //refractor from app.tsx
];
