import { Route } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";
import { lazy, Suspense } from "react";
import FullPageSpinner from "../components/FullPageSpinner/FullPageSpinner";
import ProtectedRoutes from "../RouteGuards/authRouteGuard";
import { LogOut } from "../components/auth/Logout/Logout";

const MyProfile = lazy(() => import("../components/Profile/Profile"));
const EditProfile = lazy(() => import("../components/EditProfile/EditProfile"));
const ChangePassword = lazy(() => import("../components/EditProfile/ChangePassword/ChangePassword"));

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



