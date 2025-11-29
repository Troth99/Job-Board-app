import { createContext, ReactNode, use, useState } from "react";
import { Company } from "../hooks/useCompany";

interface CompanyContextType {
  company: Company | null;
  setCompany: (company: Company | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);


export function CompanyProvider({children}: {children: ReactNode}){
    const [company, setCompany] = useState<Company | null>(null);


    return (
         <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
    )
}


export function useCompanyContext() {
  const context = use(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext must be used within CompanyProvider');
  }
  return context;
}