import React, { Component, Fragment } from "react";
import { Modal, ListGroup, Nav } from "react-bootstrap";
import AddSongFetch from "../song/AddSongFetch";
import AddGenreFetch from "../genre/AddGenreFetch";
import AddArtistFetch from "../artist/AddArtistFetch";
import PropTypes from "prop-types";

class MainModal extends Component {
  state = {
    show: false,
    mainModal: true,
    songModal: false,
    genreModal: false,
    artistModal: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <React.Fragment>
        <Nav.Link className="nav-link" onClick={this.handleShow}>
          <i className="fas fa-plus"></i>
        </Nav.Link>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              <strong>
                {!this.state.songModal &&
                !this.state.artistModal &&
                !this.state.genreModal ? (
                  "WHAT DO YOU WANT TO ADD?"
                ) : (
                  <Fragment>
                    {this.state.songModal && "ADD A NEW SONG"}
                    {this.state.artistModal && "ADD A NEW ARTIST"}
                    {this.state.genreModal && "ADD A NEW GENRE"}
                  </Fragment>
                )}
              </strong>
            </Modal.Title>
            <button
              className="close-btn"
              onClick={() => {
                this.setState({
                  songModal: false,
                  mainModal: true,
                  genreModal: false,
                  artistModal: false,
                });
                this.handleClose();
              }}
            >
              x
            </button>
          </Modal.Header>

          {this.state.mainModal && (
            <>
              <Modal.Body className="main-modal-body">
                <ListGroup defaultActiveKey="#link1">
                  {/* Songs */}
                  <ListGroup.Item
                    className="modal-list-item"
                    action
                    onClick={() => {
                      this.setState({ songModal: true, mainModal: false });
                    }}
                  >
                    Song
                  </ListGroup.Item>

                  {/* Artist */}
                  <ListGroup.Item
                    className="modal-list-item"
                    action
                    onClick={() => {
                      this.setState({ artistModal: true, mainModal: false });
                    }}
                  >
                    Artist
                  </ListGroup.Item>

                  {/* Genre */}
                  <ListGroup.Item
                    className="modal-list-item"
                    action
                    onClick={() => {
                      this.setState({ genreModal: true, mainModal: false });
                    }}
                  >
                    Genre
                  </ListGroup.Item>
                </ListGroup>
              </Modal.Body>
            </>
          )}

          {this.state.genreModal && (
            <AddGenreFetch
              onClose={this.handleClose}
              cookies={this.props.cookies}
            />
          )}
          {this.state.songModal && (
            <AddSongFetch
              onClose={this.handleClose}
              cookies={this.props.cookies}
            />
          )}
          {this.state.artistModal && (
            <AddArtistFetch
              onClose={this.handleClose}
              cookies={this.props.cookies}
            />
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

MainModal.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default MainModal;
