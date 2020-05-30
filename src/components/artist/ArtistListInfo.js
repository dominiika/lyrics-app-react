import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginationList from "../main/PaginationList";
import PropTypes from "prop-types";

function ArtistListInfo(props) {
  return (
    <div className="detail-list">
      <Container>
        <div className="list-content">
          <h1 className="text-center main-h">
            <strong>ALL ARTISTS</strong>
          </h1>
          <p className="purple-p text-center main-p purple">
            check out all the artists
          </p>
          {!props.isLoading ? (
            <Fragment>
              {props.artists.slice(0, 10).map((artist, index) => {
                return (
                  <div key={index}>
                    <Row className="artist-chart">
                      <Col xs={1} s={1} md={1} lg={1}>
                        <h5 className="content-index">
                          {props.firstIndex + index}
                        </h5>
                      </Col>

                      <Col xs={3} s={3} md={3} lg={3}>
                        <Link to={`/artists/${Number(artist.id)}/`}>
                          <div className="img-background sm-back-img light-transition float-left content-img">
                            {artist.spotify_image ? (
                              <img
                                className="img-front"
                                src={artist.spotify_image}
                                alt="opps, something went wrong"
                              />
                            ) : (
                              <img
                                className="img-front"
                                src={artist.image}
                                alt="opps, something went wrong"
                              />
                            )}
                          </div>
                        </Link>
                      </Col>

                      <Col xs={4} s={4} md={4} lg={4}>
                        <Link to={`/artists/${Number(artist.id)}/`}>
                          <h5 className="record-text">{artist.name}</h5>
                        </Link>
                      </Col>
                      <Col xs={3} s={4} md={4} lg={4}>
                        <p className="record-text purple">
                          {artist.no_of_songs}{" "}
                          {artist.no_of_songs === 1 ? "song" : "songs"}
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

          <PaginationList
            results={props.artists}
            currentPage={props.currentPage}
            onPaginate={props.onPaginate}
            numberOfPages={props.numberOfPages}
          />
        </div>
      </Container>
    </div>
  );
}

ArtistListInfo.propTypes = {
  artists: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
  onFetchArtists: PropTypes.func.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  firstIndex: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
};

export default ArtistListInfo;
