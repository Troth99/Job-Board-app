import { useEffect, useState } from "react";
import { useFavorites } from "../../../hooks/favorites";


function FavouriteJobsView() {
const [favoriteJobs, setFavoriteJobs] = useState([]);
const [loading, setLoading] = useState(true);

const { getAllFavoriteJobs } = useFavorites();

useEffect(() => {
    fetchFavoriteJobs();
}, []);

const fetchFavoriteJobs = async () => {
    setLoading(true);
try {
    const response = await getAllFavoriteJobs();
    console.log(response.savedJobs)
    const sortedJobs = response.savedJobs.sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    console.log(sortedJobs)
    setFavoriteJobs(sortedJobs);
    setLoading(false);
} catch (error) {
   console.error("Error fetching favorite jobs:", error); 
}finally{
    setLoading(false);
}

//To do - handle errors and loading state properly and display ui accordingly
}
    return (
        <>
        <h1>{favoriteJobs.length}</h1>
        </>
    )
}


export default FavouriteJobsView;