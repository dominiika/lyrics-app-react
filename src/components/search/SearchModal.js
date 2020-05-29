import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import SongList from "./SongList";
import ArtistList from "./ArtistList";
import PaginationList from "../main/PaginationList";
import PropTypes from "prop-types";

function SearchModal(props) {
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onToggleShow}
      className="search-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>SEARCH RESULTS</strong>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.results.songs.length === 0 &&
        props.results.artists.length === 0 ? (
          <p>Nothing found! Please check the spelling and try again.</p>
        ) : (
          <Row>
            <Col lg={6}>
              <SongList
                results={props.results}
                onToggleShow={props.onToggleShow}
              />
            </Col>

            <Col lg={6}>
              <ArtistList
                results={props.results}
                onToggleShow={props.onToggleShow}
              />
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <PaginationList
          results={props.results}
          currentPage={props.currentPage}
          onPaginate={props.onPaginate}
          numberOfPages={props.results.number_of_pages}
        />
      </Modal.Footer>
    </Modal>
  );
}

SearchModal.propTypes = {
  results: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
};

export default SearchModal;
