
//To implement the favourite jobs view, we will create a new component called FavouriteJobsView. 
// This component will display a list of the user's favourite jobs. We will also need to create a new route for this view in our React Router setup.

import { useState } from "react";
import { useFavorites } from "../../../hooks/favorites";


function FavouriteJobsView() {
const [favoriteJobs, setFavoriteJobs] = useState([]);

const { getAllFavoriteJobs } = useFavorites();

try {
    
} catch (error) {
    
}
    return (
        <h1>favourite jobs view</h1>
    )
}


export default FavouriteJobsView;