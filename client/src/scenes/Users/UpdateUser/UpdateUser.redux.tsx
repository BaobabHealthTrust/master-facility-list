import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, fetchUsers } from "../../../services/redux/actions/users";
import UpdateUserContainer from "./UpdateUser.container";

export class UpdateUserRedux extends Component<Props> {
  render() {
    return <UpdateUserContainer {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  errors: state.errors.putUser,
  roles: state.dependancies.roles.list
});
export default connect(
  mapStateToProps,
  { updateUser, fetchUsers }
)(UpdateUserRedux);

type Props = {
  user: any;
  updateUser: Function;
  fetchUsers: Function;
  roles: Array<any>;
  errors?: any;
};
