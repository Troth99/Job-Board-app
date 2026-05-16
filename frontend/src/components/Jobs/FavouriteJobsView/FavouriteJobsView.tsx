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

    const sortedJobs = response.savedJobs.slice().sort((a: any, b: any) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());

    setFavoriteJobs(sortedJobs);
    console.log("Fetched favorite jobs:", sortedJobs);
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