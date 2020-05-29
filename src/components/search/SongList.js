import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function SongList(props) {
  return (
    <Fragment>
      <p className="text-muted">SONGS</p>
      {props.results.songs.length !== 0 ? (
        <Fragment>
          {props.results.songs.map((song) => {
            return (
              <Row className="mb-2" key={song.id}>
                <Col lg={5} md={5} sm={5} xs={6}>
                  <Link
                    to={`/lyrics/${Number(song.id)}/`}
                    onClick={props.onToggleShow}
                  >
                    <div className="img-background sm-back-img">
                      {song.spotify_album_image ? (
                        <img
                          src={song.spotify_album_image}
                          alt="No pic"
                          className="img-fluid img-front"
                        />
                      ) : (
                        <img
                          src={song.image}
                          alt="No pic"
                          className="img-fluid img-front"
                        />
                      )}
                    </div>
                  </Link>
                </Col>
                <Col lg={7} md={5} sm={7} xs={6}>
                  <Link
                    to={`/lyrics/${Number(song.id)}/`}
                    onClick={props.onToggleShow}
                  >
                    <p>{song.title}</p>
                  </Link>
                </Col>
              </Row>
            );
          })}
        </Fragment>
      ) : (
        <p>There are no songs matching your query.</p>
      )}
    </Fragment>
  );
}

SongList.propTypes = {
  results: PropTypes.object.isRequired,
  onToggleShow: PropTypes.func.isRequired,
};

export default withRouter(SongList);
