import React from 'react';
import { Modal, Row, Input, Col, Button, Icon } from 'react-materialize';
import { Formik } from 'formik';
import { postFormData } from '../actions';
import { connect } from 'react-redux';
import yup from 'yup';
import '../App.css';

class UserForm extends React.Component {

  getUser = () => {
    return this.props.user;
  }

  initialValues = {
    firstname: this.getUser() ? this.getUser().firstname : "",
    lastname: this.getUser() ? this.getUser().lastname : "",
    username: this.getUser() ? this.getUser().username : "",
    email: this.getUser() ? this.getUser().email : "",
  }

  passwordValidationMessage = 'Weak password, The password must be a combination of numbers, letters, and special characters'

  schema = yup.object().shape({
    firstname: yup.string().min(6).required("First name is required"),
    lastname: yup.string().min(6).required("last name is required"),
    username: yup.string().min(8).required("username is required"),
    email: yup.string().email("enter a valid email address").required("email is required"),

    password: yup.string()
      .min(8, "atleast 8 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm, this.passwordValidationMessage)
      .required("password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null])
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm, this.passwordValidationMessage)
      .required('Password confirm is required')
  })

  _handleChange = async (values, { setSubmitting, setErros }) => {
    await this.props.postFormData(
      { data: values },
      "Clients",
      "POST",
      "POST_USER",
      "createAdmin",
    );
    this.props.userCreated ?
      this.props.onUserCreationSuccess() :
      this.props.onUserCreationError();
  }

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
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
              header={this.props.title}
              trigger={<Button floating large waves='light' className="blue mfl-fl-right" icon="add" />}
              actions={
                <div class="">
                  <Button modal="close" flat waves="light">cancel</Button>
                  <Button
                    waves="light"
                    className="blue darken-2"
                    onClick={handleSubmit}>
                     Save User
                    </Button>
                </div>
              }
              modalOptions={
                {
                  dismissible: false
                }
              }
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
    userCreated: state.users.userCreated,
    userUpdated: state.users.userUpdated
  }
}

const mapDispatchToProps = {
  postFormData
}
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
