import React, { useState, Fragment } from "react";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import LoginFetch from "./LoginFetch";
import SignupFetch from "./SignupFetch";
import PropTypes from "prop-types";

function MainAuthModal(props) {
  const [isLoginView, setIsLoginView] = useState(false);
  const [show, setShow] = useState(props.show);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    if (props.show) {
      props.showLoginView();
    }
    setShow(false);
    handleToggleDisplaySuccess();
  };

  const handleToggleDisplaySuccess = (msg) => {
    setSuccess(msg);
  };

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <React.Fragment>
      {!props.show ? (
        <Fragment>
          <p
            className="nav-link login-nav"
            onClick={() => {
              setShow(true);
              setIsLoginView(true);
            }}
          >
            Log in
          </p>
          <p
            className="nav-link"
            onClick={() => {
              setShow(true);
              setIsLoginView(false);
            }}
          >
            Sign up
          </p>
        </Fragment>
      ) : null}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h2 className="main-h">
              <strong>{isLoginView ? "LOG IN" : "SIGN UP"}</strong>
            </h2>
          </Modal.Title>
          <button className="close-btn" onClick={handleClose}>
            x
          </button>
        </Modal.Header>

        <Modal.Body>
          {isLoginView ? (
            <LoginFetch
              cookies={props.cookies}
              onToggleView={handleToggleView}
              success={success}
              onToggleDisplaySuccess={handleToggleDisplaySuccess}
            />
          ) : (
            <SignupFetch
              cookies={props.cookies}
              onToggleView={handleToggleView}
              onToggleDisplaySuccess={handleToggleDisplaySuccess}
            />
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

MainAuthModal.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default withCookies(withRouter(MainAuthModal));
