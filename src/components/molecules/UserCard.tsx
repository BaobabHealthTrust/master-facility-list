import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Card from "../atoms/Card";

function UserCard(props: Props) {
  const { user } = props;
  return (
    <Card style={{ padding: "10px" }}>
      <UserDetailsContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon
            style={{ fontSize: "64px", color: "#375a8c" }}
            icon={faUser}
          />
          <UserName>
            <div>{user.firstname}</div>
            <div>
              <b>{user.lastname}</b>
            </div>
          </UserName>
        </div>
        <div>System Admin</div>
      </UserDetailsContainer>
      <Contacts>
        <FontAwesomeIcon icon={faEnvelope} /> {user.email}
      </Contacts>
      <Footer>
        <Button style={{ margin: "0px" }} theme="secondary">
          <FontAwesomeIcon icon={faEdit} />
          Edit User
        </Button>
        <FontAwesomeIcon
          style={{ margin: "0px 10px", cursor: "pointer" }}
          icon={faTrashAlt}
        />
      </Footer>
    </Card>
  );
}

export default UserCard;

type Props = {
  user: any;
};
const UserDetailsContainer = styled.div`
  display: flex;

  padding: 10px 0px;
  justify-content: space-between;
`;
const UserName = styled.div`
  margin: 0px 10px;
  font-size: 24px;
`;

const Contacts = styled.div`
  display: block;
  color: #505050;
  font-size: 14px;
  border-bottom: 1px solid #ededed;
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  color: #505050;
`;
