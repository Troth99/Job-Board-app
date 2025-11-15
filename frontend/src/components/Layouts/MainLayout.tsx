import { ReactNode, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router";

interface Props {
  children: ReactNode;
  hideHeaderFooter?: boolean;

}

export default function MainLayout({ children, hideHeaderFooter }: Props) {
  
  return (
    <div>
      {!hideHeaderFooter && <Header  />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
