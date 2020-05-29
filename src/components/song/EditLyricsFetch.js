import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import EditLyricsForm from "./EditLyricsForm";
import PropTypes from "prop-types";

function EditLyricsFetch(props) {
  const [lyrics, setLyrics] = useState(props.song.lyrics);
  const [title] = useState(props.song.title);
  const [artist] = useState(props.song.artist);
  const [genres] = useState(props.song.genres);

  const handleInputChange = (event) => {
    setLyrics(event.target.value);
  };

  const handleUpdateLyrics = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/songs/${props.song.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${props.cookies.get("token")}`,
      },
      body: JSON.stringify({
        title: title,
        artist: artist,
        genres: genres,
        lyrics: lyrics,
      }),
    })
      .then((resp) => resp.json())
      .then((res) => props.onLoadSong(res))
      .catch((error) => console.log(error))
      .then(props.onClose());
  };

  const handleFetchLyricsAPI = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/songs/fetch/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${props.cookies.get("token")}`,
      },
      body: JSON.stringify({
        title: title,
        artist: props.song.artist_str,
      }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (!res.lyrics) {
          alert("No lyrics found!");
        } else {
          setLyrics(res.lyrics);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <EditLyricsForm
      lyrics={lyrics}
      title={title}
      artist={artist}
      genres={genres}
      onInputChange={handleInputChange}
      onUpdateLyrics={handleUpdateLyrics}
      onFetchLyricsAPI={handleFetchLyricsAPI}
    />
  );
}

EditLyricsFetch.propTypes = {
  song: PropTypes.object.isRequired,
  onLoadSong: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(EditLyricsFetch);
