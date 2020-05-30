import React, { Component } from "react";
import ContentListDarkInfo from "./ContentListDarkInfo";

class ContentListDarkFetch extends Component {
  state = {
    artists: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchArtists();
  }

  fetchArtists = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/artists/?paginated=1&highest_number_of_songs=10`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((res) => this.setState({ artists: res.results, isLoading: false }))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <ContentListDarkInfo
        artists={this.state.artists}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default ContentListDarkFetch;
