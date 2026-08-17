import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { ShowJobs } from "../../components/showJobs/showCompanyJobs";
import { Job } from "../../../jobs/types/Job.model";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import useJobs from "../../../jobs/hooks/useJobsAPI";
import "../../styles/viewAllJobsForCompany.css";
import Pagination from "../../../../shared/components/Pagination/Pagination";

// to refractor css

const ITEMS_PER_PAGE = 5; // Number of jobs to display per page

export function ViewAllJobsForCompany() {
  const { companyId } = useParams();
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const { loading, getJobsByCompany } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalJobsCount, setTotalJobsCount] = useState<number>(0); 

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 5);

  useEffect(() => {
    const fetchJobsByCompany = async () => {
      try {
        if (!companyId) {
          throw new Error("Company id is missing.");
        }
        const data = await getJobsByCompany(
          companyId,
          ITEMS_PER_PAGE,
          pageFromUrl,
        );
        console.log(data)
        setCompanyJobs(data.jobs);
        setTotalJobsCount(data.totalJobs);
      } catch (error) {
        console.error("Failed to fetch jobs from current company.");
      }
    };
    fetchJobsByCompany();
  }, [companyId, pageFromUrl]);
  return (
<div className="view-all-jobs-container">
      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <>
          <ShowJobs jobs={companyJobs} />

          {totalJobsCount > 0 && (
            <Pagination
              currentPage={pageFromUrl}
              totalPages={Math.ceil(totalJobsCount / ITEMS_PER_PAGE)}
              totalItems={totalJobsCount}
              itemsPerPage={ITEMS_PER_PAGE}
              currentItemsCount={companyJobs.length}
              onPageChange={(page) => setSearchParams({ page: page.toString() })}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ViewAllJobsForCompany;
