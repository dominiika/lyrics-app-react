import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";
import EditLyricsFetch from "./EditLyricsFetch";
import PropTypes from "prop-types";

class EditLyricsModal extends Component {
  state = {
    show: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <Fragment>
        {this.props.type === "edit" && (
          <p onClick={this.handleShow} className="ml-0 edit-el">
            Edit lyrics
          </p>
        )}

        {this.props.type === "add" && (
          <p onClick={this.handleShow} className="video-btn ml-2">
            Add lyrics
          </p>
        )}
        <div className="lyrics-modal">
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.props.song.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditLyricsFetch
                song={this.props.song}
                onLoadSong={this.props.onLoadSong}
                onClose={this.handleClose}
                cookies={this.props.cookies}
              />
            </Modal.Body>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

EditLyricsModal.propTypes = {
  song: PropTypes.object.isRequired,
  onLoadSong: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default EditLyricsModal;
