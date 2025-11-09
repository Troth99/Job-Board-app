import { useEffect, useState } from "react";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Hero from "./components/HeroSection/Hero";

import "./styles/global.css"
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";


function App() {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function wakeUpServer() {
      try {

        //Wake up call

        const response = await fetch("https://job-board-backend-7gfd.onrender.com/");

        if(!response.ok) {
         setLoading(false); 
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    }

    wakeUpServer();
  }, []);
  return (
    <div>
      {loading && <FullPageSpinner />}
      {!loading && (
        <>
          <Header />
          <Hero />
          <CategoriesSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App