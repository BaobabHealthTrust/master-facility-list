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
import UpdateUser from "../../scenes/Users/UpdateUser";

function UserCard(props: Props) {
  const { user, onDelete } = props;
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
        <UpdateUser user={user} />
        <i onClick={() => onDelete(user.id)}>
          <FontAwesomeIcon
            style={{ margin: "0px 10px", cursor: "pointer" }}
            icon={faTrashAlt}
          />
        </i>
      </Footer>
    </Card>
  );
}

export default UserCard;

type Props = {
  user: any;
  onDelete: Function;
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
