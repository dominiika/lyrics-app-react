import React, { Fragment } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function EditLyricsForm(props) {
  return (
    <Fragment>
      <Form onSubmit={props.onUpdateLyrics}>
        <Form.Group>
          <Form.Label>Lyrics</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="lyrics"
            value={props.lyrics}
            onChange={props.onInputChange}
          />
        </Form.Group>

        <Modal.Footer>
          <p className="mr-2">{props.alert}</p>
          <Button
            variant="btn btn-outline-dark"
            onClick={props.onFetchLyricsAPI}
            title="Fetch from www.azlyrics.com"
          >
            Fetch lyrics
          </Button>

          <Button variant="btn btn-outline-dark" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Fragment>
  );
}

EditLyricsForm.propTypes = {
  lyrics: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.number.isRequired,
  genres: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onUpdateLyrics: PropTypes.func.isRequired,
  onFetchLyricsAPI: PropTypes.func.isRequired,
};

export default EditLyricsForm;
