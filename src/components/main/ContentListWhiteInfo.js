import React from "react";
import { Container } from "react-bootstrap";
import SongChart from "../song/SongChart";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ContentListWhiteInfo(props) {
  return (
    <div className="white-container">
      <Container>
        <div className="list-content">
          <SongChart
            songs={props.songs}
            type={props.type}
            title={props.title}
            info={props.info}
            firstIndex={1}
          />
          <div className="center-btn">
            <Link to="/lyrics/">
              <button className="dark-btn">See more</button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

ContentListWhiteInfo.propTypes = {
  songs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default ContentListWhiteInfo;
