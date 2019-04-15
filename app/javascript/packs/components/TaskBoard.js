import React from "react";
import Board from "react-trello";
import LaneHeader from "./LaneHeader";
import AddPopup from "./AddPopup";
import EditPopup from "./EditPopup";
import axios from "axios";
import TaskRepository from "../repositories/TaskRepository";
import FetchService from "../services/FetchService";
import { Button } from "react-bootstrap";

export default class TasksBoard extends React.Component {
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
    return {
      lanes: [
        this.generateLane("new_task", "New"),
        this.generateLane("in_development", "In Dev"),
        this.generateLane("in_qa", "In QA"),
        this.generateLane("in_code_review", "in CR"),
        this.generateLane("ready_for_release", "Ready for release"),
        this.generateLane("released", "Released"),
        this.generateLane("archived", "Archived")
      ]
    };
  }

  loadLines() {
    this.loadLine("new_task");
    this.loadLine("in_development");
    this.loadLine("in_qa");
    this.loadLine("in_code_review");
    this.loadLine("ready_for_release");
    this.loadLine("released");
    this.loadLine("archived");
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
    return TaskRepository.index({ q: { state_eq: state }, page: page, per_page: 10 }).then(({ data }) => {
      return data;
    });
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    TaskRepository.update(cardId, { task: { state: targetLaneId } }).then(() => {
      this.loadLine(sourceLaneId);
      this.loadLine(targetLaneId);
    });
  };

  handleAddShow = () => {
    this.setState({ addPopupShow: true });
  };

  handleAddClose = (added = false) => {
    this.setState({ addPopupShow: false });
    if (added == true) {
      this.loadLine("new_task");
    }
  };

  onCardClick = cardId => {
    this.setState({ editCardId: cardId });
    this.handleEditShow();
  };

  handleEditClose = (edited = "") => {
    this.setState({ editPopupShow: false, editCardId: null });
    switch (edited) {
      case "new_task":
      case "in_development":
      case "in_qa":
      case "in_code_review":
      case "ready_for_release":
      case "released":
      case "archived":
        this.loadLine(edited);
        break;
      default:
        break;
    }
  };

  handleEditShow = () => {
    this.setState({ editPopupShow: true });
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1>Your tasks</h1>
          <Button bsStyle="primary" onClick={this.handleAddShow}>
            Create new task
          </Button>
        </div>
        <Board
          data={this.getBoard()}
          customLaneHeader={<LaneHeader />}
          cardsMeta={this.state}
          draggable
          laneDraggable={false}
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.onCardClick}
        />
        <AddPopup show={this.state.addPopupShow} onClose={this.handleAddClose} />
        <EditPopup show={this.state.editPopupShow} onClose={this.handleEditClose} cardId={this.state.editCardId} />
      </div>
    );
  }
}
