import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-materialize";
import { fetchUsers } from "../../actions/index";
import { MflGrid, Loader } from "../../common/index";

import "../../App.css";
class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  columns = [
    { name: "username", title: "Username" },
    { name: "firstname", title: "Firstname" },
    { name: "lastname", title: "Lastname" },
    { name: "email", title: "Email" }
  ];

  defaultSorting = [{ columnName: "firstname", direction: "asc" }];
  render() {
    const { users, onUserSelected, isLoading } = this.props;
    return (
      <Card className="user-list">
        {isLoading && this.state.isLoading ? (
          <Loader />
        ) : (
          <MflGrid
            rows={users}
            columns={this.columns}
            pageSize={10}
            defaultSorting={this.defaultSorting}
            rowSelected={user => onUserSelected(user)}
            title="Users"
          />
        )}
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users.users,
  isLoading: state.users.isLoading
});

const mapDispatchToProps = { fetchUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
