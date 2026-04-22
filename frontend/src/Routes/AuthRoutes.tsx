import { lazy, Suspense } from "react";
import { Route } from "react-router";
import GuestGuardRoute from "../RouteGuards/guestRouteGuard";
import MainLayout from "../components/Layouts/MainLayout";
import FullPageSpinner from "../components/FullPageSpinner/FullPageSpinner";

const LoginComponent = lazy(() => import("../components/auth/Login/Login"));

const RegisterComponent = lazy(
  () => import("../components/auth/Register/Register"),
);

const ResetPassowrd = lazy(
  () => import("../components/auth/Reset-password/Reset-password"),
);

const ForgotPassowrd = lazy(    
    () => import("../components/auth/forgot-password/Forgot-Password"),
);
export const authRoutes = (setUserId: (id: string) => void) => [
  <Route element={<GuestGuardRoute />}>
    <Route
      path="/login"
      element={
        <MainLayout hideHeaderFooter={true}>
          <Suspense fallback={<FullPageSpinner />}>
            <LoginComponent setUserId={setUserId} />
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
      path="/reset-password/:token"
      element={
        <MainLayout hideHeaderFooter={true}>
          <Suspense fallback={<FullPageSpinner />}>
            <ResetPassowrd />
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
    

  </Route>,
];
