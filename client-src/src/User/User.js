import React from "react";
import footerResizer from "../helpers/footerResize";
import { Icon } from "react-materialize";
import { UserList } from "./components/index";
import CreateUser from "./Create";
import ViewUser from "./Show";
import "../App.css";
import styled from "styled-components";

const Container = styled.div``;

export default class Index extends React.Component {
  state = {
    user: null,
    delay: 3000,
    containerHeight: 0
  };

  componentWillMount() {
    if (!sessionStorage.getItem("token")) {
      this.props.history.replace("/");
    }
  }

  componentDidMount() {
    footerResizer();
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
  };

  showToastMessage = message => {
    window.Materialize.toast(message, this.state.delay);
  };

  reloadPage = (delayIncrement = 300) => {
    setTimeout(() => {
      window.location.reload();
    }, this.state.delay + delayIncrement);
  };
  onUserUpdateSuccess = () => {
    this.showToastMessage("User updated successfully, reloading");
    this.reloadPage();
  };

  onUserUpdateError = () => {
    this.showToastMessage("Failed to update user, try again");
  };

  onUserCreationSuccess = () => {
    this.showToastMessage("User created successfully, reloading");
    this.reloadPage();
  };

  onUserCreationError = () => {
    this.showToastMessage("Failed to create user, try again");
  };

  render() {
    return (
      <Container style={{ minHeight: this.state.containerHeight }}>
        <div className="flex flex-wrap pt-16">
          <div className="w-full sm:w-full md:w-full lg:w-full xl:w-full px-2 mb-4">
            <h4>
              <Icon>people</Icon> USER MANAGEMENT
              <CreateUser
                onUserCreationSuccess={this.onUserCreationSuccess}
                onUserCreationError={this.onUserCreationError}
                title="Create new administrator user"
              />
            </h4>
          </div>
          <div className="w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/3 px-2">
            <UserList onUserSelected={this.onUserSelected} />
          </div>
          <div className="w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 px-2">
            <ViewUser
              user={this.state.user}
              onUserArchived={this.onUserArchived}
              onUserUpdateSuccess={this.onUserUpdateSuccess}
              onUserUpdateError={this.onUserUpdateError}
            />
          </div>
        </div>
      </Container>
    );
  }
}
