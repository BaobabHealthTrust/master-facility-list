import React, { useState, useEffect } from "react";
// @ts-ignore
import { sortBy } from "lodash";
import { toast } from "react-toastify";
import Notification from "../../../components/atoms/Notification";
import swal from "sweetalert";
import RedirectOnMobile from "../../../components/atoms/RedirectOnMobile";
import { getUser } from "../../../services/helpers";
import Ac from "../../../components/atoms/Ac";
import UsersView from "./Users.view";

function UsersContainer(props: Props) {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("username");

  useEffect(() => {
    if (props.users.length === 0) {
      let token = sessionStorage.getItem("token");
      if (token) {
        props.fetchUsers(token);
      }
    }
    if (props.roles.length === 0) {
      props.fetchUserRoles &&
        props.fetchUserRoles().catch(() => {
          props.dispatchDependancyError();
        });
    }
  }, [props.users, props.roles]);

  const onFilter = (filter: any) => {
    setFilter(filter);
  };

  const onSort = (sort: any) => {
    setSort(sort);
  };

  const onDeleteUser = (userId: number) => {
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
        props
          .delUser(userId, token)
          .then(() => {
            toast.info(<Notification message="User Deleted" />);
            props.fetchUsers(token);
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

  const getUsers = () =>
    filter === ""
      ? sortBy(props.users, sort)
      : sortBy(
          props.users.filter(val =>
            JSON.stringify(val)
              .toLowerCase()
              .includes(filter.toLowerCase())
          ),
          sort
        );

  return (
    <>
      <RedirectOnMobile />
      <Ac
        role={getUser().role}
        action="user:view"
        allowed={() => (
          <UsersView
            users={getUsers()}
            onDeleteUser={onDeleteUser}
            onFilter={onFilter}
            onSort={onSort}
          />
        )}
      />
    </>
  );
}

type Props = {
  users: Array<any>;
  fetchUsers: Function;
  fetchUserRoles?: Function;
  delUser: Function;
  dispatchDependancyError: Function;
  roles: Array<any>;
};

export default UsersContainer;
