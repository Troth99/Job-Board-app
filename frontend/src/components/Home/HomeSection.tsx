import { useEffect, useState } from "react";
import Hero from "./HeroSection/Hero";
import { Category } from "../../hooks/utils/useCategoriesIndex";
import useJobs from "../../hooks/utils/useJobBoard";
import useCategories from "../../hooks/utils/useCategoriesIndex";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import RecentJobs from "./RecentJobs/RecentJobs";
import FullPageSpinner from "../FullPageSpinner/FullPageSpinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Job } from "../../interfaces/Job.model";
import { Container } from "../Container/Container";
import { HomeStats } from "./HomeStats/HomeStats";
import useStatistics from "../../hooks/useStatistics";
import { StatsResponse } from "../../interfaces/ApplicationStatistic.model";
import { generateSeoConfig } from "../../seo/seo";
import MetaData from "../../seo/MetaDataTags";

export default function HomeSection() {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [applicationStatistics, setApplicationStatistics] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { getRecentJobs } = useJobs();
  const { getApllicationStatistics } = useStatistics();
  const seo = generateSeoConfig("home");
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

const fetchApplicationStatistics = async () => { 
  try {
    const statisticData = await getApllicationStatistics()
    setApplicationStatistics(statisticData)
  } catch (error) {
    console.error('Failed to fetch application statistics.')
  } finally{
    setLoading(false)
  }
}


useEffect(() => {
fetchRecentJobs()
fetchApplicationStatistics()
},[])

  return (
    <div>
      <MetaData seo={seo} />

      {loading || categories.length <= 0 ? (
        <FullPageSpinner />
      ) : (
      <>
      <Hero />
      <Container>
      <CategoriesSection />
        <h1 className="recent-posted-jobs-text">Discover the Latest Opportunities</h1>
        {/* Alternative ideas for section title:
          <h1 className="recent-posted-jobs-text">Hot Jobs Right Now</h1>
        */}
      <RecentJobs recentJobs={recentJobs} />
      <HomeStats statistics={applicationStatistics}></HomeStats>
    </Container>
    </>
      )}
      </div>
  );
}
