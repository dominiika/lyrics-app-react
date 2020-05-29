import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import RateSongFetch from "./RateSongFetch";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

function SongDetailBanner(props) {
  return (
    <div className="detail-content-banner">
      <div className="detail-content-banner-img">
        <Container className="detail-content">
          <Row>
            <Col xs={12} s={12} md={12} lg={3}>
              {props.song.spotify_album_image ? (
                <img
                  src={props.song.spotify_album_image}
                  alt="artist pic"
                  className="img-fluid detail-album-image"
                />
              ) : (
                <img
                  src={props.song.image}
                  alt="artist pic"
                  className="img-fluid detail-album-image"
                />
              )}
            </Col>
            <Col xs={12} s={12} md={6} lg={4}>
              <br />
              <h1 className="main-h">
                <strong>{props.song.title.toUpperCase()}</strong>
              </h1>

              <Row className="song-detail">
                <Col>
                  <p className="pl-1 mb-0">
                    <Link to={`/artists/${Number(props.song.artist)}/`}>
                      <strong>{props.song.artist_str.toUpperCase()}</strong>
                    </Link>
                  </p>
                  {props.song.spotify_album_name ? (
                    <p className="pl-1">
                      Album: <strong>{props.song.spotify_album_name}</strong>
                    </p>
                  ) : null}

                  <p>
                    <i className="fas fa-fire pr-1 purple"></i>
                    {props.song.avg_rating + " "}({props.song.no_of_ratings})
                  </p>
                  {props.song.genres_str ? (
                    <div className="genres">
                      {props.song.genres_str.map((genre, index) => {
                        return (
                          <p key={index} className="genre" title={genre}>
                            {genre}
                          </p>
                        );
                      })}
                    </div>
                  ) : null}
                </Col>
              </Row>
            </Col>
            <Col xs={12} s={12} md={6} lg={5} className="">
              <div
                className={
                  props.cookies.get("username") !== props.song.user_str
                    ? "rate-container rate-lower"
                    : "rate-container"
                }
              >
                <RateSongFetch
                  song={props.song}
                  onLoadSong={props.onLoadSong}
                  cookies={props.cookies}
                  showLoginView={props.showLoginView}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

SongDetailBanner.propTypes = {
  song: PropTypes.object.isRequired,
  showLoginView: PropTypes.func.isRequired,
  onLoadSong: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(SongDetailBanner);
