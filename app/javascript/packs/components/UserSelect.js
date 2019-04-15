import React, { Component } from "react";
import UserRepository from "../repositories/UserRepository";
import AsyncSelect from "react-select/lib/Async";
import FetchService from "../services/FetchService";

export default class UserSelect extends Component {
  state = {
    inputValue: ""
  };

  getOptionLabel = ({ firstName, lastName }) => `${firstName} ${lastName}`;

  getOptionValue = option => option.id;

  loadOptions = () => {
    const { inputValue } = this.state;
    return UserRepository.index({ q: { first_name_or_last_name_cont: inputValue } }).then(({ data }) => {
      return data.items;
    });
  };

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
  };

  componentDidMount() {
    this.loadOptions();
  }

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={this.props.isDisabled}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
