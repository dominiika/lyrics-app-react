import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/stylesheet.css";
import NavBar from "./layout/Navbar";
import HomePage from "./main/HomePage";
import { Route, Switch } from "react-router-dom";
import SongDetailFetch from "./song/SongDetailFetch";
import ArtistDetailFetch from "./artist/ArtistDetailFetch";
import ArtistsListFetch from "./artist/ArtistListFetch";
import SongsListFetch from "./song/SongListFetch";
import NotFound from "./main/NotFound";
import Footer from "./layout/Footer";
import { withCookies } from "react-cookie";

function App(props) {
  return (
    <React.Fragment>
      <NavBar cookies={props.cookies} />

      <Switch>
        <Route
          exact
          path="/"
          render={() => <HomePage cookies={props.cookies} />}
        />
        <Route
          exact
          path="/lyrics/"
          render={(params) => (
            <SongsListFetch {...params} cookies={props.cookies} />
          )}
        />
        <Route
          exact
          path="/lyrics/:id"
          render={(params) => (
            <SongDetailFetch {...params} cookies={props.cookies} />
          )}
        />
        <Route
          exact
          path="/artists/"
          render={(params) => (
            <ArtistsListFetch {...params} cookies={props.cookies} />
          )}
        />
        <Route
          exact
          path="/artists/:id"
          render={(params) => (
            <ArtistDetailFetch {...params} cookies={props.cookies} />
          )}
        />
        <Route path="*" exact={true} component={NotFound} />
      </Switch>

      <Footer />
    </React.Fragment>
  );
}

export default withCookies(App);
