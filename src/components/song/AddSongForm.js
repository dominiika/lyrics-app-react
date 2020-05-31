import React, { Fragment } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function AddSongForm(props) {
  return (
    <Fragment>
      <Form onSubmit={props.onAddSong}>
        <Modal.Body>
          {props.serverError && (
            <Alert variant={"danger"}>{props.serverError}</Alert>
          )}
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={props.title}
              onChange={props.onInputChange}
              className={props.titleError ? "invalid-input" : null}
            />
            <div className="invalid-label">{props.titleError}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Artist</Form.Label>
            <Form.Control
              className="modal-select"
              required
              as="select"
              name="artist"
              onChange={props.onArtistChange}
            >
              {props.artistsList.map((artist, index) => {
                return <option key={index}>{artist.name}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="genres"
              onChange={props.onGenreChange}
              className={
                props.genresError
                  ? "modal-select invalid-input"
                  : "modal-select"
              }
            >
              {props.genresList.map((genre, index) => {
                return <option key={index}>{genre.name}</option>;
              })}
            </Form.Control>
            <div className="invalid-label">{props.genresError}</div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Lyrics</Form.Label>
            <Form.Control
              className="modal-textarea"
              as="textarea"
              rows="3"
              name="lyrics"
              value={props.lyrics}
              onChange={props.onInputChange}
            />
          </Form.Group>
        </Modal.Body>
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

AddSongForm.propTypes = {
  lyrics: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  artistsList: PropTypes.array.isRequired,
  genresList: PropTypes.array.isRequired,
  titleError: PropTypes.string,
  serverError: PropTypes.string,
  genresError: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onArtistChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  onAddSong: PropTypes.func.isRequired,
  onFetchLyricsAPI: PropTypes.func.isRequired,
};

export default AddSongForm;
