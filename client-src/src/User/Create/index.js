import React, { Component } from "react";
import { Modal, Row, Input, Col, Button, Icon } from "react-materialize";
import { Formik } from "formik";
import { postFormData, fetchUsers } from "../../actions";
import { connect } from "react-redux";
import yup from "yup";
import "../../App.css";
import { Toast } from "../../common";
import styled from "styled-components";

const CardTitle = styled.div.attrs({
  className: "mfl-card-title  bg-blue"
})`
  margin: -24px;
  margin-bottom: 24px;
`;
export class CreateUser extends Component {
  state = {
    success: true,
    buttonElement: null
  };

  initialValues = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };

  passwordValidationMessage =
    "Weak password, The password must be a combination of numbers, letters , and special characters";

  schema = yup.object().shape({
    firstname: yup
      .string()
      .typeError("First name is required")
      .min(3)
      .required("First name is required"),
    lastname: yup
      .string()
      .typeError("last name is required")
      .min(3)
      .required("last name is required"),
    username: yup
      .string()
      .typeError("username is required")
      .min(6)
      .required("username is required"),
    email: yup
      .string()
      .typeError("enter a valid email address")
      .email("enter a valid email address")
      .required("email is required"),

    password: yup
      .string()
      .typeError("atleast 8 characters long")
      .min(8, "atleast 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
        this.passwordValidationMessage
      )
      .required("password is required"),
    confirmPassword: yup
      .string()
      .typeError("Passwords do not match")
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gim,
        this.passwordValidationMessage
      )
      .required("Password confirm is required")
  });

  _handleSubmit = (values, actions) => {
    const { postFormData, fetchUsers } = this.props;

    postFormData(
      { data: values },
      "Clients",
      "POST",
      "POST_USER",
      "createAdmin"
    )
      .then(res => {
        if (res.action.payload && res.action.payload.data) {
          Toast("User Created Successfully");
          actions.resetForm();
          document.getElementById("closeButton").click();
          fetchUsers();
        }
      })
      .catch(() => {
        let errors = this.props.errors.postUser;
        actions.setErrors({
          username: errors.username ? errors.username : "",
          email: errors.email ? errors.email : ""
        });
        Toast("Failed To Create User");
      });

    actions.setSubmitting(false);
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
      header={<CardTitle>Add User</CardTitle>}
      actions={this._renderModalActions(handleSubmit, isSubmitting)}
      modalOptions={{
        dismissible: false
      }}
    >
      <Row>
        {/* TODO: mark required fields with asterisks */}

        <Input
          s={6}
          label="First Name"
          placeholder="Enter First Name"
          labelClassName="mfl-max-width"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstname ? errors.firstname : ""}
          name="firstname"
        />

        <Input
          s={6}
          label="Last Name"
          placeholder="Enter Last name"
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
          label="Username"
          placeholder="Enter Username"
          labelClassName="mfl-max-width"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && errors.username}
          name="username"
        />
        <Input
          s={6}
          label="Enter Email"
          labelClassName="mfl-max-width"
          placeholder="example@example.com"
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
          label="Password"
          placeholder="Enter Password"
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
          placeholder="Confirm Password"
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
    errors: state.statusErrors.errors
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
