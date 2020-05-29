import React from "react";
import PropTypes from "prop-types";

function SpotifyPlayer(props) {
  return (
    <div>
      <iframe
        className="spotify-player"
        title="spotify player"
        src={`https://open.spotify.com/embed/track/${props.song.spotify_song_id}`}
        width="100%"
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

SpotifyPlayer.propTypes = {
  song: PropTypes.object.isRequired,
};

export default SpotifyPlayer;
