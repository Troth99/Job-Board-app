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

export default function HomeSection() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {

    if(categories){
      setLoading(false)
    }

  })

    if(loading){
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
