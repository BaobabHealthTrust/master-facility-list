import React, { Component } from "react";
import { requestPasswordReset } from "../../../services/redux/actions/users";
import ForgotPassword from "./ForgotPassword";
import { connect } from "react-redux";

export class ForgotPasswordContainer extends Component<Props> {
  render() {
    return <ForgotPassword {...this.props}></ForgotPassword>;
  }
}

type Props = {
  history: any;
  requestPasswordReset: Function;
};
const mapStateToProps = (state: any) => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { requestPasswordReset }
)(ForgotPasswordContainer);
