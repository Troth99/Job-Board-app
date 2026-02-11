export interface UserShort {
  _id: string;
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface CompanyShort {
  _id: string;
  name?: string;
}

export interface Notification {
  _id: string;
  user: string | UserShort;
  sender?: string | UserShort;
  type: string;
  message: string;
  isRead: boolean;
  actionRequired: boolean;
  actionType?: string;
  link?: string;
  company?: string | CompanyShort;
  createdAt: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}
