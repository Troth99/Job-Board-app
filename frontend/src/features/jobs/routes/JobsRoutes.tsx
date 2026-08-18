import { lazy, Suspense } from "react";
import { Route } from "react-router";
import { RoleGuard } from "../../companies/guards/RoleGuard";
import ProtectedRoutes from "../../auth/guards/authRouteGuard";
import { JobEditRouteGuard } from "../guards/jobEditRouteGuard";
import { JobDetailsRouteGuard } from "../guards/jobDetailsRouteGuard";
import MainLayout from "../../../shared/Layouts/MainLayout";
import FullPageSpinner from "../../../shared/components/FullPageSpinner/FullPageSpinner";

const ViewAllJobs = lazy(() => {
  return import("../views/ViewAllJobs/ViewAllJobs");
});
const DetailsJob = lazy(() => {
  return import("../views/DetailsJob/JobActions");
});
const PostJob = lazy(() => import("../views/CreateJob/CreateJob"));
const EditJob = lazy(() => import("../views/EditJob/EditJob"));
const ViewAllJobsForCompany = lazy(
  () =>
    import("../../companies/views/ViewAllJobsForCompany/ViewAllJobsForCompany"),
);
const CandidateJobView = lazy(
  () => import("../views/JobDetailsView/JobDetailsView"),
);
const FilterJobByCategory = lazy(
  () => import("../views/FilterJobsByCategory/FilterJobsByCategory"),
);

const HowToPostJobInfo = lazy(
  () => import("../views/HowToPostJobInfo/HowToPostJobInfo"),
);

const FavouriteJobsView = lazy(
  () => import("../views/SavedJobView/SavedJobView"),
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
    <Route
      path="how-to-post-job"
      element={
        <Suspense fallback={<FullPageSpinner />}>
          <HowToPostJobInfo />
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

  <Route element={<ProtectedRoutes />}>
    <Route element={<MainLayout />}>
      <Route
        path="/favourite-jobs"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <FavouriteJobsView />
          </Suspense>
        }
      />
    </Route>
  </Route>,
];
