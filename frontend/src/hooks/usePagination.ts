import { useMemo } from "react";


//Hook to handle pagination if the items are already fetched and stored in the component state. 
// It calculates the total pages and returns the current items based on the current page and items per page.
export function usePagination<T>(items: T[], itemsPerPage: number, currentPage: number) {

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    currentItems,
  };
}
