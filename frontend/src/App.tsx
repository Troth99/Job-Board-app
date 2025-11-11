import { useEffect, useState } from "react";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Hero from "./components/HeroSection/Hero";

import "./styles/global.css"
import FullPageSpinner from "./components/FullPageSpinner/FullPageSpinner";
import { Category, getAllCategories } from "./services/categoryService";
import RecentJobs from "./components/Jobs/RecentJobs/RecentJobs";
import { getRecentJobs } from "./services/jobService";
import { Job } from "./components/Jobs/CreateJob/CreateJob";




function App() {
const [loading, setLoading] = useState(true);
 const [loadingCategories, setLoadingCategories] = useState(true); 
  const [categories, setCategories] = useState<Category[]>([]); 
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [isAppReady, setIsAppReady] = useState(false)

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
      try {
        const data = await getAllCategories();
        
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchRecentJobs(){
      try {
        const recentJobs = await getRecentJobs(5);
        console.log('recent jobs', recentJobs)
        setRecentJobs(recentJobs)
      } catch (error) {
         console.error("Error loading recent jobs!:", error);
      }
    }
    fetchRecentJobs()
  }, [])

   if (loading) {
    return <FullPageSpinner />;
  }
   return (
    <div>
      <Header />
      <Hero />
      <CategoriesSection categories={categories} />
      <RecentJobs recentJobs={recentJobs} />
      <Footer />
    </div>
  );
}


export default App