import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import MainAuthModal from "../account/MainAuthModal";
import SpotifyPlayer from "./SpotifyPlayer";
import YouTubePlayer from "./YouTubePlayer";
import SongDetailBanner from "./SongDetailBanner";
import CommentsList from "../comment/CommentsList";
import PropTypes from "prop-types";
import EditLyricsModal from "./EditLyricsModal";
import DeleteSongFetch from "./DeleteSongFetch";

function SongDetailInfo(props) {
  return (
    <div>
      {props.song.title ? (
        <React.Fragment>
          <SongDetailBanner
            song={props.song}
            cookies={props.cookies}
            onLoadSong={props.onLoadSong}
            showLoginView={props.onToggleShowLoginView}
          />

          {props.song.spotify_song_id ? (
            <SpotifyPlayer song={props.song} />
          ) : null}
          <Container>
            <Row className="mt-4">
              <Col xs={12} s={12} md={6} lg={6}>
                <div className="lyrics">
                  {props.song.lyrics.length !== 0 ? (
                    <Fragment>
                      <p className="mt-1 text-muted">LYRICS</p>
                      <div className="lyrics-lines">
                        {props.song.lyrics.split("\n").map((line, index) => {
                          return (
                            <Fragment key={index}>
                              {line} <br />
                            </Fragment>
                          );
                        })}
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p className="mt-1 ml-2 text-muted">NO LYRICS ADDED...</p>
                      {props.cookies.get("token") ? (
                        <EditLyricsModal
                          song={props.song}
                          onLoadSong={props.onLoadSong}
                          cookies={props.cookies}
                          type={"add"}
                        />
                      ) : null}
                    </Fragment>
                  )}
                </div>
                <hr />
              </Col>

              <Col xs={12} s={12} md={6} lg={6}>
                <YouTubePlayer song={props.song} />

                <CommentsList />
              </Col>
            </Row>

            <div className="more-info">
              {props.cookies.get("token") ? (
                <Fragment>
                  {props.cookies.get("username") === props.song.user_str ? (
                    <Fragment>
                      <Row className="edit-delete-btns">
                        <Col xs={4} sm={3} md={2} lg={2}>
                          <EditLyricsModal
                            song={props.song}
                            onLoadSong={props.onLoadSong}
                            cookies={props.cookies}
                            type={"edit"}
                          />
                        </Col>
                        <Col xs={8} sm={9} md={10} lg={10}>
                          <DeleteSongFetch
                            song={props.song}
                            onLoadSong={props.onLoadSong}
                            cookies={props.cookies}
                          />
                        </Col>
                      </Row>
                    </Fragment>
                  ) : (
                    <Row className="edit-delete-btns">
                      <Col>
                        <EditLyricsModal
                          song={props.song}
                          onLoadSong={props.onLoadSong}
                          cookies={props.cookies}
                          type={"edit"}
                        />
                      </Col>
                    </Row>
                  )}
                </Fragment>
              ) : null}

              <Row className="">
                <Col lg={2}>
                  <p className="text-muted mb-0">ADDED BY</p>
                  <p className="purple">{props.song.user_str}</p>
                </Col>
                <Col lg={10} className="float-left">
                  <p className="text-muted mb-0">ON</p>
                  <p className="purple">{props.song.created_date_short}</p>
                </Col>
              </Row>

              {props.song.edited ? (
                <Row>
                  <Col lg={2}>
                    <p className="text-muted mb-0">EDITED BY</p>
                    <p className="purple">{props.song.edited_by_user_str}</p>
                  </Col>
                  <Col lg={10} className="float-left">
                    <p className="text-muted mb-0">ON</p>
                    <p className="purple">{props.song.edited_date_short}</p>
                  </Col>
                </Row>
              ) : null}
            </div>
          </Container>
        </React.Fragment>
      ) : (
        <p className="text-center">loading...</p>
      )}

      {props.showLoginView ? (
        <MainAuthModal
          cookies={props.cookies}
          show={true}
          showLoginView={props.onToggleShowLoginView}
        />
      ) : null}
    </div>
  );
}

SongDetailInfo.propTypes = {
  song: PropTypes.object.isRequired,
  showLoginView: PropTypes.bool.isRequired,
  onLoadSong: PropTypes.func.isRequired,
  onToggleShowLoginView: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withRouter(SongDetailInfo);
