import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

class ArtistDetailBanner extends Component {
  state = {
    activeGenres: [false, false, false, false],
  };

  toggleSetActive = (index) => {
    let newActiveGenres = this.state.activeGenres;
    newActiveGenres[index] = !newActiveGenres[index];
    this.setState({ activegenres: newActiveGenres });
    console.log(this.state.activeGenres);
  };

  render() {
    return (
      <div className="detail-content-banner-artist">
        <div className="detail-content-banner-img">
          <Container className="detail-content">
            <Row>
              <Col
                xs={12}
                s={12}
                md={6}
                lg={3}
                className="artist-detail-row artist-detail"
              >
                <div className="img-background lg-back-img">
                  {this.props.artist.spotify_image ? (
                    <img
                      src={this.props.artist.spotify_image}
                      alt="artist pic"
                      className="img-fluid  img-front"
                    />
                  ) : (
                    <img
                      src={this.props.artist.image}
                      alt="artist pic"
                      className="img-fluid img-front"
                    />
                  )}
                </div>
              </Col>
              <Col
                xs={12}
                s={12}
                md={6}
                lg={7}
                className="artist-detail artist-info"
              >
                <br />
                <h1 className="main-h">
                  <strong>{this.props.artist.name.toUpperCase()}</strong>
                </h1>
                <p className="pt-2">
                  Songs: <strong>{this.props.artist.no_of_songs}</strong>
                </p>

                {this.props.artist.genres_str ? (
                  <div className="genres">
                    {this.props.artist.genres_str.map((genre, index) => {
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
          </Container>
        </div>
      </div>
    );
  }
}

ArtistDetailBanner.propTypes = {
  artist: PropTypes.object.isRequired,
  onLoadArtist: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default ArtistDetailBanner;
