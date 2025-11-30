import { useMemo, useState } from "react";
import { Job } from "../components/Jobs/CreateJob/CreateJob";

export function useJobFilters(jobData: Job[]){

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  // Handler for toggling job type selection
  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Handler for toggling company selection
  const handleCompanyChange = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
  };

  // Memoized filtered jobs based on selected types and companies
  const filteredJobs = useMemo(() => {
    return jobData.filter(job => {
      // Check if job matches selected type(s)

      const employmentType = job.employmentType ?? "";
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(employmentType);

      // Check if job matches selected company/companies
      const companyName = job.company?.name ?? "";
      const companyMatch = selectedCompanies.length === 0 || selectedCompanies.includes(companyName);

      // Return true only if both filters match
      return typeMatch && companyMatch;
    });
  }, [jobData, selectedTypes, selectedCompanies]);


    // Expose filter states, handlers, and filtered jobs to the component
    return {
      selectedTypes,
      setSelectedTypes,
      handleTypeChange, 
      selectedCompanies, 
      setSelectedCompanies,
      handleCompanyChange, 
      filteredJobs 
    }
}