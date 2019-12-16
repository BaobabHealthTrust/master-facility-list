import React, { Component } from "react";
import { passwordReset } from "../../../services/redux/actions/users";
import ResetPassword from "./ResetPassword";
import { connect } from "react-redux";

export class ForgotPasswordContainer extends Component<Props> {
  render() {
    return <ResetPassword {...this.props}></ResetPassword>;
  }
}

const mapStateToProps = (state: any) => ({
  errors: state.errors
});

type Props = {
  history: any;
  passwordReset: Function;
};

export default connect(
  mapStateToProps,
  { passwordReset }
)(ForgotPasswordContainer);
