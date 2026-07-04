export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
  createdAt?: string;
  company?: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileProps {
  LogOutComponnent: React.ComponentType;
}
