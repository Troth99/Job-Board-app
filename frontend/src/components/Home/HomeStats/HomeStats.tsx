import "./HomeStats.css";
import { StatsResponse } from "../../../interfaces/ApplicationStatistic.model";

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
  console.log(statistics);

  //To do if there are over 1000 jobs, users or companies to show 1k+ instead of the exact number o with 100 etc
  return (
    <div className="stats-section">
      <h2 className="stats-title">Platform Statistics</h2>
      <p className="stats-desc">
        Here you can see an overview of the activity on our platform.
      </p>
      <div className="home-stats-container">
        <div className="stat-card">
          <div className="stat-value">{statistics?.jobsCount}</div>
          <div className="stat-label">Jobs</div>
          <div className="stat-info">Total job postings</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statistics?.usersCount}</div>
          <div className="stat-label">Users</div>
          <div className="stat-info">Registered users on the platform</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statistics?.companiesCount}</div>
          <div className="stat-label">Companies</div>
          <div className="stat-info">Active companies posting jobs</div>
        </div>
      </div>
    </div>
  );
}
