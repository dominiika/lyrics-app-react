import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import MainModal from "../main/MainModal";
import MainAuthModal from "../account/MainAuthModal";
import SearchFetch from "../search/SearchFetch";
import PropTypes from "prop-types";

class NavBar extends Component {
  state = {
    searchForm: false,
  };

  handleToggleSearchForm = () => {
    this.setState({ searchForm: !this.state.searchForm });
  };

  handleLogOut = () => {
    let path = "/";
    this.props.cookies.remove("token", {
      path: path,
    });
    this.props.cookies.remove("user", {
      path: path,
    });
    this.props.cookies.remove("username", {
      path: path,
    });
    this.props.cookies.remove("email", {
      path: path,
    });
    window.location.reload();
  };

  render() {
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="md" className="nav">
          <Link to="">
            <Navbar.Brand className="brand-logo">
              <i className="fas fa-microphone pr-1"></i>
              LyricsApp
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {this.state.searchForm ? <SearchFetch /> : null}

              <Nav.Link
                as={Link}
                className="nav-link"
                to="#home"
                onClick={this.handleToggleSearchForm}
              >
                <i className="fas fa-search"></i>
              </Nav.Link>

              {this.props.cookies.get("token") ? (
                <MainModal cookies={this.props.cookies} />
              ) : null}

              <Nav.Link as={Link} className="nav-link" to="/lyrics/">
                Songs
              </Nav.Link>
              <Nav.Link as={Link} className="nav-link" to="/artists/">
                Artists
              </Nav.Link>
              {this.props.cookies.get("token") ? (
                <p className="nav-link login-nav" onClick={this.handleLogOut}>
                  Log out
                </p>
              ) : (
                <MainAuthModal show={false} />
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

NavBar.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
