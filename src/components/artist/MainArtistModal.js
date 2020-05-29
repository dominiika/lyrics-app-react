import React, { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import EditArtistFetch from "./EditArtistFetch";
import DeleteArtistFetch from "./DeleteArtistFetch";
import PropTypes from "prop-types";

function MainArtistModal(props) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleToggleEditModalShow = () => {
    setEditModal(!editModal);
  };

  const handleToggleDeleteModalShow = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <Fragment>
      <Row className="edit-delete-btns">
        <Col lg={1} md={2} sm={2} xs={2}>
          <p onClick={handleToggleEditModalShow} className="pr-0 mr-0 edit-el">
            Edit
          </p>
        </Col>
        <Col lg={11} md={10} sm={10} xs={10}>
          <p
            onClick={handleToggleDeleteModalShow}
            variant="btn btn-outline-danger"
            className="ml-0 float-left pl-0 ml-0 delete-el"
          >
            Delete
          </p>
        </Col>
      </Row>
      {editModal && (
        <EditArtistFetch
          artist={props.artist}
          show={editModal}
          onToggleShow={handleToggleEditModalShow}
          cookies={props.cookies}
          onLoadArtist={props.onLoadArtist}
        />
      )}
      {deleteModal && (
        <DeleteArtistFetch
          artist={props.artist}
          show={deleteModal}
          onToggleShow={handleToggleDeleteModalShow}
          cookies={props.cookies}
        />
      )}
    </Fragment>
  );
}

MainArtistModal.propTypes = {
  artist: PropTypes.object.isRequired,
  onLoadArtist: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default MainArtistModal;
