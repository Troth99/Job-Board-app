import { Navigate, Route } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "../../auth/guards/authRouteGuard";

import MainLayout from "../../../shared/Layouts/MainLayout";
import { LogOut } from "../../auth/views/Logout/Logout";
import FullPageSpinner from "../../../shared/components/FullPageSpinner/FullPageSpinner";
import { profilePaths } from "./profilePaths";
import MyProfile from "../views/MainProfilePage/Profile";

const EditProfile = lazy(() => import("../views/EditProfile/EditProfile"));
const ChangePassword = lazy(() => import("../views/ChangePassword/ChangePassword"));

export const ProfileRoutes = [
  <Route key="profile-routes" element={<ProtectedRoutes />}>
    <Route path={profilePaths.root} element={<MainLayout />}>
      <Route
        index
        element={<MyProfile LogOutComponnent={LogOut} />}
      />
      <Route path="setthings" element={<Navigate to={profilePaths.settings} replace />} />
      <Route
        path="settings"
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
  </Route>,
];



