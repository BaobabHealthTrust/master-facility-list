import React from "react";
import Container from "../../components/atoms/Container";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../../components/molecules/PageTitle";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import CreateUserModal from "./CreateUser";

function Users(props: Props) {
  return (
    <Container style={{ paddingTop: "25px" }}>
      <Grid container spacing={32}>
        <Grid item xs={12} sm={12} md={12}>
          <PageTitle
            title="User Management"
            options={
              <div>
                <CreateUserModal />
              </div>
            }
            icon={<FontAwesomeIcon icon={faUsers} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

type Props = {
  users: Array<any>;
};
export default Users;
