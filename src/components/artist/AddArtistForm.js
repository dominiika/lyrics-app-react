import React from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function AddArtistForm(props) {
  return (
    <Form onSubmit={props.onAddArtist}>
      <Modal.Body>
        {props.serverError && (
          <Alert variant={"danger"}>{props.serverError}</Alert>
        )}
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={props.name}
            onChange={props.onInputChange}
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
            onChange={props.onGenreChange}
            className={props.genresError ? "invalid-input" : null}
          >
            {props.genresList.map((genre, index) => {
              return <option key={index}>{genre.name}</option>;
            })}
          </Form.Control>
          <div className="invalid-label">{props.genresError}</div>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="btn btn-outline-dark" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Form>
  );
}

AddArtistForm.propTypes = {
  name: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  genresList: PropTypes.array.isRequired,
  nameError: PropTypes.string,
  genresError: PropTypes.string,
  serverError: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  onAddArtist: PropTypes.func.isRequired,
};

export default AddArtistForm;
