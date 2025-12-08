import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import useUserProfile from "../hooks/useProfile";
import useCompany from "../hooks/useCompany";

interface RoleContextType {
  userRole: string | null | undefined;
  setUserRole: (role: string | null) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null | undefined>(undefined);
  const { userData } = useUserProfile();
  const { getUserRole } = useCompany();

  useEffect(() => {
    async function fetchRole() {
      if (userData?.company) {
        try {
          const role = await getUserRole(userData.company);
          console.log(role)
          setUserRole(role);
        } catch (err) {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    }
    fetchRole();
  }, [userData?.company]);

  return (
    <RoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
