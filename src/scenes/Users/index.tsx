import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { fetchUsers } from "../../services/redux/actions/users";

export class index extends Component<Props> {
  componentDidMount() {
    if (this.props.users.length == 0) {
      let token = sessionStorage.getItem("token");
      if (token) {
        this.props.fetchUsers(token);
      }
    }
  }
  render() {
    const { users } = this.props;
    return <Users users={users} />;
  }
}

type Props = {
  users: Array<any>;
  fetchUsers: Function;
};

const mapStateToProps = (state: any) => ({
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(index);
