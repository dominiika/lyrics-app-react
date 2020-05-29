import React, { Fragment } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

function LoginForm(props) {
  return (
    <Fragment>
      <Form onSubmit={props.onLogIn}>
        {props.loginError && (
          <Alert variant={"danger"}>{props.loginError}</Alert>
        )}
        {props.serverError && (
          <Alert variant={"danger"}>{props.serverError}</Alert>
        )}
        {props.success && <Alert variant={"success"}>{props.success}</Alert>}

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            value={props.username}
            onChange={props.onInputChange}
            className={
              props.usernameError || props.loginError ? "invalid-input" : ""
            }
            autoComplete="on"
          />

          <div className="invalid-label">{props.usernameError}</div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={props.password}
            onChange={props.onInputChange}
            className={
              props.passwordError || props.loginError ? "invalid-input" : ""
            }
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
            Want to sign up?
          </p>
          <Button variant="btn btn-outline-dark" type="submit">
            Log in
          </Button>
        </Modal.Footer>
      </Form>
    </Fragment>
  );
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginError: PropTypes.string,
  usernameError: PropTypes.string,
  passwordError: PropTypes.string,
  serverError: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onInputChange: PropTypes.func.isRequired,
  onClearHooks: PropTypes.func.isRequired,
  onToggleView: PropTypes.func.isRequired,
  onLogIn: PropTypes.func.isRequired,
};

export default LoginForm;
