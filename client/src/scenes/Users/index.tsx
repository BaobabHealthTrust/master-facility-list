import React, { Component } from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { fetchUsers, delUser } from "../../services/redux/actions/users";
import {
  fetchUserRoles,
  dispatchDependancyError
} from "../../services/redux/actions/dependancies";
// @ts-ignore
import { sortBy } from "lodash";
import { toast } from "react-toastify";
import Notification from "../../components/atoms/Notification";
import swal from "sweetalert";
import RedirectOnMobile from "../../components/atoms/RedirectOnMobile";
import { getUser } from "../../services/helpers";
import Ac from "../../components/atoms/Ac";

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

  onDeleteUser = (userId: number) => {
    let token = sessionStorage.getItem("token") || "";
    // @ts-ignore
    swal({
      icon: "warning",
      title: `Are You Sure You Want To Delete the user ?`,
      buttons: {
        cancel: "No",
        confirm: "Yes"
      },
      closeOnClickOutside: false
    }).then(async (response: any) => {
      if (response) {
        this.props
          .delUser(userId, token)
          .then(() => {
            toast.info(<Notification message="User Deleted" />);
            this.props.fetchUsers(token);
          })
          .catch(() => {
            toast.info(
              <Notification
                error
                message="Failed To Delete Details. Please Try Again"
              />
            );
          });
      }
    });
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
    if (this.props.roles.length === 0) {
      this.props.fetchUserRoles &&
        this.props.fetchUserRoles().catch(() => {
          dispatchDependancyError();
        });
    }
  }
  render() {
    const users = this.getUsers();
    return (
      <>
        <RedirectOnMobile />
        <Ac
          role={getUser().role}
          action="user:view"
          allowed={() => (
            <Users
              users={users}
              onFilter={this.onFilter}
              onSort={this.onSort}
              onDeleteUser={this.onDeleteUser}
            />
          )}
        />
      </>
    );
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
)(index);
