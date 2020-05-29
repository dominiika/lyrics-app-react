import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import AddArtistForm from "./AddArtistForm";
import PropTypes from "prop-types";

function AddArtistFetch(props) {
  const [name, setName] = useState("");
  const [genres, setGenres] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [nameError, setNameError] = useState("");
  const [genresError, setGenresError] = useState("");
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/genres/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => setGenresList(res))
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleGenreChange = (event) => {
    let values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    let genreIds = [];
    for (let i = 0; i < values.length; i++) {
      let genre = genresList.find((genre) => {
        return genre.name === values[i];
      });

      genreIds.push(Number(genre.id));
    }

    setGenres(genreIds);
  };

  const handleAddArtist = (event) => {
    event.preventDefault();
    let resStatus = 0;

    if (name !== "") {
      setNameError("");
      fetch(`${process.env.REACT_APP_API_URL}/api/artists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${props.cookies.get("token")}`,
        },
        body: JSON.stringify({
          name: name,
          genres: genres,
        }),
      })
        .then((res) => {
          resStatus = res.status;
          console.log(resStatus);
          if (resStatus >= 500) {
            setServerError("There's been a server error. Please try again.");
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (resStatus === 400) {
            if (res.name) {
              setNameError(res.name[0]);
            } else if (res.genres) {
              setGenresError(res.genres[0]);
            }
          }
        })
        .catch((error) => console.log(error))
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
    <AddArtistForm
      name={name}
      genres={genres}
      genresList={genresList}
      nameError={nameError}
      serverError={serverError}
      genresError={genresError}
      onInputChange={handleInputChange}
      onGenreChange={handleGenreChange}
      onAddArtist={handleAddArtist}
    />
  );
}

AddArtistFetch.propTypes = {
  onClose: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(AddArtistFetch);
