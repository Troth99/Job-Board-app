import { useProfile as useProfileHook } from "./profile";
import { useAvatar as useAvatarHook } from "./avatar";

export { useProfile } from "./profile";
export { useAvatar } from "./avatar";

export default function useUserProfile() {
  const profileMethods = useProfileHook();
  const avatarMethods = useAvatarHook();

  return {
    // Profile
    loading: profileMethods.loading,
    userData: profileMethods.userData,
    error: profileMethods.error,
    getLoggedInUserData: profileMethods.getLoggedInUserData,
    updateUserProfile: profileMethods.updateUserProfile,
    changePassword: profileMethods.changePassword,
    handleDeleteProfile: profileMethods.handleDeleteProfile,
    deleteUserProfile: profileMethods.deleteUserProfile,
    // Avatar
    avatar: avatarMethods.avatar,
    uploadUserProfileImage: avatarMethods.uploadUserProfileImage,
    deleteUserProfileImage: avatarMethods.deleteUserProfileImage,
    handleFileChange: avatarMethods.handleFileChange,
    handleDeleteProfileImage: avatarMethods.handleDeleteProfileImage,
  };
}
