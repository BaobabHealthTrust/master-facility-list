import React from "react";
import Container from "../../../components/atoms/Container";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../../../components/molecules/PageTitle";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import CreateUserModal from "../CreateUser";
import OptionsBar from "../../../components/molecules/UsersOptionsBar";
import UsersList from "../../../components/organisms/UsersList";
import { getUser } from "../../../services/helpers";
import Ac from "../../../components/atoms/Ac";

function UsersView(props: Props) {
  const { users, onFilter, onSort, onDeleteUser } = props;
  const User = getUser();
  return (
    <Container style={{ paddingTop: "25px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <PageTitle
            title="User Management"
            options={
              <Ac
                role={User.role}
                action="user:create"
                allowed={() => <CreateUserModal />}
              />
            }
            icon={<FontAwesomeIcon icon={faUsers} />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <OptionsBar onFilter={onFilter} onSort={onSort} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <UsersList users={users} onDeleteUser={onDeleteUser} />
        </Grid>
      </Grid>
    </Container>
  );
}

type Props = {
  users: Array<any>;
  onFilter: Function;
  onSort: Function;
  onDeleteUser: Function;
};
export default UsersView;
