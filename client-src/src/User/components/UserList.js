import React, { Component } from "react";
import { connect } from "react-redux";
import { UserCard } from "./UserCard";
import UserListOptionsBar from "./UserListOptionsBar";
import { Card } from "react-materialize";
import { fetchUsers, postFormData } from "../../actions";
import { MflGrid, Loader } from "../../common/index";
import styled from "styled-components";
import "../../App.css";
import { chunk } from "lodash";
import _ from "lodash";
import moment from "moment";
import { Toast } from "../../common";
import swal from "sweetalert";

const Wrapper = styled.div``;
const Row = styled.div.attrs({
  className: "row"
})``;
class UserList extends Component {
  state = {
    sort: "firstname",
    filter: ""
  };

  getCurrentUser = () =>
    this.props.currentUser.token
      ? this.props.users.filter(user => user.id == this.props.currentUser.id)[0]
      : null;

  componentWillMount() {
    this.props.fetchUsers();
  }
  columns = [
    { name: "username", title: "Username" },
    { name: "firstname", title: "Firstname" },
    { name: "lastname", title: "Lastname" }
  ];

  _archiveUser = async user => {
    const { postFormData, fetchUsers } = this.props;
    postFormData(
      { archived_date: moment().format("YYYY-MM-DD") },
      `Clients/${user.id}`,
      "PATCH",
      "ARCHIVE_USER"
    )
      .then(async () => {
        Toast("User Deleted Successfully!!!");
        await fetchUsers();
      })
      .catch(() => {
        Toast("Failed To Delete User");
      });
  };

  _onArchiveUser = user => {
    swal({
      icon: "warning",
      title: `Are You Sure You Want To Delete the user (${user.firstname} ${
        user.lastname
      }) ?`,
      buttons: {
        cancel: "No",
        confirm: "Yes"
      },
      closeOnClickOutside: false
    }).then(async response => {
      if (response) {
        await this._archiveUser(user);
      }
    });
  };

  _onFilter = filter => {
    this.setState({
      filter
    });
  };
  _onSort = sort => {
    this.setState({
      sort
    });
  };
  _getUsers = () => {
    return this.state.sort === ""
      ? this.props.users
      : _.sortBy(
          this.state.filter === ""
            ? this.props.users
            : this.props.users.filter(user =>
                _.includes(
                  _.lowerCase(JSON.stringify(user)),
                  _.lowerCase(this.state.filter)
                )
              ),
          this.state.sort
        );
  };

  _renderUserCards = chunks => {
    return chunks.map(userChunk => (
      <Row>
        {userChunk.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onArchiveUser={() => this._onArchiveUser(user)}
          />
        ))}
      </Row>
    ));
  };

  defaultSorting = [{ columnName: "firstname", direction: "asc" }];
  render() {
    const { users, onUserSelected, isLoading } = this.props;
    const usersChunks = chunk(this._getUsers(), 3);
    return (
      <div>
        {this.props.currentUser.token && (
          <div>
            <UserListOptionsBar
              sortList={this.columns}
              onFilter={filter => this._onFilter(filter)}
              onSort={sort => this._onSort(sort)}
              user={this.getCurrentUser()}
            />
            <Wrapper>{this._renderUserCards(usersChunks)}</Wrapper>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users.users,
  currentUser: state.users.loggedInUser,
  isLoading: state.users.isLoading
});

const mapDispatchToProps = { fetchUsers, postFormData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
