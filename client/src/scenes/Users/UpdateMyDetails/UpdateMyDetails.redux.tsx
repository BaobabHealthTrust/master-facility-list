import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUser,
  fetchUsers,
  fetchUserDetails
} from "../../../services/redux/actions/users";
import UpdateMyDetailsContainer from "./UpdateMyDetails.container";

export class UpdateMyDetailsRedux extends Component<Props> {
  render() {
    return <UpdateMyDetailsContainer {...this.props} />;
  }
}

type Props = {
  user: any;
  updateUser: Function;
  fetchUsers: Function;
  fetchUserDetails: Function;
  errors?: any;
  roles: Array<any>;
};

const mapStateToProps = (state: any) => ({
  user: state.users.currentUser.details,
  errors: state.errors.putUser,
  roles: state.dependancies.roles.list
});
export default connect(
  mapStateToProps,
  { updateUser, fetchUsers, fetchUserDetails }
)(UpdateMyDetailsRedux);
