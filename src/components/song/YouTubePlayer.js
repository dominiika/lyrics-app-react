import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

function YouTubePlayer(props) {
  return (
    <div className="yt-player">
      <p className="mt-1 ml-2 text-muted">VIDEO</p>

      {props.song.youtube_video_url ? (
        <Fragment>
          <div className="iframe-container">
            <iframe
              title="youtube player"
              id="ytplayer"
              type="text/html"
              width="512"
              height="288"
              src={`${props.song.youtube_video_url}?rel=0&color=white`}
              frameBorder="0"
              className="video-player"
              allow="encrypted-media"
            ></iframe>
          </div>
          <Container>
            <p className="text-center text-muted">
              If the video is unavailable,
              <br />
              click its title and watch it on YouTube.
            </p>
          </Container>
          {/* <p className="text-center mt-2 video-btn">Change the video</p> */}
        </Fragment>
      ) : (
        <Fragment>
          <video
            controls
            width="512"
            height="288"
            className="video-player"
          ></video>
          <p className="text-center mt-2">There's no video!</p>
          {/* <p className="text-center mt-1 video-btn">Add a video</p> */}
        </Fragment>
      )}
      <hr />
    </div>
  );
}

YouTubePlayer.propTypes = {
  song: PropTypes.object.isRequired,
};

export default YouTubePlayer;
