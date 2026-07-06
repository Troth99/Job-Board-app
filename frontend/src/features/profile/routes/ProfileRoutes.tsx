import { Route } from "react-router";
import { lazy, Suspense } from "react";
import FullPageSpinner from "../../../components/FullPageSpinner/FullPageSpinner";
import ProtectedRoutes from "../../../RouteGuards/authRouteGuard";
import { LogOut } from "../../../components/auth/Logout/Logout";
import MainLayout from "../../../shared/Layouts/MainLayout";

const MyProfile = lazy(() => import("../views/MainProfilePage/Profile"));
const EditProfile = lazy(() => import("../views/EditProfile/EditProfile"));
const ChangePassword = lazy(() => import("../views/ChangePassword/ChangePassword"));

export const ProfileRoutes = [
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
    
]



