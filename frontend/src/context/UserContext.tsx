import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode; 
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
    return useContext(AuthContext)
}

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