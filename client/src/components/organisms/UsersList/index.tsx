import React, { useState } from "react";
import Container from "../../atoms/Container";
import { Grid } from "@material-ui/core";
import PageTitle from "../../molecules/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import User from "../../molecules/UserCard";
import Pagination from "../../atoms/Pagination";
// @ts-ignore
import { chunk } from "lodash";

function UsersList(props: Props) {
  const [page, setPage] = useState(1);
  const { users, onDeleteUser } = props;
  const chunks = chunk(users, 8);

  const currentUsers: Array<any> = chunks.length > 0 ? chunks[page - 1] : [];
  return (
    <Grid container spacing={3}>
      {currentUsers.map(user => (
        <Grid item sm={12} xs={12} md={3}>
          <User user={user} onDelete={onDeleteUser} />
        </Grid>
      ))}
      {chunks.length > 1 && (
        <Grid item sm={12} xs={12} md={12}>
          <Pagination
            onPageChange={(page: number) => setPage(page)}
            currentPage={page}
            pages={chunks.length}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default UsersList;

type Props = {
  users: Array<any>;
  onDeleteUser: Function;
};
