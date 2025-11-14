import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode; 
}

 interface User {
  id: string,
  email: string;
  token: string
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
  const context = useContext(AuthContext);
  
 
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export const AuthProvider = ({children} : AuthProviderProps) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


    const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

    const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
  };

 
  return (
   <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}