import React, { Fragment } from "react";
import PropTypes from "prop-types";

function RateSongInfo(props) {
  return (
    <Fragment>
      <p className="text-center mb-0">Rate the lyrics:</p>
      <div className="rating">
        {[...Array(5)].map((item, index) => {
          return (
            <i
              key={index}
              className={`fas fa-fire pr-1 ${
                props.highlighted > index - 1 ? "rate-purple" : ""
              }`}
              onMouseEnter={props.onRateHighlight(index)}
              onMouseLeave={props.onRateHighlight(props.rating - 1)}
              onClick={props.onRateSong(index)}
            ></i>
          );
        })}
        {props.cookies.get("user") && props.rating !== -1 ? (
          <p className="mt-3 your-rate">Your rate: {props.rating}</p>
        ) : null}
      </div>
    </Fragment>
  );
}

RateSongInfo.propTypes = {
  highlighted: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  cookies: PropTypes.object.isRequired,
  onRateHighlight: PropTypes.func.isRequired,
  onRateSong: PropTypes.func.isRequired,
};

export default RateSongInfo;
