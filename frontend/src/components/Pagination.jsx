import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <ul className="pagination">
      <li>
        <button
          className="table-navigate-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <li key={pageNumber}>
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? 'active-page' : 'page-number'}
          >
            {pageNumber + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          className="table-navigate-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
