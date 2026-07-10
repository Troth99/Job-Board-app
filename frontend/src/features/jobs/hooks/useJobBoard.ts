import useJobsHook from "./useJobsAPI";
import useJobApplications from "./useJobApplications";
import useJobFavorites from "./useSavedJobs";


export default function useJobsMethods() {
  const jobsMethods = useJobsHook();
  const applicationsMethods = useJobApplications();
  const savedjobMethods = useJobFavorites();

  return {
    // Jobs
    loading: jobsMethods.loading,
    getRecentJobs: jobsMethods.getRecentJobs,
    createJob: jobsMethods.createJob,
    getJobsByCompany: jobsMethods.getJobsByCompany,
    getRecentJobsByCompany: jobsMethods.getRecentJobsByCompany,
    getJobById: jobsMethods.getJobById,
    updateJob: jobsMethods.updateJob,
    getJobsByCategoryName: jobsMethods.getJobsByCategoryName,
    getAllJobs: jobsMethods.getAllJobs,
    deleteJob: jobsMethods.deleteJob,
    getJobsPage: jobsMethods.getJobsPage,
    // Applications
    createApplication: applicationsMethods.createApplication,
    getApplicationsByJobId: applicationsMethods.getApplicationsByJobId,
    updateApplicationStatus: applicationsMethods.updateApplicationStatus,
    deleteApplication: applicationsMethods.deleteApplication,
    // Favorites
    addJobToFavorites: savedjobMethods.addJobToFavorites,
    deleteJobFromFavorites: savedjobMethods.deleteJobFromFavorites,
    getAllFavoriteJobs: savedjobMethods.getAllFavoriteJobs,
  };
}
