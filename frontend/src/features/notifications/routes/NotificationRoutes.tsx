import { lazy, Suspense } from "react";
import { Route } from "react-router";
import ProtectedRoutes from "../../../RouteGuards/authRouteGuard";

import { NotificationOwnerGuard } from "../../../RouteGuards/notificationGuard";
import MainLayout from "../../../shared/Layouts/MainLayout";
import FullPageSpinner from "../../../shared/components/FullPageSpinner/FullPageSpinner";

const NotificationsPage = lazy(
  () => import("../views/NotificationView/Notifications"),
);
const CompanyInvitationNotification = lazy(
  () =>
    import("../components/companyInvitationNotification/CompanyInvitationNotification"),
);
const NewmessageNotification = lazy(
  () =>
    import("../components/NewMessageNotification/NewMessageNotification"),
);
const ApplicationUpdateNotification = lazy(
  () =>
    import("../components/ApplicaitonUpdateNotification/ApplicationUpdateNotification"),
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
