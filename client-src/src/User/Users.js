import React, { Component } from "react";
import { isAdmin } from "../helpers/utilities";
import { Icon } from "react-materialize";
import { Button } from "./components/UserListOptionsBar";
import { UserList } from "./components/index";
import "../App.css";
import styled from "styled-components";
import { Toast } from "../common";
import CreateUser from "./Create";
import Title from "../common/FacilityViewTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div.attrs({
  className: "container"
})``;

const Heading = styled.div.attrs({
  className: "px-2"
})``;

const FlexContainer = styled.div.attrs({
  className: "flex flex-row w-full justify-between mb-5"
})``;

const HaedingContainer = styled.div.attrs({
  className: "px-2 mt-5"
})``;

const UsersListContainer = styled.div.attrs({
  className: "w-full sm:w-full md:w-full lg:w-full xl:w-full px-2 mb-5"
})``;

export class Users extends Component {
  state = {
    user: null
  };

  redirect = target => {
    this.props.history.push(target);
  };

  onUserSelected = user => {
    this.setState({
      user
    });
  };

  onUserArchived = () => {
    this.setState({
      user: null
    });
    Toast("User Deleted Successfully!!!");
  };

  onUserUpdated = () => {
    this.setState({
      user: null
    });
    Toast("User Updated Successfully!!!");
  };

  _renderCreateUserButton = () => (
    <div className="hide-on-small-only mt-5 ml-auto">
      {isAdmin() && (
        <Button
          color="#517c4f"
          icon="add_circle"
          text="Add User"
          action={() => {}}
        />
      )}
    </div>
  );

  render() {
    return (
      <Container style={{ minHeight: this.state.containerHeight }}>
        <FlexContainer>
          <HaedingContainer>
            <Heading>
              <Title
                icon={<FontAwesomeIcon icon={faUsers} />}
                title="User Management"
              />
            </Heading>
          </HaedingContainer>
          <CreateUser trigger={this._renderCreateUserButton} />
        </FlexContainer>
        <FlexContainer>
          <UsersListContainer>
            <UserList onUserSelected={this.onUserSelected} />
          </UsersListContainer>
        </FlexContainer>
      </Container>
    );
  }
}

export default Users;
