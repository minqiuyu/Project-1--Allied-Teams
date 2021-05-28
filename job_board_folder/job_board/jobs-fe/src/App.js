import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/accounts/Register";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
    <Router>
      <Fragment>
        <Header />
        <Home />
        <Switch>
          <Route exact path="/register" component={Register} />
        </Switch>
      </Fragment>
    </Router>
    );
  }
}

export default App;