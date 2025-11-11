import { useEffect, useState } from "react";
import Hero from "./HeroSection/Hero";
import { Job } from "../Jobs/CreateJob/CreateJob";
import { Category, getCategories } from "../../services/categoryService";
import { getRecentJobs } from "../../services/jobService";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import RecentJobs from "./RecentJobs/RecentJobs";
import FullPageSpinner from "../FullPageSpinner/FullPageSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCategories } from "../Home/CategoriesSection/categoriesSlice";

export default function HomeSection() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      if (categories.length === 0) {
        try {
          const data = await getCategories();
          dispatch(setCategories(data));
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    }
    loadCategories();
  }, [dispatch, categories]);

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

      <CategoriesSection />

      <RecentJobs recentJobs={recentJobs} />
    </div>
  );
}
