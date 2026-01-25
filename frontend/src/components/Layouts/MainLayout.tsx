import { ReactNode, useEffect } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router";
import { getUserFromLocalStorage } from "../../hooks/useAuth";
import { CompanyProvider, useCompanyContext } from "../../context/CompanyContext";
import useApiRequester from "../../hooks/useApiRequester";
import { API_BASE } from "../../services/api";

interface Props {
  children?: ReactNode;
  hideHeaderFooter?: boolean;
}

function MainLayoutContent({ children, hideHeaderFooter }: Props) {
  const { request } = useApiRequester();
  const { setCompany } = useCompanyContext();

  // Set company to localStorage if the user is part of a company
  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true;

    const fetchCompany = async () => {
      const user = getUserFromLocalStorage();
      if (!user?.accessToken) return;

      try {
        const companyMembership = await request(
          `${API_BASE}/companies/my-company`,
          "GET",
          {}
        );
        if (isMounted && companyMembership?._id) {
          setCompany(companyMembership);
          // Get fresh user data from localStorage (might have been updated by token refresh)
          const freshUser = getUserFromLocalStorage();
          localStorage.setItem(
            "user",
            JSON.stringify({ ...freshUser, company: companyMembership._id })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompany();

    return () => {
      isMounted = false;
      controller.abort()
    };
  }, []);

  return (
    <div className="app-container">
      {!hideHeaderFooter && <Header  />}
        {children}
        <Outlet /> 
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default function MainLayout(props: Props) {
  return (
    <CompanyProvider>
      <MainLayoutContent {...props} />
    </CompanyProvider>
  );
}
