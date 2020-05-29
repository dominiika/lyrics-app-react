import React from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function AddGenreForm(props) {
  return (
    <Form onSubmit={props.onAddGenre}>
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
      </Modal.Body>

      <Modal.Footer>
        <Button variant="btn btn-outline-dark" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Form>
  );
}

AddGenreForm.propTypes = {
  name: PropTypes.string.isRequired,
  nameError: PropTypes.string,
  serverError: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onAddGenre: PropTypes.func.isRequired,
};

export default AddGenreForm;
