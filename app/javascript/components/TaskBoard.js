import { Button } from "react-bootstrap";
import axios from "axios";
import Board from "react-trello";
import React, { Component } from "react";

import AddPopup from "components/AddPopup";
import EditPopup from "components/EditPopup";
import FetchService from "services/FetchService";
import LaneHeader from "components/LaneHeader";
import TaskRepository from "repositories/TaskRepository";

const BOARD_COLUMNS = {
  newTask: {
    title: "New",
    key: "new_task"
  },
  inDevelopment: {
    title: "In Dev",
    key: "in_development"
  },
  inQa: {
    title: "in Qa",
    key: "in_qa"
  },
  inCodeReview: {
    title: "in CR",
    key: "in_code_review"
  },
  readyForRelease: {
    title: "Ready for release",
    key: "ready_for_release"
  },
  released: {
    title: "Released",
    key: "released"
  },
  archived: {
    title: "Archived",
    key: "archived"
  }
};

export default class TaskBoard extends Component {
  state = {
    board: {
      new_task: null,
      in_development: null,
      in_qa: null,
      in_code_review: null,
      ready_for_release: null,
      released: null,
      archived: null
    },
    addPopupShow: false,
    editPopupShow: false,
    editCardId: null
  };

  generateLane(id, title) {
    const tasks = this.state[id];

    return {
      id,
      title,
      totalCount: tasks ? tasks.meta.totalCount : "None",
      cards: tasks
        ? tasks.items.map(task => {
            return {
              ...task,
              label: task.state,
              title: task.name
            };
          })
        : []
    };
  }

  getBoard() {
    const lanes = Object.values(BOARD_COLUMNS).map(({ key, title }) => this.generateLane(key, title));
    return { lanes };
  }

  loadLines() {
    Object.values(BOARD_COLUMNS).forEach(({ key }) => this.loadLine(key));
  }

  componentDidMount() {
    this.loadLines();
  }

  loadLine(state, page = 1) {
    this.fetchLine(state, page).then(data => {
      this.setState({
        [state]: data
      });
    });
  }

  fetchLine(state, page = 1) {
    return TaskRepository.index({ q: { state_eq: state, s: "id asc" }, page: page, per_page: 10 }).then(({ data }) => data);
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    TaskRepository.update(cardId, { task: { state: targetLaneId } }).then(() => {
      this.loadLine(sourceLaneId);
      this.loadLine(targetLaneId);
    });
  };

  handleTaskAdd = task => {
    return TaskRepository.create(task)
      .then(() => {
        this.handleAddPopupClose();
        this.loadLines();
      })
      .catch(({ status, statusText }) => alert(`${status} - ${statusText}`));
  };

  handleCardUpdate = card => {
    TaskRepository.update(card.id, card)
      .then(() => {
        this.handleEditPopupClose();
        this.loadLines();
      })
      .catch(error => alert(error.message));
  };

  handleCardDelete = cardId => {
    TaskRepository.destroy(cardId)
      .then(() => {
        this.handleEditPopupClose();
        this.loadLines();
      })
      .catch(error => alert(`Delete failed! ${error.message}`));
  };

  handleAddPopupShow = () => {
    this.setState({ addPopupShow: true });
  };

  handleAddPopupClose = () => {
    this.setState({ addPopupShow: false });
  };

  handleEditPopupClose = () => {
    this.setState({ editPopupShow: false, editCardId: null });
  };

  onCardClick = cardId => {
    this.setState({ editCardId: cardId, editPopupShow: true });
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1>Your tasks</h1>
          <Button bsStyle="primary" onClick={this.handleAddPopupShow}>
            Add new task
          </Button>
        </div>
        <Board
          data={this.getBoard()}
          customLaneHeader={<LaneHeader />}
          cardsMeta={this.state}
          draggable
          laneDraggable={true}
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.onCardClick}
        />
        <AddPopup show={this.state.addPopupShow} onTaskAdd={this.handleTaskAdd} onClose={this.handleAddPopupClose} />
        {this.state.editPopupShow && (
          <EditPopup
            show={this.state.editPopupShow}
            onCardDelete={this.handleCardDelete}
            onCardUpdate={this.handleCardUpdate}
            onClose={this.handleEditPopupClose}
            cardId={this.state.editCardId}
          />
        )}
      </div>
    );
  }
}
