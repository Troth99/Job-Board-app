import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";


interface ThemeContentType {
    theme: string,
    toggleTheme: () => void;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
