import React from "react";
import { Container } from "react-bootstrap";
import SongChart from "./SongChart";
import PaginationList from "../main/PaginationList";
import PropTypes from "prop-types";

function SongListInfo(props) {
  const title = "ALL SONGS";
  const info = "check out all the songs";
  return (
    <div className="detail-list">
      <Container>
        <div className="list-content">
          <SongChart
            songs={props.songs}
            title={title}
            info={info}
            firstIndex={props.firstIndex}
          />
          <PaginationList
            results={props.songs}
            currentPage={props.currentPage}
            onPaginate={props.onPaginate}
            numberOfPages={props.numberOfPages}
          />
        </div>
      </Container>
    </div>
  );
}

SongListInfo.propTypes = {
  songs: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  onFetchSongs: PropTypes.func.isRequired,
  firstIndex: PropTypes.number,
};

export default SongListInfo;
