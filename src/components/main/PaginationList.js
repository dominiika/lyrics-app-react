import React from "react";
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

function PaginationList(props) {
  const pageNumbers = [];

  for (let i = 1; i <= props.numberOfPages; i++) {
    pageNumbers.push(i);
  }

  if (props.numberOfPages > 1) {
    return (
      <div className="pagination-wrapper">
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              className={
                number === props.currentPage ? "page-item active" : "page-item"
              }
              onClick={() => props.onPaginate(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    );
  } else {
    return <div></div>;
  }
}

PaginationList.propTypes = {
  results: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentPage: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
  numberOfPages: PropTypes.number.isRequired,
};

export default PaginationList;
