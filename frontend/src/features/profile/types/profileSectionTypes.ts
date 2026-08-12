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

export interface ProfileContainerProps {
  userData: User;
  avatar: string | null;
  handleFileChange: (file: File) => void;
  completionPercentage: number;
  completedFields: number;
  totalCompletionFields: number;
  isUploading: boolean
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
  [key: string]: string | undefined;
}

export interface changePasswordForm extends Record<string, string> {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}