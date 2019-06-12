import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Card from "../atoms/Card";
import SortField from "../atoms/UsersSortField";
import SearchField from "../atoms/UsersSearch";
import UpdateMyDetails from "../../scenes/Users/UpdateMyDetails";
import { isAdmin } from "../../services/helpers";

function UsersToolbar(props: Props) {
  const { onFilter, onSort } = props;
  return (
    <Card>
      <Container>
        <div>
          <SortField onSort={onSort} />
          <SearchField onFilter={onFilter} />
        </div>
        <div>{isAdmin() && <UpdateMyDetails />}</div>
      </Container>
    </Card>
  );
}

export default UsersToolbar;

type Props = {
  onFilter: Function;
  onSort: Function;
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
