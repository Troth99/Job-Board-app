import { Route } from "react-router";

import { lazy, Suspense } from "react";

import CompanyRegisterGuard from "../guards/companyRegisterGuard";
import ProtectedRoutes from "../../auth/guards/authRouteGuard";
import CompanyRouteGuard from "../guards/companyRouteGuard";
import { UpdateCompanyRouteGuard } from "../guards/updateCompanyGuard";
import MainLayout from "../../../shared/Layouts/MainLayout";
import FullPageSpinner from "../../../shared/components/FullPageSpinner/FullPageSpinner";


const UpdateCompany = lazy(
  () => import("../views/UpdateCompany/UpdateCompany"),
);
const ViewAllCompaniesPage = lazy(
  () => import("../../../features/companies/views/ViewAllCompanies/ViewAllCompanies"),
);
const RegisterCompanyPage = lazy(
  () => import("../views/RegisterCompany/RegisterCompany"),
);
const MemberDashboardPage = lazy(
  () => import("../views/Dashboard/Dashboard"),
);

const ViewMembersPage = lazy(
  () => import("../views/ViewMembemrs/ViewMembers"),
);
export const CompanyRoutes = [
  <Route element={<MainLayout />}>
    <Route
      path="/companies"
      element={
        <Suspense fallback={<FullPageSpinner />}>
          <ViewAllCompaniesPage />
        </Suspense>
      }
    />
  </Route>,

  <Route element={<ProtectedRoutes />}>
    <Route element={<CompanyRegisterGuard />}>
      <Route element={<MainLayout />}>
        <Route
          path="/register/company"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <RegisterCompanyPage />
            </Suspense>
          }
        />
      </Route>
    </Route>
  </Route>,
  <Route element={<CompanyRouteGuard />}>
    <Route element={<MainLayout />}>
      <Route
        path="/company/:companyId/dashboard"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <MemberDashboardPage />
          </Suspense>
        }
      />
    </Route>
  </Route>,
  <Route element={<MainLayout />}>
    <Route element={<CompanyRouteGuard />}>
      <Route
        path="/company/:companyId/members"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <ViewMembersPage />
          </Suspense>
        }
      ></Route>
    </Route>
  </Route>,

  <Route element={<MainLayout />}>
    <Route element={<UpdateCompanyRouteGuard />}>
      <Route
        path="/company/:companyId/update"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <UpdateCompany />
          </Suspense>
        }
      ></Route>
    </Route>
  </Route>,
];
