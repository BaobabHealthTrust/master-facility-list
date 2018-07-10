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

  schema = yup.object().shape({
    firstname: yup.string().min(6).required("First name is required"),
    lastname: yup.string().min(6).required("last name is required"),
    username: yup.string().min(8).required("username is required"),
    email: yup.string().email("enter a valid email address").required("email is required"),
    password: yup.string().min(5, "atleast 5 characters long").required("password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null])
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
              {/* TODO: mark required fields with asterisks */}
                <Input
                  s={6}
                  placeholder="Enter User First Name"
                  labelClassName="mfl-max-width"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstname && errors.firstname}
                  name="firstname"
                />
                <Input
                  s={6}
                  placeholder="Enter User Last Name"
                  labelClassName="mfl-max-width"
                  value={values.lastname}
                  onChange={handleChange}
                  error="bddbbd d   d"
                  // error={errors.lastname}
                  onBlur={handleBlur}
                  error={touched.lastname && errors.lastname}
                  name="lastname"
                />
              </Row>
              <Row>
                <Input
                  s={6}
                  placeholder="Enter Username"
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
                  placeholder="Enter Email"
                  labelClassName="mfl-max-width"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  name="email"
                />
              </Row>
              <Row>
                <Input
                  s={6}
                  placeholder="Enter Password"
                  labelClassName="mfl-max-width"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  onBlur={handleBlur} 
                  error={touched.password && errors.password} 
                  name="password"
                  type="password"
                />
                <Input
                  s={6}
                  placeholder="Confirm Password"
                  labelClassName="mfl-max-width"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                  name="confirmPassword"
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
