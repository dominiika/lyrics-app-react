import React, { Component } from "react";
import ArtistListInfo from "./ArtistListInfo";
import PropTypes from "prop-types";

class ArtistListFetch extends Component {
  state = {
    artists: [],
    currentPage: 1,
    artistsPerPage: 10,
    numberOfPages: 1,
    firstIndex: 1,
  };

  componentDidMount() {
    this.handleFetchArtists(this.state.currentPage);
  }

  handleFetchArtists = (number) => {
    let offset = "";
    this.setState({ firstIndex: (number - 1) * 10 + 1 });
    if (number > 1) {
      offset = `offset=${(number - 1) * this.state.artistsPerPage}`;
    }
    fetch(
      `${process.env.REACT_APP_API_URL}/api/artists/?paginated=1&${offset}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((res) => {
        let numberOfPages = Math.ceil(res.count / this.state.artistsPerPage);
        this.setState({ artists: res.results, numberOfPages: numberOfPages });
      })
      .catch((error) => console.log(error));
  };

  handlePaginate = (number) => {
    this.setState({ currentPage: number });
    this.handleFetchArtists(number);
  };

  render() {
    return (
      <ArtistListInfo
        artists={this.state.artists}
        currentPage={this.state.currentPage}
        onPaginate={this.handlePaginate}
        onFetchArtists={this.handleFetchArtists}
        numberOfPages={this.state.numberOfPages}
        firstIndex={this.state.firstIndex}
      />
    );
  }
}

ArtistListFetch.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default ArtistListFetch;
