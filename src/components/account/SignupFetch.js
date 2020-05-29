import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import SignupForm from "./SignupForm";
import PropTypes from "prop-types";

class SignupFetch extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    serverError: null,
  };

  handleStateChange = (key, value) => {
    let state = this.state;
    state[key] = value;
    this.setState(state);
  };

  handleClearHooks = () => {
    this.handleClearErrors();
    this.handleStateChange("username", "");
    this.handleStateChange("email", "");
    this.handleStateChange("password", "");
  };

  handleClearErrors = () => {
    this.handleStateChange("usernameError", "");
    this.handleStateChange("emailError", "");
    this.handleStateChange("passwordError", "");
    this.handleStateChange("serverError", null);
  };

  handleInputChange = (event) => {
    this.handleStateChange(event.target.name, event.target.value);
  };

  handleSignUp = (event) => {
    event.preventDefault();
    this.handleClearErrors();

    if (
      this.state.username !== "" &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      this.fetchSignUp();
    } else {
      if (this.state.username === "") {
        event.preventDefault();
        this.handleStateChange("usernameError", "This field is required.");
      } else {
        this.handleStateChange("usernameError", "");
      }
      if (this.state.email === "") {
        event.preventDefault();
        this.handleStateChange("emailError", "This field is required.");
      } else {
        this.handleStateChange("emailError", "");
      }
      if (this.state.password === "") {
        event.preventDefault();
        this.handleStateChange("passwordError", "This field is required.");
      } else {
        this.handleStateChange("passwordError", "");
      }
    }
  };

  fetchSignUp = () => {
    let resStatus = 0;

    fetch(`${process.env.REACT_APP_API_URL}/api/auth/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((res) => {
        if (resStatus === 200 || resStatus === 201) {
          this.props.cookies.remove("token");
          this.props.cookies.remove("user");
          this.props.cookies.remove("username");
          this.props.cookies.remove("email");
          this.handleClearHooks();
          this.props.onToggleDisplaySuccess(
            "You have successfully signed up! Now you can log in"
          );
          this.props.onToggleView();
        } else {
          res.username &&
            this.handleStateChange("usernameError", res.username[0]);
          res.email && this.handleStateChange("emailError", res.email[0]);
          res.password &&
            this.handleStateChange("passwordError", res.password[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <SignupForm
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        usernameError={this.state.usernameError}
        emailError={this.state.emailError}
        passwordError={this.state.passwordError}
        serverError={this.state.serverError}
        onInputChange={this.handleInputChange}
        onClearHooks={this.handleClearHooks}
        onToggleView={this.props.onToggleView}
        onSignUp={this.handleSignUp}
      />
    );
  }
}

SignupFetch.propTypes = {
  onToggleView: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
  onToggleDisplaySuccess: PropTypes.func.isRequired,
};

export default withCookies(withRouter(SignupFetch));
