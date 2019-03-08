import React from "react";
import { Modal, Row, Input, Col, Button, Icon } from "react-materialize";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import {
  postFormData,
  fetchUserAccessTokens,
  resetUserDetails
} from "../../actions";
import { connect } from "react-redux";
import yup from "yup";
import { Toast } from "../../common";
import "../../App.css";

class ChangePassword extends React.Component {
  initialValues = {
    password: "",
    confirmPassword: ""
  };
  passwordValidationMessage =
    "Weak password, The password must be a combination of numbers, letters, and special characters";

  schema = yup.object().shape({
    password: yup
      .string()
      .min(5)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
        this.passwordValidationMessage
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do no match")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
        this.passwordValidationMessage
      )
      .required("Password confirm is required")
  });

  onPasswordChanged = async actions => {
    Toast("Password changed successfully");
    await this.props.fetchUserAccessTokens(this.props.user.id);
    const accessToken = await sessionStorage.getItem("token");
    const isCurrentUser = this.props.userAccessTokens
      .map(accessToken => accessToken.id)
      .includes(accessToken);

    actions.resetForm();

    // TODO: workout logic to send the user to the login page
    document.getElementById("closeChangePassBtn").click();

    if (isCurrentUser) {
      await sessionStorage.clear();
      this.props.resetUserDetails();
      this.props.redirect("/login");
    }
  };

  onPasswordChangeError = () => {
    Toast("Password changing failed, try again");
  };

  _handleSubmit = async (values, actions) => {
    await this.props.postFormData(
      values,
      "Clients",
      "PATCH",
      "CHANGE_USER_PASSWORD",
      this.props.user.id
    );
    this.props.passwordChanged
      ? this.onPasswordChanged(actions)
      : this.onPasswordChangeError();
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validate={this.validate}
        validationSchema={this.schema}
        onSubmit={this._handleSubmit}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          handleBlur
        }) => (
          <Modal
            header="Change Password"
            trigger={
              <Button waves="light" className="green darken-2">
                change password
              </Button>
            }
            actions={
              <div class="">
                <Button
                  modal="close"
                  flat
                  waves="light"
                  disabled={isSubmitting}
                  id="closeChangePassBtn"
                >
                  cancel
                </Button>
                <Button
                  waves="light"
                  className="blue darken-2"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Save Password
                </Button>
              </div>
            }
            modalOptions={{
              dismissible: false
            }}
          >
            <Row>
              <Input
                s={6}
                value={values.password}
                name="password"
                labelClassName="mfl-max-width"
                label="Enter password"
                error={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
              <Input
                s={6}
                value={values.confirmPassword}
                name="confirmPassword"
                labelClassName="mfl-max-width"
                label="Confirm your password"
                error={touched.confirmPassword && errors.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
            </Row>
          </Modal>
        )}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    passwordChanged: state.users.passwordChanged,
    userAccessTokens: state.users.userAccessTokens
  };
};

const mapDispatchToProps = {
  postFormData,
  fetchUserAccessTokens,
  resetUserDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
