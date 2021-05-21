import React, { Component } from "react";
import { Table } from "reactstrap";
import NewJobModal from "./NewJobModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class JobList extends Component {
  render() {
    const jobs = this.props.jobs;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Title</th>
            <th>Contact Email</th>
            <th>Contact Phone</th>
            <th>Description</th>
            <th>Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!jobs || jobs.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No listings here yet!</b>
              </td>
            </tr>
          ) : (
            jobs.map(job => (
              <tr key={job.pk}>
                <td>{job.title}</td>
                <td>{job.email}</td>
                <td>{job.phone}</td>
                <td>{job.description}</td>
                <td>{job.registrationDate}</td>
                <td align="center">
                  <NewJobModal
                    create={false}
                    job={job}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={job.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default JobList;