import PropTypes from "prop-types";
import React, { Component } from "react";

export default class LaneHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    cards: PropTypes.array,
    totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  render() {
    const { title, cards, totalCount } = this.props;
    return (
      <div>
        <b>{title}</b> ({cards.length}/{totalCount})
      </div>
    );
  }
}
