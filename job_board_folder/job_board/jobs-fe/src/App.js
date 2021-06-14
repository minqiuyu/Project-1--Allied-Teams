import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
//import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import {Provider} from 'react-redux';
import store from "./store";


class App extends Component {
  render() {
    return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Home />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Fragment>
    </Router>
    </Provider>
    );
  }
}

export default App;
//ReactDOM.render(<App />, document.getElementById('app'));