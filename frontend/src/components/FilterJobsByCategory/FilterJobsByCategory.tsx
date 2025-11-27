import { useParams } from "react-router"


export function FilterJobByCategory(){
const {categoryName} = useParams()

    return (
        <h1>Filter job by {categoryName} </h1>
    )
}