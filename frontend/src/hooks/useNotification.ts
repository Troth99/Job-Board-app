import { useNotifications, } from "./notifications";

export { useNotifications, useSortedNotifications } from "./notifications";

export function useNotification() {
  const notificationMethods = useNotifications();

  return {
    loading: notificationMethods.loading,
    getAllNotificationsForUser: notificationMethods.getAllNotificationsForUser,
    getNotificationById: notificationMethods.getNotificationById,
    createNotification: notificationMethods.createNotification,
    createNotificationByEmail: notificationMethods.createNotificationByEmail,
    deleteNotification: notificationMethods.deleteNotification,
    markAsRead: notificationMethods.markAsRead,
  };
}

