import { useEffect, useState } from "react";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Hero from "./components/HeroSection/Hero";

import "./styles/global.css"
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { Category, getAllCategories } from "./services/categoryService";


function App() {
const [loading, setLoading] = useState(true);
 const [loadingCategories, setLoadingCategories] = useState(true); 
  const [categories, setCategories] = useState<Category[]>([]); 

  useEffect(() => {
    async function wakeUpServer() {
      try {
        //Wake up call
        const response = await fetch("https://job-board-backend-7gfd.onrender.com/");

        if(!response.ok) {
          console.log('Server unknown response!')
        }
       
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    }

    wakeUpServer();
  }, []);

   useEffect(() => {
    async function fetchCategories() {
      setLoadingCategories(true); 
      try {
        const data = await getAllCategories(); 
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);
  return (
    <div>
      {loading && <FullPageSpinner />}
      {!loading && (
        <>
          <Header />
          <Hero />
          <CategoriesSection categories={categories} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App