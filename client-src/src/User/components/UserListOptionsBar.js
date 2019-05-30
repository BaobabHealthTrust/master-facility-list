import React from "react";
import { isAdmin } from "../../helpers/utilities";
import { Input } from "react-materialize";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { CreateUser } from "../Create";
import { Paper } from "@material-ui/core";
import UpdateUser from "../Update";

import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled(Paper)`
  padding: 0px 10px;
`;
const SearchInput = styled(TextField)`
  input {
    padding: 0px;
  }
`;

const ToolBarInput = styled(Input)`
  margin-top: 0px !important;
  input {
    margin: 0px !important;
  }
  select {
    margin: 0px !important;
  }
`;
export default function UserListOptionsBar(props) {
  return (
    <Wrapper>
      <div className="flex flex-row w-full justify-between mb-5">
        <ToolBarInput
          s={2}
          type="select"
          placeholder="Sort By"
          onChange={e => {
            props.onSort(e.target.value);
          }}
        >
          {props.sortList.map(list => (
            <option value={list.name}>{`Sort By ${list.title}`}</option>
          ))}
        </ToolBarInput>
        <ToolBarInput
          style={{ marginLeft: "1rem" }}
          s={6}
          type="text"
          placeholder="Search User Here..."
          onChange={e => {
            props.onFilter(e.target.value);
          }}
        />
        <div
          style={{ marginTop: "auto", marginBottom: "auto" }}
          className="hide-on-small-only ml-auto"
        >
          {props.user && (
            <UpdateUser
              user={props.user}
              trigger={
                <div>
                  <Button
                    color="#5a90dc"
                    icon="edit"
                    text={`Edit`}
                    action={() => {}}
                  />
                </div>
              }
            />
          )}
        </div>
      </div>
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
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  ) : (
    <Link
      className={`ml-3 waves-effect btn`}
      style={{ backgroundColor: color }}
      to="#"
      onClick={() => props.action()}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  );
}

function Search() {
  return (
    <SearchInput
      placeholder="Search User Here..."
      onChange={() => {}}
      margin="normal"
      variant="outlined"
    />
  );
}
