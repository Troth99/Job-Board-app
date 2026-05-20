import { useState } from "react";
 
function usePagination<T>(data: T[], itemsPerPage: number) {
    const [currentPage , setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    };

    const prevPage = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    };

    const jumpPage = (page: number) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    }

    const currentData = () => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    return {
        nextPage,
        prevPage,
        jumpPage,
        currentData,
        currentPage,
        maxPage
    }
}


export default usePagination;