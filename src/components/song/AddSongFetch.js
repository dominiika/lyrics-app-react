import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AddSongForm from "./AddSongForm";
import PropTypes from "prop-types";

class AddSongFetch extends Component {
  state = {
    lyrics: "",
    title: "",
    artist: "",
    genres: [],
    artistsList: [],
    genresList: [],
    titleError: "",
    serverError: null,
    genresError: "",
    alert: "",
  };

  componentDidMount() {
    this.fetchArtists();
    this.fetchGenres();
  }

  fetchArtists = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/artists/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        this.handleStateChange("artistsList", res);
        this.handleStateChange("artist", res[0].id);
      })
      .catch((error) => console.log(error));
  };

  fetchGenres = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/genres/`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => this.handleStateChange("genresList", res))
      .catch((error) => console.log(error));
  };

  handleStateChange = (key, value) => {
    let state = this.state;
    state[key] = value;
    this.setState(state);
  };

  handleInputChange = (event) => {
    this.handleStateChange(event.target.name, event.target.value);
  };

  handleArtistChange = (event) => {
    let artist = this.state.artistsList.find((artist) => {
      return artist.name === event.target.value;
    });
    this.handleStateChange("artist", artist.id);
  };

  handleGenreChange = (event) => {
    let values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    let genreIds = [];
    for (let i = 0; i < values.length; i++) {
      let genre = this.state.genresList.find((genre) => {
        return genre.name === values[i];
      });

      genreIds.push(Number(genre.id));
    }

    this.handleStateChange("genres", genreIds);
  };

  handleAddSong = (event) => {
    event.preventDefault();
    let resStatus = 0;
    this.handleStateChange("serverError", null);

    if (this.state.title !== "") {
      this.handleStateChange("titleError", "");

      fetch(`${process.env.REACT_APP_API_URL}/api/songs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.cookies.get("token")}`,
        },
        body: JSON.stringify({
          title: this.state.title,
          artist: this.state.artist,
          genres: this.state.genres,
          lyrics: this.state.lyrics,
        }),
      })
        .then((res) => {
          resStatus = res.status;
          console.log(resStatus);
          if (resStatus >= 500) {
            this.handleStateChange(
              "serverError",
              "There's been a server error. Please try again."
            );
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (resStatus === 400) {
            if (res.title) {
              this.handleStateChange("titleError", res.title[0]);
            } else if (res.genres) {
              this.handleStateChange("genresError", res.genres[0]);
            }
          }
        })
        .catch((error) => console.log(error))
        .then(() => {
          if (resStatus === 201) {
            this.props.onClose();
            this.props.history.push("/");
            window.location.reload();
          }
        });
    } else {
      event.preventDefault();
      this.handleStateChange("titleError", "This field is required.");
    }
  };

  handleFetchLyricsAPI = () => {
    this.handleStateChange("titleError", "");
    this.handleStateChange("alert", "loading...");
    let artistObj = this.state.artistsList.find((el) => {
      return el.id === this.state.artist;
    });

    fetch(`${process.env.REACT_APP_API_URL}/api/songs/fetch/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("token")}`,
      },
      body: JSON.stringify({
        title: this.state.title,
        artist: artistObj.name,
      }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (!res.lyrics) {
          alert("No lyrics found!");
        } else {
          this.handleStateChange("lyrics", res.lyrics);
          this.handleStateChange("alert", "");
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <AddSongForm
        lyrics={this.state.lyrics}
        title={this.state.title}
        genres={this.state.genres}
        artistsList={this.state.artistsList}
        genresList={this.state.genresList}
        titleError={this.state.titleError}
        serverError={this.state.serverError}
        genresError={this.state.genresError}
        onInputChange={this.handleInputChange}
        onArtistChange={this.handleArtistChange}
        onGenreChange={this.handleGenreChange}
        onAddSong={this.handleAddSong}
        onFetchLyricsAPI={this.handleFetchLyricsAPI}
        alert={this.state.alert}
      />
    );
  }
}

AddSongFetch.propTypes = {
  onClose: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(AddSongFetch);
