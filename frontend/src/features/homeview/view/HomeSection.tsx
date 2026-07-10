import { useSelector } from "react-redux";
import { Job } from "../../jobs/types/Job.model";
import { useEffect, useState } from "react";
import { StatsResponse } from "../types/ApplicationStatistic.model";
import useStatistics from "../hooks/useStatistics";
import useJobs from "../../jobs/hooks/useJobsAPI";
import { generateSeoConfig } from "../../../seo/seo";
import MetaData from "../../../seo/MetaDataTags";
import FullPageSpinner from "../../../shared/components/FullPageSpinner/FullPageSpinner";
import { Container } from "../../../shared/components/Container/Container";

import { RootState } from "../../../store/store";
import Hero from "../components/HeroSection/Hero";
import CategoriesSection from "../../categories/components/CategoriesSection/CategoriesSection";
import RecentJobs from "../components/RecentJobs/RecentJobs";
import { HomeStats } from "../components/HomeStats/HomeStats";

export default function HomeSection() {
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [applicationStatistics, setApplicationStatistics] =
    useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { getRecentJobs } = useJobs();
  const { getApllicationStatistics } = useStatistics();
  const seo = generateSeoConfig("home");
  const fetchRecentJobs = async () => {
    try {
      const data = await getRecentJobs();
      setRecentJobs(data);
    } catch (error) {
      console.error("Failed to fetch recent jobs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationStatistics = async () => {
    try {
      const statisticData = await getApllicationStatistics();
      setApplicationStatistics(statisticData);
    } catch (error) {
      console.error("Failed to fetch application statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentJobs();
    fetchApplicationStatistics();
  }, []);

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
            <h1 className="recent-posted-jobs-text">
              Discover the Latest Opportunities
            </h1>
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
