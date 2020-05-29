import React, { Fragment } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function SignupForm(props) {
  return (
    <Fragment>
      {props.serverError && (
        <Alert variant={"danger"}>{props.serverError}</Alert>
      )}
      <Form onSubmit={props.onSignUp}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            value={props.username}
            onChange={props.onInputChange}
            className={props.usernameError ? "invalid-input" : ""}
            autoComplete="on"
          />

          <div className="invalid-label">{props.usernameError}</div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={props.email}
            onChange={props.onInputChange}
            className={props.emailError ? "invalid-input" : ""}
            autoComplete="on"
          />

          <div className="invalid-label">{props.emailError}</div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={props.password}
            onChange={props.onInputChange}
            className={props.passwordError ? "invalid-input" : ""}
            autoComplete="on"
          />

          <div className="invalid-label">{props.passwordError}</div>
        </Form.Group>

        <Modal.Footer>
          <p
            onClick={() => {
              props.onClearHooks();
              props.onToggleView();
            }}
            className="cursor"
          >
            Want to log in?
          </p>
          <Button variant="btn btn-outline-dark" type="submit">
            Sign up
          </Button>
        </Modal.Footer>
      </Form>
    </Fragment>
  );
}

SignupForm.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginError: PropTypes.string,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  serverError: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onClearHooks: PropTypes.func.isRequired,
  onToggleView: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default SignupForm;
