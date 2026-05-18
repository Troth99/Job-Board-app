import "./Pagination.css";
interface PagesProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

function Pages({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PagesProps) {

  if(totalItems <= itemsPerPage) {
    return null; // No pagination needed if all items fit on one page
  }

    return (
        <>
        <div className="pagination-spacing">
            <nav className="jobs-pagination" aria-label="Job pages">
              <button
                className="jobs-pagination-button"
                onClick={() =>
                  onPageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="jobs-pagination-status">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="jobs-pagination-button"
                onClick={() =>
                  onPageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
       </div>
    </>
    )
}

export default Pages;
