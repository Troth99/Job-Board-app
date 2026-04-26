import { Route } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";
import { lazy, Suspense } from "react";
import FullPageSpinner from "../components/FullPageSpinner/FullPageSpinner";
import CompanyRegisterGuard from "../RouteGuards/companyRegisterGuard";
import ProtectedRoutes from "../RouteGuards/authRouteGuard";
import CompanyRouteGuard from "../RouteGuards/companyRouteGuard";



const ViewAllCOmpaniesPage = lazy(
    () => import("../components/Company/ViewAllCompanies/ViewAllCompanies"),
)
const RegisterCompanyPage = lazy(
    () => import("../components/Company/RegisterCompany/RegisterCompany"),
)
const MemberDashboardPage = lazy(
    () => import("../components/Company/MemberDashboard/MemberDashboard"),
)

const ViewMembersPage = lazy(
    () => import("../components/Company/VIewMembemrs/ViewMembers"),
)
export const CompanyRoutes = [

       <Route element={<MainLayout />}>
          <Route
            path="/companies"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <ViewAllCOmpaniesPage />
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
              </Route>


]