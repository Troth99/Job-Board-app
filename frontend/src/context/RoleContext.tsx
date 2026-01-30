import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUserData } from "./UseDataContext";
import useCompany from "../hooks/useCompany";

interface RoleContextType {
  userRole: string | null | undefined;
  setUserRole: (role: string | null) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null | undefined>(undefined);
  const { getUserRole } = useCompany();
  const { userData } = useUserData();

  useEffect(() => {

    if (!userData || !userData.company) {
      setUserRole(null);
      return;
    }
    async function fetchRole() {
      try {
        const role = await getUserRole(userData.company);
        setUserRole(role);
      } catch (err) {
        setUserRole(null);
      }
    }
    fetchRole();
  }, [userData]);

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