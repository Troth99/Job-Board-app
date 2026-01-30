import { createContext, useContext, useState, useEffect, ReactNode } from "react";
type UserDataType = any;

interface UserDataContextType {
  userData: UserDataType;
  setUserData: (data: UserDataType) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) throw new Error("useUserData must be used within a UserDataProvider");
  return context;
};

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