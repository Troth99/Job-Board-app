import { useEffect, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";


import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { BrowserRouter, Route, Router, Routes, useLocation } from "react-router";
import LoginComponent from "./components/auth/Login/Login";
import HomeSection from "./components/Home/HomeSection";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const location = useLocation();
    const [serverReady, setServerReady] = useState(false);

  const isLoginPage = location.pathname ==='/login'

  useEffect(() => {
    async function wakeUpServer() {
      let retries = 0;
      const maxRetries = 5;
      const retryDelay = 2000; // 2 seconds

      while (retries < maxRetries) {
        try {
          const response = await fetch("https://job-board-backend-7gfd.onrender.com/");
          if (response.ok) {
            setServerReady(true);
            console.log("Server is up and ready!");
            break;
          } else {
            console.log("Server returned non-OK status:", response.status);
          }
        } catch (err) {
          console.error("Error pinging the server:", err);
        }

        retries++;
        console.log(`Retrying... attempt ${retries} of ${maxRetries}`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); 
      }

      setLoading(false);
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
        <Route path="/login" element={<LoginComponent />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
