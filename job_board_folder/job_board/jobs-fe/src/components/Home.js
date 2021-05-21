import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import JobList from "./JobList";
import NewJobModal from "./NewJobModal";

import axios from "axios";

import { API_URL } from "../constants/index";

class Home extends Component {
  state = {
    jobs: []
  };

  componentDidMount() {
    this.resetState();
  }

  getJobs = () => {
    axios.get(API_URL).then(res => this.setState({ jobs: res.data }));
  };

  resetState = () => {
    this.getJobs();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <JobList
              jobs={this.state.jobs}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewJobModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;