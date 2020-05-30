import React, { Component } from "react";
import SongListInfo from "./SongListInfo";
import PropTypes from "prop-types";

class SongListFetch extends Component {
  state = {
    songs: [],
    currentPage: 1,
    songsPerPage: 10,
    numberOfPages: 1,
    firstIndex: 1,
    isLoading: true,
  };

  componentDidMount() {
    this.handleFetchSongs(this.state.currentPage);
  }

  handleFetchSongs = (number) => {
    let offset = "";
    this.setState({ firstIndex: (number - 1) * 10 + 1 });
    if (number > 1) {
      offset = `offset=${(number - 1) * this.state.songsPerPage}`;
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/songs/?paginated=1&${offset}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((res) => {
        let numberOfPages = Math.ceil(res.count / this.state.songsPerPage);
        this.setState({
          songs: res.results,
          numberOfPages: numberOfPages,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  };

  handlePaginate = (number) => {
    this.setState({ currentPage: number });
    this.handleFetchSongs(number);
  };

  render() {
    return (
      <SongListInfo
        songs={this.state.songs}
        currentPage={this.state.currentPage}
        onPaginate={this.handlePaginate}
        onFetchSongs={this.handleFetchSongs}
        numberOfPages={this.state.numberOfPages}
        firstIndex={this.state.firstIndex}
        isLoading={this.state.isLoading}
      />
    );
  }
}

SongListFetch.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default SongListFetch;
