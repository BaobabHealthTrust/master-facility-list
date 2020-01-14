import React, { Component } from "react";
import {
  userLogin,
  fetchUserDetails,
  setActivePage
} from "../../services/redux/actions/users";
import { connect } from "react-redux";
import LoginContainer from "./Login.container";

export class LoginRedux extends Component<Props> {
  render() {
    return <LoginContainer {...(this.props as any)} />;
  }
}

type Props = {
  userLogin: Function;
  fetchUserDetails: Function;
  setActivePage: Function;
  auth: any;
  history: any;
};

const mapStateToProps = (state: any) => ({ auth: state.users.currentUser });

export default connect(
  mapStateToProps,
  { userLogin, fetchUserDetails, setActivePage }
)(LoginRedux);
