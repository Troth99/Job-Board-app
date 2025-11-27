import { ReactNode, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet, useNavigate } from "react-router";
import { getMyCompany } from "../../services/companyService";
import { getUserFromLocalStorage } from "../../services/auth/authService";

interface Props {
  children?: ReactNode;

  hideHeaderFooter?: boolean;

}

export default  function MainLayout({children, hideHeaderFooter }: Props) {

  //set company to localstorage if the user is part of a company.
    useEffect(() => {
      const fetchComapny = async () => {
        const user = getUserFromLocalStorage()
        if(!user?.accessToken) return;

        try {
          const companyMemberShip = await getMyCompany()
          if(companyMemberShip?._id){
            localStorage.setItem("user", JSON.stringify({...user, company: companyMemberShip._id}))
          }
        } catch (error) {
           console.error(error);
        }
      }
 fetchComapny()
  }, []);

  return (
    <div>
      {!hideHeaderFooter && <Header  />}
        {children}
        <Outlet /> 
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
