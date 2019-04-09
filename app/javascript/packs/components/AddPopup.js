import React from "react";
import UserSelect from "./UserSelect";
import { Modal, Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { fetch } from "./Fetch";

export default class EditPopup extends React.Component {
  state = {
    name: "",
    description: "",
    assignee: {
      id: null,
      first_name: null,
      last_name: null,
      email: null
    }
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleDecriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleCardAdd = () => {
    fetch("POST", window.Routes.api_v1_tasks_path(), {
      task: {
        name: this.state.name,
        description: this.state.description
      }
    }).then(response => {
      if (response.statusText == "Created") {
        this.props.onClose(true);
      } else {
        alert(response.status + " - " + response.statusText);
      }
    });
  };

  handleAssigneeChange = value => {
    this.setState({ assignee: value });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
              <div>
                <FormGroup controlId="formControlsSelectAuthor">
                  <ControlLabel>Assignee:</ControlLabel>
                  <UserSelect id="Assignee" onChange={this.handleAssigneeChange} value={this.state.assignee} />
                </FormGroup>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardAdd}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
