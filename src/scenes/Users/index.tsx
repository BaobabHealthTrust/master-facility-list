import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { fetchUsers } from "../../services/redux/actions/users";
// @ts-ignore
import { sortBy } from "lodash";

export class index extends Component<Props> {
  state = {
    filter: "",
    sort: "username"
  };
  onFilter = (filter: any) => {
    this.setState({ filter });
  };

  onSort = (sort: any) => {
    this.setState({ sort });
  };

  getUsers = () =>
    this.state.filter === ""
      ? sortBy(this.props.users, this.state.sort)
      : sortBy(
          this.props.users.filter(val =>
            JSON.stringify(val)
              .toLowerCase()
              .includes(this.state.filter.toLowerCase())
          ),
          this.state.sort
        );

  componentDidMount() {
    if (this.props.users.length == 0) {
      let token = sessionStorage.getItem("token");
      if (token) {
        this.props.fetchUsers(token);
      }
    }
  }
  render() {
    const users = this.getUsers();
    return (
      <Users users={users} onFilter={this.onFilter} onSort={this.onSort} />
    );
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
