import React from "react";
import Container from "../../atoms/Container";
import { Grid } from "@material-ui/core";
import PageTitle from "../../molecules/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import User from "../../molecules/UserCard";

function UsersList(props: Props) {
  const { users } = props;
  return (
    <Grid container spacing={24}>
      {users.map(user => (
        <Grid item sm={12} xs={12} md={4}>
          <User user={user} />
        </Grid>
      ))}
    </Grid>
  );
}

export default UsersList;

type Props = {
  users: Array<any>;
};
