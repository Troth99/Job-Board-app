import { ReactNode, useEffect } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router";
import { getUserFromLocalStorage } from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";

interface Props {
  children?: ReactNode;
  hideHeaderFooter?: boolean;
}

export default function MainLayout({ children, hideHeaderFooter }: Props) {
  const { getMyCompany } = useCompany();

  // Set company to localStorage if the user is part of a company
  useEffect(() => {
    const fetchCompany = async () => {
      const user = getUserFromLocalStorage();
      if (!user?.accessToken) return;

      try {
        const companyMembership = await getMyCompany();
        if (companyMembership?._id) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, company: companyMembership._id })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompany();
  }, [getMyCompany]);

  return (
    <div>
      {!hideHeaderFooter && <Header  />}
        {children}
        <Outlet /> 
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
