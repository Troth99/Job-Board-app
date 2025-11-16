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

} from "react-router";
import LoginComponent from "./components/auth/Login/Login";
import HomeSection from "./components/Home/HomeSection";
import RegisterComponent from "./components/auth/Register/Register";
import MainLayout from "./components/Layouts/MainLayout";
import MyProfile from "./components/ProfilePage/ProfilePage";
import EditProfile from "./components/EditProfile/EditProfile";

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
            <MainLayout hideHeaderFooter={true}>
              <LoginComponent />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout hideHeaderFooter={true}>
              <RegisterComponent />
            </MainLayout>
          }
        />

   
        <Route path="/profile" element={<MainLayout />}>
          <Route index element={<MyProfile />} /> 
          <Route path="setthings" element={<EditProfile />} /> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
