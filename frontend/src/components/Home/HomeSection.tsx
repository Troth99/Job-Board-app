import { useEffect, useState } from "react";
import Hero from "./HeroSection/Hero";
import { Job } from "../Jobs/CreateJob/CreateJob";
import { Category } from "../../hooks/useCategories";
import useJobs from "../../hooks/useJobs";
import useCategories from "../../hooks/useCategories";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import RecentJobs from "./RecentJobs/RecentJobs";
import FullPageSpinner from "../FullPageSpinner/FullPageSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCategories } from "./CategoriesSection/categoriesSlice";

export default function HomeSection() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getRecentJobs } = useJobs();
  const { getCategories } = useCategories();
 
const fetchRecentJobs = async () => {

  try {
    const data = await getRecentJobs()
    setRecentJobs(data)
  } catch (error) {
    console.error('Failed to fetch recent jobs.')
  }finally{
    setLoading(false)
  }
}

useEffect(() => {
fetchRecentJobs()
},[])



    if(loading || categories.length <= 0 ){
      return <FullPageSpinner/>
    }

  return (
    <div>
      <Hero />

      <CategoriesSection />
        <h1 className="recent-posted-jobs-text">Recent posted jobs.</h1>
      <RecentJobs recentJobs={recentJobs} />
    </div>
  );
}
