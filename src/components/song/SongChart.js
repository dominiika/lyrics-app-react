import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function SongChart(props) {
  return (
    <Fragment>
      <h1 className="text-center main-h">
        <strong>{props.title}</strong>
      </h1>
      <p className="purple-p text-center main-p purple">{props.info}</p>
      {!props.isLoading ? (
        <Fragment>
          {props.songs.slice(0, 10).map((song, index) => {
            return (
              <div key={index}>
                <Row className="song-chart">
                  <Col className="id-img-col" xs={3} s={3} md={3} lg={3}>
                    <h5 className="content-index">
                      {props.firstIndex + index}
                    </h5>

                    <Link to={`/lyrics/${Number(song.id)}/`}>
                      <div className="img-background sm-back-img light-transition float-left content-img">
                        {song.spotify_album_image ? (
                          <img
                            className="img-front"
                            src={song.spotify_album_image}
                            alt="opps, something went wrong"
                          />
                        ) : (
                          <img
                            className="img-front"
                            src={song.image}
                            alt="opps, something went wrong"
                          />
                        )}
                      </div>
                    </Link>
                  </Col>

                  <Col xs={3} s={3} md={3} lg={3} className="song-chart-title">
                    <Link to={`/lyrics/${Number(song.id)}/`}>
                      <h5 className="record-text">{song.title}</h5>
                    </Link>
                  </Col>
                  <Col xs={4} s={3} md={3} lg={3} className="song-chart-artist">
                    <Link to={`/artists/${Number(song.artist)}/`}>
                      <h5 className="float-left record-text">
                        {song.artist_str}
                      </h5>
                    </Link>
                  </Col>

                  <Col xs={1} s={3} md={3} lg={3} className="song-chart-rating">
                    <p className="record-text purple">
                      <i className="fas fa-fire pr-1"></i>
                      {song.avg_rating}
                    </p>
                  </Col>
                </Row>
                <hr />
              </div>
            );
          })}
        </Fragment>
      ) : (
        <p>loading...</p>
      )}
    </Fragment>
  );
}

SongChart.propTypes = {
  songs: PropTypes.array.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  firstIndex: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
};

export default SongChart;
