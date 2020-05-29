import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DeleteSongForm from "./DeleteSongForm";
import PropTypes from "prop-types";

class DeleteSongFetch extends Component {
  state = {
    show: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleDeleteSong = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/songs/${this.props.song.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("token")}`,
      },
    })
      .then(this.handleClose())
      .catch((error) => console.log(error))
      .then(this.props.history.push("/"))
      .then(window.location.reload());
  };

  render() {
    return (
      <DeleteSongForm
        onShow={this.handleShow}
        onClose={this.handleClose}
        show={this.state.show}
        onDeleteSong={this.handleDeleteSong}
      />
    );
  }
}

DeleteSongFetch.propTypes = {
  song: PropTypes.object.isRequired,
  onLoadSong: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(DeleteSongFetch);
