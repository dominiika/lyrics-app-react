import React, { useState, useEffect } from "react";
import EditArtistForm from "./EditArtistForm";
import PropTypes from "prop-types";

function EditArtistFetch(props) {
  const [name, setName] = useState(props.artist.name);
  const [genres, setGenres] = useState(props.artist.genres);
  const [genresList, setGenresList] = useState([]);
  const [nameError, setNameError] = useState("");

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

  const handleEditArtist = (event) => {
    let resStatus = 0;

    if (name !== "") {
      setNameError("");
      fetch(
        `${process.env.REACT_APP_API_URL}/api/artists/${props.artist.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${props.cookies.get("token")}`,
          },
          body: JSON.stringify({
            name: name,
            genres: genres,
          }),
        }
      )
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((res) => {
          if (resStatus === 200) {
            props.onToggleShow();
            props.onLoadArtist(res);
          }
        })
        .then((res) => {
          if (resStatus === 400) {
            setNameError(res.name[0]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      event.preventDefault();
      setNameError("This field is required.");
    }
  };

  return (
    <EditArtistForm
      artist={props.artist}
      name={name}
      genres={genres}
      genresList={genresList}
      nameError={nameError}
      show={props.show}
      onToggleShow={props.onToggleShow}
      cookies={props.cookies}
      onLoadArtist={props.onLoadArtist}
      handleInputChange={handleInputChange}
      handleGenreChange={handleGenreChange}
      onEditArtist={handleEditArtist}
    />
  );
}

EditArtistFetch.propTypes = {
  artist: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onToggleShow: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
  onLoadArtist: PropTypes.func.isRequired,
};

export default EditArtistFetch;
