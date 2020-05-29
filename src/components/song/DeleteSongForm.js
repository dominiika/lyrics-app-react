import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function DeleteSongForm(props) {
  return (
    <div className="delete-modal">
      <p onClick={props.onShow} className="btn-right delete-el">
        Delete song
      </p>

      <Modal
        show={props.show}
        onHide={props.onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>ALERT</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this song?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-danger" onClick={props.onDeleteSong}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

DeleteSongForm.propTypes = {
  onShow: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onDeleteSong: PropTypes.func.isRequired,
};

export default DeleteSongForm;
