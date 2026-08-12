import { StatsResponse } from "../../types/ApplicationStatistic.model";
import "./HomeStats.css";
import { Trans } from "@lingui/react/macro";

export function HomeStats({
  statistics,
}: {
  statistics: StatsResponse | null;
}) {
  
  let { jobsCount, usersCount } = statistics || {};

  if (
    jobsCount !== undefined &&
    usersCount !== undefined &&
    statistics !== null
  ) {
    jobsCount = Number(jobsCount);
    usersCount = Number(usersCount);

    switch (true) {
      case jobsCount >= 100 && jobsCount < 500:
        statistics.jobsCount = "100+";
        break;
      case jobsCount >= 500 && jobsCount < 1000:
        statistics.jobsCount = "500+";
        break;
      case jobsCount >= 1000 && jobsCount < 5000:
        statistics.jobsCount = "1000+";
        break;
      case jobsCount >= 5000 && jobsCount < 10000:
        statistics.jobsCount = "5000+";
        break;
    }

    switch (true) {
      case usersCount >= 100 && usersCount < 500:
        statistics.usersCount = "100+";
        break;
      case usersCount >= 500 && usersCount < 1000:
        statistics.usersCount = "500+";
        break;
      case usersCount >= 1000 && usersCount < 5000:
        statistics.usersCount = "1000+";
        break;
      case usersCount >= 5000 && usersCount < 10000:
        statistics.usersCount = "5000+";
        break;
    }
  }
  return (
    <div className="stats-section">
      <h2 className="stats-title"><Trans>Platform Statistics</Trans></h2>
      <p className="stats-desc">
        <Trans>Here you can see an overview of the activity on our platform.</Trans>
      </p>
      <div className="home-stats-container">
        <div className="stat-card">
          <div className="stat-value">{statistics?.jobsCount}</div>
          <div className="stat-label"><Trans>Jobs</Trans></div>
          <div className="stat-info"><Trans>Total job postings</Trans></div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statistics?.usersCount}</div>
          <div className="stat-label"><Trans>Users</Trans></div>
          <div className="stat-info"><Trans>Registered users on the platform</Trans></div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statistics?.companiesCount}</div>
          <div className="stat-label"><Trans>Companies</Trans></div>
          <div className="stat-info"><Trans>Active companies posting jobs</Trans></div>
        </div>
      </div>
    </div>
  );
}
