import { useEffect, useState } from "react";
import Hero from "./HeroSection/Hero";
import { Job } from "../Jobs/CreateJob/CreateJob";
import { Category, getAllCategories } from "../../services/categoryService";
import { getRecentJobs } from "../../services/jobService";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import RecentJobs from "./RecentJobs/RecentJobs";
import FullPageSpinner from "../FullPageSpinner/FullPageSpinner";

export default function HomeSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally { 
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchRecentJobs() {
      try {
        const jobs = await getRecentJobs(5);
        setRecentJobs(jobs);
      } catch (error) {
        console.error("Error loading recent jobs!", error);
      }
    }
    fetchRecentJobs();
  }, []);


    useEffect(() => {
    if (categories.length > 0 && recentJobs.length > 0) {
      setLoading(false); 
    }
  }, [categories, recentJobs]);


    if (loading) {
    return <FullPageSpinner />;
  }
  
  return (
    <div>
      <Hero />

      <CategoriesSection categories={categories} />

      <RecentJobs recentJobs={recentJobs} />
    </div>
  );
}
