import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import ArtistDetailInfo from "./ArtistDetailInfo";
import NotFound from "../main/NotFound";
import PropTypes from "prop-types";

class ArtistDetailFetch extends Component {
  state = {
    id: Number(this.props.match.params.id),
    artist: {},
    artistsSongs: [],
  };

  componentDidMount() {
    this.fetchArtist(this.state.id);
    this.fetchSongs(this.state.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchArtist(this.props.match.params.id);
      this.fetchSongs(this.props.match.params.id);
    }
  }

  fetchArtist = (artistId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/artists/${artistId}/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ artist: res });
      })
      .catch((error) => console.log(error));
  };

  fetchSongs = (artistId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/songs/?artist=${artistId}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ artistsSongs: res });
      })
      .catch((error) => console.log(error));
  };

  handleLoadArtist = (artist) => {
    this.setState({ artist: artist });
  };

  render() {
    return (
      <Fragment>
        {this.state.artist.detail !== "Not found." ? (
          <ArtistDetailInfo
            artist={this.state.artist}
            artistsSongs={this.state.artistsSongs}
            cookies={this.props.cookies}
            onLoadArtist={this.handleLoadArtist}
          />
        ) : (
          <NotFound />
        )}
      </Fragment>
    );
  }
}

ArtistDetailFetch.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withRouter(ArtistDetailFetch);
