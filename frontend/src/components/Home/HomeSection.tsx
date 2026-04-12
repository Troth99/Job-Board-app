import { useEffect, useState } from "react";
import Hero from "./HeroSection/Hero";
import { Category } from "../../hooks/useCategories";
import useJobs from "../../hooks/useJobs";
import useCategories from "../../hooks/useCategories";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import RecentJobs from "./RecentJobs/RecentJobs";
import FullPageSpinner from "../FullPageSpinner/FullPageSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Job } from "../../interfaces/Job.model";
import { Container } from "../Container/Container";
import { HomeStats } from "./HomeStats/HomeStats";

export default function HomeSection() {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getRecentJobs } = useJobs();
  
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


//To refractor css on home page and add more content on home page

    if(loading || categories.length <= 0 ){
      return <FullPageSpinner/>
    }

  return (
    <div>
      <Hero />
      <Container>
      <CategoriesSection />
        <h1 className="recent-posted-jobs-text">Discover the Latest Opportunities</h1>
        {/* Alternative ideas for section title:
          <h1 className="recent-posted-jobs-text">Hot Jobs Right Now</h1>
        */}
      <RecentJobs recentJobs={recentJobs} />
      <HomeStats></HomeStats>
    </Container>
    </div>
  );
}
