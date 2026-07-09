import { lazy, Suspense } from "react";
import { Route } from "react-router";
import GuestGuardRoute from "../../../RouteGuards/guestRouteGuard";
import MainLayout from "../../../shared/Layouts/MainLayout";
import FullPageSpinner from "../../../shared/components/FullPageSpinner/FullPageSpinner";

const LoginComponent = lazy(() => import("../views/Login/Login"));

const RegisterComponent = lazy(
  () => import("../views/Register/Register"),
);

const ResetPassowrd = lazy(
  () => import("../views/Reset-password/Reset-password"),
);

const ForgotPassowrd = lazy(
  () => import("../views/forgot-password/Forgot-Password"),
);

const OAuthCallback = lazy(
  () => import("../views/OAuthCallback/OAuthCallback"),
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
    <Route
      path="/oauth-callback"
      element={
        <MainLayout hideHeaderFooter={true}>
          <Suspense fallback={<FullPageSpinner />}>
            <OAuthCallback setUserId={setUserId} />
          </Suspense>
        </MainLayout>
      }
    />
  </Route>,
];
