import React, { Component } from "react";
import footerResizer from "../helpers/footerResize";
import { Icon, Button, Modal } from "react-materialize";
import { UserList } from "./components/index";
import CreateUser from "./Create";
import ViewUser from "./Show";
import "../App.css";
import styled from "styled-components";
import { Toast } from "../common";

const Container = styled.div.attrs({
  className: "container"
})``;

const Heading = styled.h4``;

const FlexContainer = styled.div.attrs({
  className: "flex flex-wrap pt-16"
})``;

const HaedingContainer = styled.div.attrs({
  className: "w-full sm:w-full md:w-full lg:w-full xl:w-full px-2 mb-4"
})``;

const UsersListContainer = styled.div.attrs({
  className: "w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/3 px-2"
})``;

const ViewUserContainer = styled.div.attrs({
  className: "w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 px-2"
})``;

export class Users extends Component {
  state = {
    user: null
  };

  redirect = target => {
    this.props.history.push(target);
  };

  componentWillMount() {
    const containerHeight = window.innerHeight - 128;
    this.setState({ containerHeight });
  }

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
    <Button
      floating
      large
      waves="light"
      className="hide-on-small-only blue mfl-fl-right"
      icon="add"
    />
  );
  render() {
    return (
      <Container style={{ minHeight: this.state.containerHeight }}>
        <FlexContainer>
          <HaedingContainer>
            <Heading>
              <Icon>people</Icon> USER MANAGEMENT
              <CreateUser trigger={this._renderCreateUserButton} />
            </Heading>
          </HaedingContainer>
          <UsersListContainer>
            <UserList onUserSelected={this.onUserSelected} />
          </UsersListContainer>
          <ViewUserContainer>
            <ViewUser
              user={this.state.user}
              onUserArchived={this.onUserArchived}
              onUserUpdated={this.onUserUpdated}
              redirect={this.redirect}
            />
          </ViewUserContainer>
        </FlexContainer>
      </Container>
    );
  }
}

export default Users;
