import React from "react";
import { Modal, Row, Input, Col, Button, Icon } from "react-materialize";
import { Formik } from "formik";
import { postFormData } from "../../actions";
import { connect } from "react-redux";
import yup from "yup";
import "../../App.css";

class Index extends React.Component {
  state = {
    user: this.props.user
  };

  initialValues = {
    firstname: this.state.user.firstname,
    lastname: this.state.user.lastname,
    username: this.state.user.username,
    email: this.state.user.email
  };

  reloadPage = () => {
    window.location.reload();
  };

  schema = yup.object().shape({
    firstname: yup
      .string()
      .min(6)
      .required(),
    lastname: yup
      .string()
      .min(6)
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

  updateExistingUser = async (values, userId) => {};

  _handleChange = async (values, { setSubmitting, setErros }) => {
    await this.props.postFormData(
      values,
      "Clients",
      "PATCH",
      "UPDATE_USER",
      `${this.props.user.id}`
    );
    this.props.userUpdated
      ? this.props.onUserUpdateSuccess()
      : this.props.onUserUpdateError();
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validate={this.validate}
        validationSchema={this.schema}
        onSubmit={this._handleChange}
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
            header="Edit administrator user"
            trigger={
              <Button waves="light" className="btn-flat">
                edit
              </Button>
            }
            actions={
              <div class="">
                <Button
                  modal="close"
                  flat
                  waves="light"
                  onClick={e => this.reloadPage()}
                >
                  cancel
                </Button>
                <Button
                  waves="light"
                  className="blue darken-2"
                  onClick={handleSubmit}
                >
                  Update User
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
        )}
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
  postFormData
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
