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
import { setCategories } from "./CategoriesSection/categoriesSlice";

export default function HomeSection() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
 
const fetchRecentJobs = async () => {

  try {
    const data = await getRecentJobs()
    setRecentJobs(data)
  } catch (error) {
    
  }
}

useEffect(() => {
fetchRecentJobs()
},[])



    if(categories.length <= 0){
      return <FullPageSpinner/>
    }

  return (
    <div>
      <Hero />

      <CategoriesSection />

      <RecentJobs recentJobs={recentJobs} />
    </div>
  );
}
