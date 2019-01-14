import React, { Component } from "react";
import { UserForm } from "../components";

export default class index extends Component {
  render() {
    return (
      <UserForm
        onUserCreationSuccess={this.props.onUserCreationSuccess}
        onUserCreationError={this.props.onUserCreationError}
        title="Create new administrator user"
      />
    );
  }
}
