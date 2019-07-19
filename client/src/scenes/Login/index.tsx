import React, { Component } from "react";
import {
  userLogin,
  fetchUserDetails,
  setActivePage
} from "../../services/redux/actions/users";
import Login from "./Login";
import { connect } from "react-redux";

export class index extends Component<Props> {
  state = {
    error: ""
  };
  attemptLogin = async (values: { username: string; password: string }) => {
    this.setState({ error: "" });
    const log = await this.props.userLogin(values).catch((error: any) => {
      return false;
    });
    if (!log) {
      this.setState({ error: "Invalid username or password" });
      return;
    }

    await this.props.fetchUserDetails(
      this.props.auth.authDetails.userId,
      this.props.auth.authDetails.id
    );

    await this.persistUserDetails(this.props.auth.authDetails.id);

    this.props.history.push("/");
    this.props.setActivePage("home");
  };

  persistUserDetails = async (tokenId: string) => {
    await sessionStorage.setItem("token", tokenId);
    await sessionStorage.setItem(
      "user",
      JSON.stringify(this.props.auth.details)
    );
  };

  render() {
    return <Login onSubmit={this.attemptLogin} error={this.state.error} />;
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
)(index);
