import React from "react";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import UpdateUser from "../Update";

const Row = styled.div.attrs({
  className: "flex flex-row w-full justify-between"
})``;
const Wrapper = styled.div.attrs({
  className: "col m4 s12"
})``;

const Card = styled(Paper).attrs({})`
  padding: 1rem 1rem;
`;

const Content = styled.div`
  padding: 5px;
  margin-bottom: 5px;
`;

const Footer = styled.div`
  border-top: 1px solid #b1b1b1;
  padding: 5px;
  padding-top: 10px;
`;

const UserIcon = styled.div`
  i {
    font-size: 5rem;
    color: #375a8c;
  }
`;

const UserName = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5rem;
  span {
    font-weight: bold;
  }
`;
const UserRole = styled.div`
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

const Email = styled.div`
  display: inline-block;
  padding: 0 0.5rem;
  vertical-align: middle;
  span {
    padding-bottom: 5px;
  }
  span i {
    color: #505050;
    display: inline-block;
    padding: 0 0.5rem;
    vertical-align: middle;
    font-size: 16px;
  }
`;

export function UserCard(props) {
  return (
    <Wrapper>
      <Card>
        <Content>
          <Row>
            <UserIcon className="p-2">
              <i className="material-icons">person</i>
            </UserIcon>
            <UserName className="p-2">
              {props.user.firstname} <br />
              <span>{props.user.lastname}</span>
            </UserName>
            {/* <UserRole className="ml-auto">
              Admin <br /> 0888888899
            </UserRole> */}
          </Row>
          <Row>
            <Email className="pl-2">
              <span>
                <i className="material-icons">email</i>
                {props.user.email}
              </span>
            </Email>
          </Row>
        </Content>
        <Footer>
          <Row>
            <div style={{ display: "flex" }}>
              <UpdateUser
                user={props.user}
                trigger={
                  <span>
                    <Button
                      color="#5a90dc"
                      icon="add_circle"
                      text="Edit"
                      action={() => {}}
                    />
                  </span>
                }
              />

              <Link
                to="#"
                onClick={() => {
                  props.onArchiveUser();
                }}
                style={{
                  display: "inline-block",
                  padding: "0.5rem 0.5rem",
                  verticalAlign: "middle",
                  color: "#505050"
                }}
              >
                <i className="material-icons">delete_outlined</i>
              </Link>
            </div>
          </Row>
        </Footer>
      </Card>
    </Wrapper>
  );
}
export function Button(props) {
  const { color, icon, text } = props;
  return props.link ? (
    <Link
      className={`ml-3 waves-effect btn`}
      to={props.link}
      style={{ backgroundColor: color }}
    >
      {text}
    </Link>
  ) : (
    <Link
      className={`ml-3 waves-effect btn`}
      style={{ backgroundColor: color }}
      to="#"
      onClick={() => props.action()}
    >
      {text}
    </Link>
  );
}
