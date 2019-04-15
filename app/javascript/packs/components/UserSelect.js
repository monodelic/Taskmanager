import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import FetchService from "../services/FetchService";

export default class UserSelect extends Component {
  state = {
    inputValue: ""
  };

  getOptionLabel = ({ first_name, last_name }) => `${first_name} ${last_name}`;

  getOptionValue = option => option.id;

  loadOptions = () => {
    const { inputValue } = this.state;
    return FetchService.get(
      window.Routes.api_v1_users_path({ q: { first_name_or_last_name_cont: inputValue }, format: "json" })
    ).then(({ data }) => {
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
