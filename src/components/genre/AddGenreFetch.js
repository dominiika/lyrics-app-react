import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AddGenreForm from "./AddGenreForm";
import PropTypes from "prop-types";

function AddGenreFetch(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [serverError, setServerError] = useState(null);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleAddGenre = (event) => {
    event.preventDefault();
    let resStatus = 0;
    setServerError(null);

    if (name !== "") {
      setNameError("");
      fetch(`${process.env.REACT_APP_API_URL}/api/genres/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${props.cookies.get("token")}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      })
        .then((res) => {
          resStatus = res.status;
          if (resStatus >= 500) {
            setServerError("There's been a server error. Please try again.");
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (resStatus === 400) {
            setNameError(res.name[0]);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          if (resStatus === 201) {
            props.onClose();
            props.history.push("/");
            window.location.reload();
          }
        });
    } else {
      event.preventDefault();
      setNameError("This field is required.");
    }
  };

  return (
    <AddGenreForm
      name={name}
      nameError={nameError}
      serverError={serverError}
      onInputChange={handleInputChange}
      onAddGenre={handleAddGenre}
    />
  );
}

AddGenreFetch.propTypes = {
  onClose: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(AddGenreFetch);
