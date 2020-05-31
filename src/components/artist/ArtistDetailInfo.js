import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import ArtistDetailBanner from "./ArtistDetailBanner";
import PropTypes from "prop-types";
import MainArtistModal from "./MainArtistModal";

function ArtistDetailInfo(props) {
  return (
    <div>
      {props.artist.name ? (
        <React.Fragment>
          <ArtistDetailBanner
            artist={props.artist}
            onLoadArtist={props.onLoadArtist}
            cookies={props.cookies}
          />

          <Container className="mt-4 artist-detail">
            <h2 className="">
              <strong>{props.artist.name.toUpperCase()}'S SONGS</strong>
            </h2>
            <br />

            <Row>
              {!props.isLoading ? (
                <Fragment>
                  {props.artistsSongs.map((song) => {
                    return (
                      <Col
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        key={song.id}
                        className="mb-4"
                      >
                        <Row>
                          <Col lg={5} md={5} sm={5} xs={6}>
                            <Link to={`/lyrics/${song.id}`}>
                              {song.spotify_album_image ? (
                                <img
                                  src={song.spotify_album_image}
                                  alt="No pic"
                                  className="img-fluid img-background sm-back-img"
                                />
                              ) : (
                                <img
                                  src={song.image}
                                  alt="No pic"
                                  className="img-fluid img-background sm-back-img"
                                />
                              )}
                            </Link>
                          </Col>
                          <Col lg={7} md={5} sm={7} xs={6}>
                            <Link to={`/lyrics/${song.id}`}>
                              <p className="float-left">{song.title}</p>
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                    );
                  })}
                </Fragment>
              ) : (
                <p className="text-muted no-songs-info">
                  {props.artist.name.toUpperCase()} has no songs
                </p>
              )}
            </Row>

            <div className="more-info">
              {props.artist.user === Number(props.cookies.get("user")) ? (
                <MainArtistModal
                  onLoadArtist={props.onLoadArtist}
                  artist={props.artist}
                  cookies={props.cookies}
                />
              ) : null}

              <p className="text-muted mb-0">ADDED BY</p>
              <p className="purple">{props.artist.user_str}</p>
            </div>
          </Container>
        </React.Fragment>
      ) : (
        <Container>
          <p className="text-center">loading...</p>
        </Container>
      )}
    </div>
  );
}

ArtistDetailInfo.propTypes = {
  artist: PropTypes.object.isRequired,
  artistsSongs: PropTypes.array.isRequired,
  cookies: PropTypes.object.isRequired,
  onLoadArtist: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withRouter(ArtistDetailInfo);
