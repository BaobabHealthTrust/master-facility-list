import React from "react";
import { Modal, Row, Input, Col, Button, Icon } from "react-materialize";
import { Formik } from "formik";
import { postFormData, fetchUsers, getUserDetails } from "../../actions";
import { connect } from "react-redux";
import yup from "yup";
import { Toast } from "../../common";
import "../../App.css";

class Index extends React.Component {
  initialValues = {
    firstname: this.props.user.firstname,
    lastname: this.props.user.lastname,
    username: this.props.user.username,
    email: this.props.user.email
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.user !== this.props.user) {
      this.initialValues = {
        firstname: nextProp.user.firstname,
        lastname: nextProp.user.lastname,
        username: nextProp.user.username,
        email: nextProp.user.email
      };
    }
  }

  schema = yup.object().shape({
    firstname: yup
      .string()
      .min(3)
      .required(),
    lastname: yup
      .string()
      .min(3)
      .required(),
    username: yup
      .string()
      .min(8)
      .required(),
    email: yup
      .string()
      .email()
      .required()
  });

  _handleSubmit = async (values, actions) => {
    const {
      postFormData,
      user,
      userUpdated,
      fetchUsers,
      onUserUpdated
    } = this.props;

    const updateUser = await postFormData(
      values,
      "Clients",
      "PATCH",
      "UPDATE_USER",
      `${user.id}`
    );

    if (updateUser.payload && updateUser.payload.data) {
      actions.resetForm();
      document.getElementById("closeUpdateModalBtn").click();
      fetchUsers();
      onUserUpdated();
    } else {
      let errors = updateUser.error
        ? updateUser.payload
          ? updateUser.payload.response.data.error.details.messages
          : ["There was a general error"]
        : [];
      actions.setErrors({
        username: errors.username ? errors.username : "",
        email: errors.email ? errors.email : ""
      });
      Toast("Failed To Update User");
    }
    actions.setSubmitting(false);
  };

  _renderModalActions = (handleSubmit, isSubmitting) => (
    <div>
      <Button
        id="closeUpdateModalBtn"
        modal="close"
        flat
        waves="light"
        disabled={isSubmitting}
      >
        cancel
      </Button>
      <Button
        disabled={isSubmitting}
        waves="light"
        className="blue darken-2"
        onClick={handleSubmit}
      >
        Update User
      </Button>
    </div>
  );

  _renderUpdateForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur
  }) => (
    <Modal
      header="Edit Administrator User"
      trigger={
        <Button test-id="updateUserBtn" waves="light" className="blue darken-2">
          Update User
        </Button>
      }
      actions={this._renderModalActions(handleSubmit, isSubmitting)}
      modalOptions={{
        dismissible: false
      }}
    >
      <Row>
        <Input
          s={6}
          value={values.firstname}
          name="firstname"
          labelClassName="mfl-max-width"
          label="Enter your firstname"
          error={touched.firstname && errors.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          s={6}
          value={values.lastname}
          name="lastname"
          labelClassName="mfl-max-width"
          label="Enter your lastname"
          error={touched.lastname && errors.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Row>
      <Row>
        <Input
          s={6}
          value={values.username}
          name="username"
          labelClassName="mfl-max-width"
          label="Enter your username"
          error={touched.username && errors.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          s={6}
          value={values.email}
          name="email"
          labelClassName="mfl-max-width"
          label="Enter your email"
          error={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Row>
    </Modal>
  );

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.initialValues}
        validate={this.validate}
        validationSchema={this.schema}
        onSubmit={this._handleSubmit}
        render={this._renderUpdateForm}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    userUpdated: state.users.userUpdated
  };
};

const mapDispatchToProps = {
  postFormData,
  fetchUsers,
  getUserDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
