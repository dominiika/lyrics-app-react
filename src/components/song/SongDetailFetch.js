import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import SongDetailInfo from "./SongDetailInfo";
import NotFound from "../main/NotFound";
import PropTypes from "prop-types";

class SongDetailFetch extends Component {
  state = {
    id: Number(this.props.match.params.id),
    song: {},
    showLoginView: false,
  };

  componentDidMount() {
    this.fetchSong(this.state.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchSong(this.props.match.params.id);
    }
  }

  fetchSong = (songId) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/songs/${songId}/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ song: res });
      })
      .catch((error) => console.log(error));
  };

  handleLoadSong = (song) => {
    this.setState({ song: song });
  };

  handleToggleShowLoginView = () => {
    this.setState({ showLoginView: !this.state.showLoginView });
  };

  render() {
    return (
      <Fragment>
        {this.state.song.detal !== "Not found." ? (
          <SongDetailInfo
            song={this.state.song}
            showLoginView={this.state.showLoginView}
            onLoadSong={this.handleLoadSong}
            onToggleShowLoginView={this.handleToggleShowLoginView}
            cookies={this.props.cookies}
          />
        ) : (
          <NotFound />
        )}
      </Fragment>
    );
  }
}

SongDetailFetch.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withRouter(SongDetailFetch);
