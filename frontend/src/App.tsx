import { useEffect, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";


import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router";
import Login from "./components/auth/Login/Login";
import HomeSection from "./components/Home/HomeSection";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const location = useLocation();

  const isLoginPage = location.pathname ==='/login'

  useEffect(() => {
    async function wakeUpServer() {
      try {
        //Wake up call
        const response = await fetch(
          "https://job-board-backend-7gfd.onrender.com/"
        );

        if (!response.ok) {
          console.log("Server unknown response!");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    wakeUpServer();
  }, []);


  if (loading) {
    return <FullPageSpinner />;
  }
  return (
    <div>
  {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
