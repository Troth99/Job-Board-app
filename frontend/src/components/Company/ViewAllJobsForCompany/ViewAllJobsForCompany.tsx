import { useEffect, useState } from "react";
import useJobs from "../../../hooks/useJobs";
import { useParams, useSearchParams } from "react-router";
import { ShowJobs } from "../showJobs/showCompanyJobs";
import "./viewAllJobsForComapny.css";
import { Job } from "../../../interfaces/Job.model";
import { usePagination } from "../../../hooks/usePagination";
import Spinner from "../../Spinner/Spinner";

export function ViewAllJobsForCompany() {
  const { companyId } = useParams();
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const { loading, getJobsByCompany } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
 
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const { currentItems, totalPages } = usePagination(companyJobs, 5, pageFromUrl);

  useEffect(() => {
    const fetchJobsByCompany = async () => {
      try {
        if (!companyId) {
          throw new Error("Company id is missing.");
        }
        const response = await getJobsByCompany(companyId);
        console.log(response);
        setCompanyJobs(response);
        return response;
      } catch (error) {
        console.error("Failed to fetch jobs from current company.");
      }
    };
    fetchJobsByCompany();
  }, []);

  if (loading) {
    return <Spinner overlay={true} />;
  }
  return (
    <div className="view-all-jobs-container">
      <ShowJobs jobs={currentItems} />
            {companyJobs.length > 5 && (
        <div className="pagination">
          <button
            onClick={() =>
              setSearchParams({ page: (pageFromUrl - 1).toString() })
            }
            disabled={pageFromUrl === 1}
          >
            Previous
          </button>
          <span>
            Page {pageFromUrl} of {totalPages}
          </span>
          <button
            onClick={() =>
              setSearchParams({ page: (pageFromUrl + 1).toString() })
            }
            disabled={pageFromUrl === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
  }

  export default ViewAllJobsForCompany;
