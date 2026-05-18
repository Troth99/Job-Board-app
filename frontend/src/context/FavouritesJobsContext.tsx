import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import type { Job } from "../interfaces/Job.model";
import useJobs from "../hooks/utils/useJobs";

export interface SavedJob {
  _id?: string;
  job: Job;
  addedAt: string;
}

  interface FavoritesContextType {
    savedJobs: SavedJob[];
    isFavorite: (jobId: string) => boolean;
    getAddedDate: (jobId: string) => string | undefined;
    addToFavorites: (jobId: string) => Promise<void>;
    removeFromFavorites: (jobId: string) => Promise<void>;
    isLoggedIn: boolean;
    loading?: boolean;
  }

  const FavouritesJobsContext = createContext<FavoritesContextType | undefined>(
    undefined,
  );

  export function FavoritesProvider({
    userId,
    children,
  }: {
    userId: string;
    children: ReactNode;
  }) {
    const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
    const [loading, setLoading] = useState(false);
    const { getAllFavoriteJobs, addJobToFavorites, deleteJobFromFavorites } = useJobs();
    const isLoggedIn = Boolean(userId);

    useEffect(() => {
      if (!isLoggedIn) {
        setSavedJobs([]);
        return;
      }

      const fetch = async () => {
        setLoading(true);
        try {
          const res = await getAllFavoriteJobs();
          if (res?.savedJobs) {
            setSavedJobs(res.savedJobs);
          }
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }, [isLoggedIn, userId]);

    const isFavorite = (jobId: string) =>
      savedJobs.some((j) => j.job && j.job._id === jobId);

    const getAddedDate = (jobId: string) =>
      savedJobs.find((j) => j.job && j.job._id === jobId)?.addedAt;

    const addToFavorites = async (jobId: string) => {
      if (!isLoggedIn) return;
      setLoading(true);
      try {
        await addJobToFavorites(jobId);
        const res = await getAllFavoriteJobs();
        if (res?.savedJobs) {
          setSavedJobs(res.savedJobs);
        }
      } finally {
        setLoading(false);
      }
    };

    const removeFromFavorites = async (jobId: string) => {
      if (!isLoggedIn) return;
      setLoading(true);
      try {
        await deleteJobFromFavorites(jobId);
        const res = await getAllFavoriteJobs();
        if (res?.savedJobs) {
          setSavedJobs(res.savedJobs);
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <FavouritesJobsContext.Provider
        value={{
          savedJobs,
          isFavorite,
          getAddedDate,
          addToFavorites,
          removeFromFavorites,
          isLoggedIn,
          loading,
        }}
      >
        {children}
      </FavouritesJobsContext.Provider>
    );
  }

  export function useFavoritesContext() {
    const context = useContext(FavouritesJobsContext);
    if (!context)
      throw new Error(
        "useFavoritesContext must be used within FavoritesProvider",
      );
    return context;
  }
