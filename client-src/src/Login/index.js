//@flow
import React, {Component, SyntheticEvent} from "react";
import Card from "../common/MflCard";
import {Alert} from "../common";
import footerResizer from "../helpers/footerResize";
import {Redirect} from "react-router-dom";
import {checkCredentials, getUserDetails} from "../actions";
import {connect} from "react-redux";
import styled from "styled-components";
import {Icon} from "react-materialize";

type State = {
  username: string,
  password: string
};

type Props = {
  checkCredentials: Function,
  getUserDetails: Function
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

class MflLogin extends Component<State, Props> {
  state = {
    username: "",
    password: ""
  };

  attemptLogin = async () => {
    const {username, password} = this.state;
    await this.props.checkCredentials(username, password);

    const isLoginSuccess = await !this.props.loginResponse.isLoginFailed;

    const tokenId = this.props.loginResponse.loginResponse.id;
    const userId = this.props.loginResponse.loginResponse.userId;

    if (isLoginSuccess) {
      await this.props.getUserDetails(userId, tokenId);
      await sessionStorage.setItem("token", tokenId);
      await sessionStorage.setItem(
        "firstname",
        this.props.loginResponse.userDetails.firstname
      );
    }
  };

  handlePasswordInput = e => {
    if (e.which === 13) this.attemptLogin();
    this.setState({password: e.currentTarget.value});
  };

  render() {
    if (sessionStorage.getItem("token")) {
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
          <a onClick={this.attemptLogin} className="btn-large blue accent-1">
            Login
          </a>
        </LoginContainer>
      </MFLContainer>
    );
  }

  _changeInputField = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.which === 13) this.attemptLogin();
    this.setState({[event.currentTarget.name]: event.currentTarget.value});
  };

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
}

const mapStateToProps = state => {
  return {loginResponse: state.authReducer};
};

export default connect(
  mapStateToProps,
  {checkCredentials, getUserDetails}
)(MflLogin);
