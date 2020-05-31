import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import RateSongFetch from "./RateSongFetch";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class SongDetailBanner extends Component {
  state = {
    activeGenres: [false, false, false, false],
  };

  toggleSetActive = (index) => {
    let newActiveGenres = this.state.activeGenres;
    newActiveGenres[index] = !newActiveGenres[index];
    this.setState({ activegenres: newActiveGenres });
  };

  render() {
    return (
      <div className="detail-content-banner">
        <div className="detail-content-banner-img">
          <Container className="detail-content">
            <Row>
              <Col xs={12} s={12} md={12} lg={3}>
                {this.props.song.spotify_album_image ? (
                  <img
                    src={this.props.song.spotify_album_image}
                    alt="artist pic"
                    className="img-fluid detail-album-image"
                  />
                ) : (
                  <img
                    src={this.props.song.image}
                    alt="artist pic"
                    className="img-fluid detail-album-image"
                  />
                )}
              </Col>
              <Col xs={12} s={12} md={6} lg={4}>
                <br />
                <h1 className="main-h">
                  <strong>{this.props.song.title.toUpperCase()}</strong>
                </h1>

                <Row className="song-detail">
                  <Col>
                    <p className="pl-1 mb-0">
                      <Link to={`/artists/${Number(this.props.song.artist)}/`}>
                        <strong>
                          {this.props.song.artist_str.toUpperCase()}
                        </strong>
                      </Link>
                    </p>
                    {this.props.song.spotify_album_name ? (
                      <p className="pl-1">
                        Album:
                        <strong>{this.props.song.spotify_album_name}</strong>
                      </p>
                    ) : null}

                    <p>
                      <i className="fas fa-fire pr-1 purple"></i>
                      {this.props.song.avg_rating + " "}(
                      {this.props.song.no_of_ratings})
                    </p>
                    {this.props.song.genres_str ? (
                      <div className="genres">
                        {this.props.song.genres_str.map((genre, index) => {
                          return (
                            <p
                              key={index}
                              className={`genre ${
                                this.state.activeGenres[index]
                                  ? "genre-extended"
                                  : ""
                              }`}
                              title={genre}
                              onClick={() => this.toggleSetActive(index)}
                            >
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
                    (this,
                    this.props.cookies.get("username") !==
                    this.props.song.user_str
                      ? "rate-container rate-lower"
                      : "rate-container")
                  }
                >
                  <RateSongFetch
                    song={this.props.song}
                    onLoadSong={this.props.onLoadSong}
                    cookies={this.props.cookies}
                    showLoginView={this.props.showLoginView}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

SongDetailBanner.propTypes = {
  song: PropTypes.object.isRequired,
  showLoginView: PropTypes.func.isRequired,
  onLoadSong: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(SongDetailBanner);
