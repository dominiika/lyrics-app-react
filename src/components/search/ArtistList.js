import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function ArtistList(props) {
  return (
    <Fragment>
      <p className="text-muted">ARTISTS</p>
      {props.results.artists.length !== 0 ? (
        <Fragment>
          {props.results.artists.map((artist) => {
            return (
              <Row className="mb-2" key={artist.id}>
                <Col lg={5} md={5} sm={5} xs={6}>
                  <Link
                    to={`/artists/${Number(artist.id)}/`}
                    onClick={props.onToggleShow}
                  >
                    <div className="img-background sm-back-img">
                      {artist.spotify_image ? (
                        <img
                          src={artist.spotify_image}
                          alt="No pic"
                          className="img-fluid img-front"
                        />
                      ) : (
                        <img
                          src={artist.image}
                          alt="No pic"
                          className="img-fluid img-front"
                        />
                      )}
                    </div>
                  </Link>
                </Col>
                <Col lg={7} md={5} sm={7} xs={6}>
                  <Link
                    to={`/artists/${Number(artist.id)}/`}
                    onClick={props.onToggleShow}
                  >
                    <p>{artist.name}</p>
                  </Link>
                </Col>
              </Row>
            );
          })}
        </Fragment>
      ) : (
        <p>There are no artists matching your query.</p>
      )}
    </Fragment>
  );
}

ArtistList.propTypes = {
  cookies: PropTypes.object,
};

export default withRouter(ArtistList);
