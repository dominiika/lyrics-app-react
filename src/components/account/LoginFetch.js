import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";

class LoginFetch extends Component {
  state = {
    username: "",
    password: "",
    loginError: "",
    usernameError: "",
    passwordError: "",
    serverError: null,
    success: this.props.success,
  };

  handleStateChange = (key, value) => {
    let state = this.state;
    state[key] = value;
    this.setState(state);
  };

  handleClearHooks = () => {
    this.handleClearErrors();
    this.handleStateChange("username", "");
    this.handleStateChange("password", "");
  };

  handleClearErrors = () => {
    this.handleStateChange("loginError", "");
    this.handleStateChange("usernameError", "");
    this.handleStateChange("passwordError", "");
    this.handleStateChange("serverError", null);
  };

  handleInputChange = (event) => {
    this.handleStateChange(event.target.name, event.target.value);
  };

  handleLogIn = (event) => {
    event.preventDefault();
    this.props.onToggleDisplaySuccess("");
    this.handleClearErrors();
    if (this.state.username !== "" && this.state.password !== "") {
      this.fetchLogin();
    } else {
      if (this.state.username === "") {
        event.preventDefault();
        this.handleStateChange("usernameError", "This field is required.");
      } else {
        this.handleStateChange("usernameError", "");
      }
      if (this.state.password === "") {
        event.preventDefault();
        this.handleStateChange("passwordError", "This field is required.");
      } else {
        this.handleStateChange("passwordError", "");
      }
    }
  };

  fetchLogin = () => {
    let path = "/";
    let resStatus = 0;

    fetch(`${process.env.REACT_APP_API_URL}/api/auth/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((res) => {
        if (res.non_field_errors) {
          this.handleStateChange("loginError", res.non_field_errors[0]);
        }
        if (resStatus === 200) {
          let today = new Date();
          let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          this.props.cookies.set("token", res.token, {
            expires: tomorrow,
            path: path,
          });
          this.props.cookies.set("user", res.user, {
            expires: tomorrow,
            path: path,
          });
          this.props.cookies.set("username", res.username, {
            expires: tomorrow,
            path: path,
          });
          this.props.cookies.set("email", res.email, {
            expires: tomorrow,
            path: path,
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        loginError={this.state.loginError}
        usernameError={this.state.usernameError}
        passwordError={this.state.passwordError}
        serverError={this.state.serverError}
        success={this.state.success}
        onInputChange={this.handleInputChange}
        onClearHooks={this.handleClearHooks}
        onToggleView={this.props.onToggleView}
        onLogIn={this.handleLogIn}
      />
    );
  }
}

LoginFetch.propTypes = {
  onToggleView: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
  onToggleDisplaySuccess: PropTypes.func.isRequired,
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default withCookies(withRouter(LoginFetch));
