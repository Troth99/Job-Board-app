import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useJobs from "../hooks/useJobs";

interface FavoritesContextType {
  savedJobIds: string[];
  isFavorite: (jobId: string) => boolean;
  addToFavorites: (jobId: string) => Promise<void>;
  removeFromFavorites: (jobId: string) => Promise<void>;
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
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { getAllFavoriteJobs, addJobToFavorites, deleteJobFromFavorites } =
    useJobs();

  useEffect(() => {
    if (!userId) {
      setSavedJobIds([]);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAllFavoriteJobs();

        if (res?.savedJobs) {
          setSavedJobIds(res.savedJobs.map((j: any) => j._id ?? j));
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId]);

  const isFavorite = (jobId: string) => savedJobIds.includes(jobId);

  const addToFavorites = async (jobId: string) => {
    setLoading(true);
    try {
      await addJobToFavorites(jobId);
      setSavedJobIds((prev) => [...prev, jobId]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (jobId: string) => {
    setLoading(true);
    try {
      await deleteJobFromFavorites(jobId);
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavouritesJobsContext.Provider
      value={{
        savedJobIds,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
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
