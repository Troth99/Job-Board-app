import { ReactNode, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet, useNavigate } from "react-router";

interface Props {
  children?: ReactNode;

  hideHeaderFooter?: boolean;

}

export default function MainLayout({children, hideHeaderFooter }: Props) {
  
  return (
    <div>
      {!hideHeaderFooter && <Header  />}
        {children}
        <Outlet /> 
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
