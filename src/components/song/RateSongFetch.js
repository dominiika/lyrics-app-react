import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RateSongInfo from "./RateSongInfo";
import PropTypes from "prop-types";

class RateSongFetch extends Component {
  state = {
    highlighted: -1,
    rating: -1,
  };

  componentDidMount() {
    if (this.props.cookies.get("token")) {
      this.fetchGetRate();
    } else {
      this.setState({ highlighted: -1 });
      this.setState({ rating: -1 });
    }
  }

  fetchGetRate = () => {
    let resStatus = 0;
    fetch(`${process.env.REACT_APP_API_URL}/api/ratings/get-rate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.cookies.get("token")}`,
      },
      body: JSON.stringify({
        song: this.props.song.id,
        user: this.props.cookies.get("user"),
      }),
    })
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((res) => {
        if (resStatus === 200) {
          this.setState({ rating: res.result.points });
          this.setState({ highlighted: res.result.points - 1 });
        }
      })
      .catch((error) => console.log(error));
  };

  handleRateHighlight = (index) => () => {
    this.setState({ highlighted: index });
  };

  handleRateSong = (index) => () => {
    if (this.props.cookies.get("token")) {
      fetch(
        `${process.env.REACT_APP_API_URL}/api/songs/${this.props.song.id}/rate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.cookies.get("token")}`,
          },
          body: JSON.stringify({
            points: index + 1,
          }),
        }
      )
        .then((resp) => resp.json())
        .then((res) => {
          this.setState({
            rating: res.result.points,
            highlighted: res.result.points - 1,
          });
          this.props.onLoadSong(res.song);
        })
        .catch((error) => console.log(error));
    } else {
      this.props.showLoginView();
    }
  };

  render() {
    return (
      <RateSongInfo
        highlighted={this.state.highlighted}
        rating={this.state.rating}
        cookies={this.props.cookies}
        onRateHighlight={this.handleRateHighlight}
        onRateSong={this.handleRateSong}
      />
    );
  }
}

RateSongFetch.propTypes = {
  song: PropTypes.object.isRequired,
  showLoginView: PropTypes.func.isRequired,
  onLoadSong: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(RateSongFetch);
