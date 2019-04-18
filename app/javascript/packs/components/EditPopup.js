import { Modal, Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import FetchService from "../services/FetchService";
import TaskRepository from "../repositories/TaskRepository";
import UserSelect from "./UserSelect";

export default class EditPopup extends React.Component {
  static propTypes = {
    onCardUpdate: PropTypes.func,
    loadCard: PropTypes.func,
    onCardDelete: PropTypes.func,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onClick: PropTypes.func
  };
  state = {
    task: {
      id: null,
      name: "",
      description: "",
      state: null,
      author: {
        id: null,
        firstName: null,
        lastName: null,
        email: null
      },
      assignee: {
        id: null,
        firstName: null,
        lastName: null,
        email: null
      },
      isLoading: true
    }
  };

  loadCard = cardId => {
    this.setState({ isLoading: true });
    TaskRepository.show(cardId).then(({ data }) => {
      this.setState({ task: data });
      this.setState({ isLoading: false });
    });
  };

  componentDidMount() {
    const { cardId } = this.props;
    this.loadCard(this.props.cardId);
  }

  handleNameChange = e => {
    this.setState({ task: { ...this.state.task, name: e.target.value } });
  };

  handleDecriptionChange = e => {
    this.setState({ task: { ...this.state.task, description: e.target.value } });
  };

  handleCardUpdate = () => {
    const {
      task: { name, id, description, author, assignee, state }
    } = this.state;
    const cardUpdated = {
      name,
      id,
      description,
      authorId: author.id,
      assigneeId: assignee ? assignee.id : null,
      state
    };
    this.props.onCardUpdate(cardUpdated);
  };

  handleCardDelete = () => {
    const { cardId } = this.props;
    this.props.onCardDelete(cardId);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    const {
      task: { id, state, name, description, author }
    } = this.state;
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {id} [{state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
            </form>
            Author: {author.firstName} {author.lastName}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button onClick={this.props.onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardUpdate}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
