import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ContentListDarkInfo(props) {
  return (
    <div className="dark-container">
      <Container>
        <div className="content-list-dark">
          <h1 className="text-center main-h">ARTISTS</h1>
          <p className="text-center yellow main-p">
            artists with multiple lyrics
          </p>
          <div className="content-row-artists">
            {!props.isLoading ? (
              <Fragment>
                {props.artists.slice(0, 10).map((artist, index) => {
                  return (
                    <div className="artist-container" key={index}>
                      <Link to={`/artists/${artist.id}/`}>
                        <div className="img-background dark-transition md-back-img">
                          {artist.spotify_image ? (
                            <img
                              className="img-fluid img-front"
                              src={artist.spotify_image}
                              alt="No content"
                            />
                          ) : (
                            <img
                              className="img-fluid img-front"
                              src={artist.image}
                              alt="No content"
                              srcSet={`${artist.image} 98w, ${artist.image} 118w, ${artist.image} 148w`}
                            />
                          )}
                        </div>
                        <p>{artist.name}</p>
                      </Link>
                    </div>
                  );
                })}
              </Fragment>
            ) : (
              <p className="text-center">loading...</p>
            )}
          </div>
          <div className="center-btn">
            <Link to="/artists/">
              <button className="dark-btn-black">See more</button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

ContentListDarkInfo.propTypes = {
  artists: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ContentListDarkInfo;
