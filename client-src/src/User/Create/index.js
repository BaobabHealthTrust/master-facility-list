import React, { Component } from "react";
import { Modal, Row, Input, Col, Button, Icon } from "react-materialize";
import { Formik } from "formik";
import { postFormData, fetchUsers } from "../../actions";
import { connect } from "react-redux";
import yup from "yup";
import "../../App.css";
import { Toast } from "../../common";

export class CreateUser extends Component {
  state = {
    success: true,
    buttonElement: null
  };

  initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  passwordValidationMessage =
    "Weak password, The password must be a combination of numbers, letters , and special characters";

  schema = yup.object().shape({
    firstname: yup
      .string()
      .min(3)
      .required("First name is required"),
    lastname: yup
      .string()
      .min(3)
      .required("last name is required"),
    username: yup
      .string()
      .min(6)
      .required("username is required"),
    email: yup
      .string()
      .email("enter a valid email address")
      .required("email is required"),

    password: yup
      .string()
      .min(8, "atleast 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
        this.passwordValidationMessage
      )
      .required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
        this.passwordValidationMessage
      )
      .required("Password confirm is required")
  });

  _handleSubmit = async (values, actions) => {
    const {
      postFormData,
      userCreated,
      fetchUsers,
      validationErrors
    } = this.props;

    const addUser = await postFormData(
      { data: values },
      "Clients",
      "POST",
      "POST_USER",
      "createAdmin"
    );

    actions.setSubmitting(false);

    if (addUser.payload && addUser.payload.data) {
      Toast("User Created Successfully");
      actions.resetForm();
      document.getElementById("closeButton").click();
      fetchUsers();
      return;
    }

    let errors = addUser.error
      ? addUser.payload
        ? addUser.payload.response.data.error.details.messages
        : ["There was a general error"]
      : [];
    actions.setErrors({
      username: errors.username ? errors.username : "",
      email: errors.email ? errors.email : ""
    });

    Toast("Failed To Create User");
  };

  _renderModalActions = (handleSubmit, isSubmitting) => (
    <div>
      <Button
        id="closeButton"
        disabled={isSubmitting}
        modal="close"
        flat
        waves="light"
      >
        cancel
      </Button>
      <Button
        disabled={isSubmitting}
        waves="light"
        className="blue darken-2"
        onClick={handleSubmit}
      >
        Save User
      </Button>
    </div>
  );

  _renderForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur
  }) => (
    <Modal
      trigger={this.props.trigger()}
      header="Add Admin User"
      actions={this._renderModalActions(handleSubmit, isSubmitting)}
      modalOptions={{
        dismissible: false
      }}
    >
      <Row>
        {/* TODO: mark required fields with asterisks */}

        <Input
          s={6}
          label="Enter First Name"
          labelClassName="mfl-max-width"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstname ? errors.firstname : ""}
          name="firstname"
        />

        <Input
          s={6}
          label="Enter Last Name"
          labelClassName="mfl-max-width"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastname && errors.lastname}
          name="lastname"
        />
      </Row>
      <Row>
        <Input
          s={6}
          label="Enter Username"
          labelClassName="mfl-max-width"
          value={values.username}
          onChange={handleChange}
          error={errors.username}
          onBlur={handleBlur}
          error={touched.username && errors.username}
          name="username"
        />
        <Input
          s={6}
          label="Enter Email"
          labelClassName="mfl-max-width"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          name="email"
        />
      </Row>
      <Row>
        <Input
          s={6}
          label="Enter Password"
          labelClassName="mfl-max-width"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password}
          name="password"
          type="password"
        />
        <Input
          s={6}
          label="Confirm Password"
          labelClassName="mfl-max-width"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && errors.confirmPassword}
          name="confirmPassword"
          type="password"
        />
      </Row>
    </Modal>
  );
  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.schema}
        onSubmit={this._handleSubmit}
        render={this._renderForm}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userCreated: state.users.userCreated,
    validationErrors: state.users.validationErrors
  };
};

const mapDispatchToProps = {
  postFormData,
  fetchUsers
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
