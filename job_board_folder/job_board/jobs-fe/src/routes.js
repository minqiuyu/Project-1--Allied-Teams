import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import JobList from "./components/JobList";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}