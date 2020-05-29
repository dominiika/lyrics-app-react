import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function DeleteArtistForm(props) {
  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onToggleShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <strong>ALERT</strong>
          </Modal.Title>
          <button className="close-btn" onClick={props.onToggleShow}>
            x
          </button>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this artist?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="btn btn-outline-danger" onClick={props.deleteArtist}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

DeleteArtistForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired,
  deleteArtist: PropTypes.func.isRequired,
};

export default DeleteArtistForm;
