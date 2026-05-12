import { useJobs as useJobsHook } from "./jobs";
import { useApplications as useApplicationsHook } from "./applications";
import { useFavorites as useFavoritesHook } from "./favorites";

export default function useJobs() {
  const jobsMethods = useJobsHook();
  const applicationsMethods = useApplicationsHook();
  const favoritesMethods = useFavoritesHook();

  return {
    // Jobs
    loading: jobsMethods.loading,
    getRecentJobs: jobsMethods.getRecentJobs,
    createJob: jobsMethods.createJob,
    getJobsByCompany: jobsMethods.getJobsByCompany,
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
    addJobToFavorites: favoritesMethods.addJobToFavorites,
    deleteJobFromFavorites: favoritesMethods.deleteJobFromFavorites,
    getAllFavoriteJobs: favoritesMethods.getAllFavoriteJobs,
  };
}
