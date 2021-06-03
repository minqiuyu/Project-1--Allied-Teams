import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./routes";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <div>
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Job Board
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          <LinkContainer to="/jobboard">
              <Nav.Link>Board</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Fragment><Header /></Fragment>
      <Routes />
    </div>
    </div>
  );
}

export default App;