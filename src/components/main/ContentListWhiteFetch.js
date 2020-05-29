import React, { Component } from "react";
import ContentListWhiteInfo from "./ContentListWhiteInfo";
import PropTypes from "prop-types";

class ContentListWhiteFetch extends Component {
  state = {
    songs: [],
  };

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = () => {
    let filter;
    if (this.props.type === "highest") {
      filter = "highest=10";
    } else if (this.props.type === "latest") {
      filter = "latest=10";
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/songs/?paginated=1&${filter}`, {
      method: "GET",
      headers: {},
    })
      .then((resp) => resp.json())
      .then((res) => this.setState({ songs: res.results }))
      .catch((error) => console.log(error));
  };

  render() {
    let title;
    let info;
    if (this.props.type === "highest") {
      title = "TOP LYRICS";
      info = "highest rated lyrics";
    } else if (this.props.type === "latest") {
      title = "LATEST";
      info = "recently added lyrics";
    }
    return (
      <ContentListWhiteInfo
        songs={this.state.songs}
        title={title}
        info={info}
      />
    );
  }
}

ContentListWhiteFetch.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ContentListWhiteFetch;
