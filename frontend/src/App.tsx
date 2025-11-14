import { useEffect, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import "./styles/global.css";
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router";
import LoginComponent from "./components/auth/Login/Login";
import HomeSection from "./components/Home/HomeSection";
import RegisterComponent from "./components/auth/Register/Register";
import MainLayout from "./components/Layouts/MainLayout";
import MyProfile from "./components/ProfilePage/ProfilePage";
import { AuthProvider } from "./context/UserContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    async function wakeUpServer() {
      let retries = 0;
      const maxRetries = 5;
      const retryDelay = 2000;

      while (retries < maxRetries) {
        try {
          const response = await fetch(
            "https://job-board-backend-7gfd.onrender.com/"
          );
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
      <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomeSection />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout hideHeaderFooter>
              <LoginComponent />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout hideHeaderFooter>
              <RegisterComponent />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
      
              <MainLayout>
                <MyProfile />
              </MainLayout>
         
          }
        />
      </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
