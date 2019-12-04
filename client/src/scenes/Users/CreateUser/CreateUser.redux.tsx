import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser, fetchUsers } from "../../../services/redux/actions/users";
import CreateUserContainer from "./CreateUser.container";

export class CreateUserRedux extends Component<Props> {
  render() {
    return <CreateUserContainer {...this.props} />;
  }
}

type Props = {
  createUser: Function;
  fetchUsers: Function;
  roles: Array<any>;
  errors?: any;
};

const mapStateToProps = (state: any) => ({
  errors: state.errors,
  roles: state.dependancies.roles.list
});
export default connect(
  mapStateToProps,
  { createUser, fetchUsers }
)(CreateUserRedux);
