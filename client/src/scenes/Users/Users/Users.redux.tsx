import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers, delUser } from "../../../services/redux/actions/users";
import {
  fetchUserRoles,
  dispatchDependancyError
} from "../../../services/redux/actions/dependancies";
import UsersContainer from "./Users.container";

export class UsersRedux extends Component<Props> {
  render() {
    return <UsersContainer {...(this.props as any)} />;
  }
}

type Props = {
  users: Array<any>;
  fetchUsers: Function;
  fetchUserRoles?: Function;
  delUser: Function;
  roles: Array<any>;
};

const mapStateToProps = (state: any) => ({
  users: state.users.users,
  roles: state.dependancies.roles.list
});

export default connect(
  mapStateToProps,
  { fetchUsers, delUser, fetchUserRoles, dispatchDependancyError }
)(UsersRedux);
