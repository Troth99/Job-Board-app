import { ReactNode, useEffect } from "react";

import { Outlet } from "react-router";
import useApiRequester from "../../../hooks/shared/useApiRequester";
import { CompanyProvider, useCompanyContext } from "../../../context/CompanyContext";
import { getUserFromLocalStorage } from "../../../hooks/shared/useAuth";
import { API_BASE } from "../../../services/api";
import { Header } from "../../../components/Header/Header";
import { Footer } from "../../../components/Footer/Footer";

interface Props {
  children?: ReactNode;
  hideHeaderFooter?: boolean;
}

function MainLayoutContent({ children, hideHeaderFooter }: Props) {
  const { request } = useApiRequester();
  const { setCompany } = useCompanyContext();

  // Set company to localStorage if the user is part of a company
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchCompany = async () => {
      const user = getUserFromLocalStorage();
      if (!user?.accessToken) return;

      try {
        const companyMembership = await request(
          `${API_BASE}/companies/my-company`,
          "GET",
          {},
        );
        if (isMounted && companyMembership?._id) {
          setCompany(companyMembership);
          // Get fresh user data from localStorage (might have been updated by token refresh)
          const freshUser = getUserFromLocalStorage();
          const newUserData = { ...freshUser, company: companyMembership._id };
          localStorage.setItem("user", JSON.stringify(newUserData));
        }
      } catch (error) {
        console.error("[MainLayout] Error fetching company:", error);
      }
    };
    fetchCompany();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="app-container">
      {!hideHeaderFooter && <Header />}
      <main className="main-content">
        {children}
        <Outlet />
      </main>
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
