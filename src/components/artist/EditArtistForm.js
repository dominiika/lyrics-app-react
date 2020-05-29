import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function EditArtistForm(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onToggleShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          <strong>EDIT ARTIST</strong>
        </Modal.Title>
        <button className="close-btn" onClick={props.onToggleShow}>
          x
        </button>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={props.name}
              onChange={props.handleInputChange}
              className={props.nameError ? "invalid-input" : null}
            />
            <div className="invalid-label">{props.nameError}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="genres"
              onChange={props.handleGenreChange}
            >
              {props.genresList.map((genre, index) => {
                return <option key={index}>{genre.name}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="btn btn-outline-dark" onClick={props.onEditArtist}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

EditArtistForm.propTypes = {
  artist: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  genresList: PropTypes.array.isRequired,
  nameError: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
  onLoadArtist: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleGenreChange: PropTypes.func.isRequired,
  onEditArtist: PropTypes.func.isRequired,
};

export default EditArtistForm;
