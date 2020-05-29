import React from "react";
import { withRouter } from "react-router-dom";
import DeleteArtistForm from "./DeleteArtistForm";
import PropTypes from "prop-types";

function DeleteArtistFetch(props) {
  const deleteArtist = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/artists/${props.artist.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${props.cookies.get("token")}`,
      },
    })
      .catch((error) => console.log(error))
      .then(props.history.push("/"))
      .then(window.location.reload());
  };

  return (
    <DeleteArtistForm
      show={props.show}
      onToggleShow={props.onToggleShow}
      deleteArtist={deleteArtist}
    />
  );
}

DeleteArtistFetch.propTypes = {
  artist: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(DeleteArtistFetch);
