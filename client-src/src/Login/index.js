//@flow
import React, {Component, SyntheticEvent} from "react";
import Card from "../common/MflCard";
import {Alert} from "../common";
import footerResizer from "../helpers/footerResize";
import {Redirect} from "react-router-dom";
import {checkCredentials, getUserDetails, setUserDetails} from "../actions";
import {connect} from "react-redux";
import styled from "styled-components";
import {Icon} from "react-materialize";

type State = {
  username: string,
  password: string
};

type Props = {
  checkCredentials: Function,
  getUserDetails: Function,
  setUserDetails: Function
};

const MFLContainer = styled.div.attrs({className: "container mfl-container"})``;
const LoginTitle = styled.h4.attrs({className: "white-text"})``;
const LoginContainer = styled.div.attrs({
  className: "mfl-login-container blue darken-4"
})``;
const LoginInputContainer = styled.div.attrs({
  className: "mfl-login-input-container"
})``;
const LoginIconContainer = styled.div.attrs({
  className: "mfl-login-icon grey lighten-2 grey-text"
})``;
const LoginInput = styled.input.attrs({className: "mfl-login-input"})``;
const LoginButton = styled.button.attrs({
  className: "btn-large blue accent-1"
})``;

class MflLogin extends Component<Props, State> {
  state = {
    username: "",
    password: ""
  };

  _attemptLogin = async () => {
    const {username, password} = this.state;
    await this.props.checkCredentials(username, password);

    const isLoginSuccess = await !this.props.loginResponse.isLoginFailed;

    const tokenId = this.props.loginResponse.loginResponse.id;
    const userId = this.props.loginResponse.loginResponse.userId;

    if (isLoginSuccess) {
      await this.props.getUserDetails(userId, tokenId);
      const firstname = this.props.loginResponse.userDetails.firstname;
      await this._persistLoginDetails(userId, tokenId, firstname);
      this.props.setUserDetails(tokenId, firstname);
    }
  };

  _changeInputField = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.which === 13) this._attemptLogin();
    this.setState({[event.currentTarget.name]: event.currentTarget.value});
  };

  async _persistLoginDetails(
    userId: string,
    tokenId: string,
    firstname: string
  ) {
    await sessionStorage.setItem("token", tokenId);
    await sessionStorage.setItem("firstname", firstname);
  }

  _isLoggedIn() {
    const {userDetails} = this.props;
    return (userDetails && userDetails.token) || false;
  }

  _renderInputField(
    icon: string,
    inputType: string,
    inputName: string,
    placeholder: string
  ) {
    return (
      <LoginInputContainer>
        <LoginIconContainer>
          <Icon>{icon}</Icon>
        </LoginIconContainer>
        <LoginInput
          onKeyUp={this._changeInputField}
          type={inputType}
          name={inputName}
          placeholder={placeholder}
        />
      </LoginInputContainer>
    );
  }

  _renderAlert(message: string) {
    return <Alert warning message={message} />;
  }

  render() {
    if (this._isLoggedIn()) {
      return <Redirect to="/" />;
    }
    const isLoginFailed = this.props.loginResponse.isLoginFailed;
    const loginFailedMessage =
      "Looks like there is something wrong with your credentials. Try again";
    return (
      <MFLContainer>
        <LoginContainer>
          <LoginTitle>Login Here</LoginTitle>
          {isLoginFailed && this._renderAlert(loginFailedMessage)}
          <div className="mfl-tm-5" />
          {this._renderInputField(
            "perm_identity",
            "text",
            "username",
            "Enter Username"
          )}
          <div className="mfl-tm-2" />
          {this._renderInputField(
            "lock",
            "password",
            "password",
            "Enter Password"
          )}
          <div className="mfl-tm-5" />
          <LoginButton onClick={this._attemptLogin}>Login</LoginButton>
        </LoginContainer>
      </MFLContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginResponse: state.authReducer,
    userDetails: state.users.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  {checkCredentials, getUserDetails, setUserDetails}
)(MflLogin);
