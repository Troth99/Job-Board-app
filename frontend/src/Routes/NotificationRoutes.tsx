import { lazy, Suspense } from "react";
import { Route } from "react-router";
import ProtectedRoutes from "../RouteGuards/authRouteGuard";
import MainLayout from "../components/Layouts/MainLayout";
import FullPageSpinner from "../components/FullPageSpinner/FullPageSpinner";
import { NotificationOwnerGuard } from "../RouteGuards/notificationGuard";

const NotificationsPage = lazy(
  () => import("../components/Notifications/Notifications"),
);
const CompanyInvitationNotification = lazy(
  () =>
    import("../components/Notifications/companyInvitationNotification/CompanyInvitationNotification"),
);
const NewmessageNotification = lazy(
  () =>
    import("../components/Notifications/NewMessageNotification/NewMessageNotification"),
);
const ApplicationUpdateNotification = lazy(
  () =>
    import("../components/Notifications/ApplicaitonUpdateNotification/ApplicationUpdateNotification"),
);

export const notificationsRoutes = [
  <Route element={<ProtectedRoutes />}>
    <Route element={<MainLayout />}>
      <Route
        path="/notifications"
        element={
          <Suspense fallback={<FullPageSpinner />}>
            <NotificationsPage />
          </Suspense>
        }
      />
    </Route>
  </Route>,

  <Route element={<ProtectedRoutes />}>
    <Route element={<MainLayout />}>
      <Route element={<NotificationOwnerGuard />}>
        <Route
          path="/company-invitation/:notificationId"
          element={<CompanyInvitationNotification />}
        />
        <Route
          path="/message/:notificationId"
          element={<NewmessageNotification />}
        />
        <Route
          path="/application-update/:notificationId"
          element={<ApplicationUpdateNotification />}
        />
      </Route>
    </Route>
  </Route>,
];
