import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewJobForm from "./NewJobForm";

class NewJobModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Edit Job";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Edit Job Listing";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewJobForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              job={this.props.job}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewJobModal;