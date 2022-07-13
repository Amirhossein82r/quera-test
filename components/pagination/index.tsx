import React, { FC } from "react";
import { PaginationProps } from "./pagination.interface";

const Pagination: FC<PaginationProps> = ({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav style={{ marginTop: "80px" }}>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link"
              style={
                currentPage === number
                  ? { background: "#d5d5d5", cursor: "pointer" }
                  : { cursor: "pointer" }
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
