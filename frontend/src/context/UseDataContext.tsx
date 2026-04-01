import { createContext, useContext, useState, useEffect, ReactNode } from "react";
type UserDataType = any;

interface UserDataContextType {
  userData: UserDataType;
  setUserData: (data: UserDataType) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);
// Custom hook to use the UserDataContext

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) throw new Error("useUserData must be used within a UserDataProvider");
  return context;
};

// Provider component to wrap the app and provide user data context
export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};