import { useMemo } from "react";

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
