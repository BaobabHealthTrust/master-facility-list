import React from 'react';
import { Modal, Row, Input, Col, Button, Icon } from 'react-materialize';
import { Formik } from 'formik';
import { postFormData } from '../actions';
import { connect } from 'react-redux';
import yup from 'yup';
import '../App.css';

class UserForm extends React.Component {

    initialValues = {
        firstname: "",
        lastname: "",
        username: "",
        email: ""
    }

    schema = yup.object().shape({
        firstname: yup.string().min(6).required(),
        lastname: yup.string().min(6).required(),
        username: yup.string().min(8).required(),
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null])
            .required('Password confirm is required')
    })

    _handleChange = async (values, { setSubmitting, setErros }) => {
        console.log(values);
        await this.props.postFormData(
            { data: values},
            "Clients",
            "createAdmin",
            "POST",
            "POST_USER"
        );
        this.props.userCreated ? this.props.onUserCreationSuccess() : this.props.onUserCreationError();
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
                    }) => (
                        <Modal
                            header='Create New User'
                            dude={"dude"}
                            trigger={<Button floating large waves='light' className="blue mfl-fl-right" icon="add"/>}
                            actions={
                                <div class="">
                                    <Button modal="close" flat waves="light" className="">cancel</Button>
                                    <Button waves="light" className="blue darken-2" onClick={handleSubmit}>save user</Button>
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
                                        placeholder="Enter User First Name"
                                        label="Enter User First Name"
                                        labelClassName="mfl-max-width"
                                        value={values.firstname}
                                        onChange={handleChange}
                                        error={errors.firstname}
                                        name="firstname"
                                    />
                                    <Input
                                        s={6}
                                        placeholder="Enter User Last Name"
                                        label="Enter User Last Name"
                                        labelClassName="mfl-max-width"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        error={errors.lastname}
                                        name="lastname"
                                    />
                                </Row>
                                <Row>
                                    <Input
                                        s={6}
                                        placeholder="Enter Username"
                                        label="Enter Username"
                                        labelClassName="mfl-max-width"
                                        value={values.username}
                                        onChange={handleChange}
                                        error={errors.username}
                                        name="username"
                                    />
                                    <Input
                                        s={6}
                                        placeholder="Enter Email"
                                        label="Enter Email"
                                        labelClassName="mfl-max-width"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        name="email"
                                    />
                                </Row>
                                <Row>
                                    <Input
                                        s={6}
                                        placeholder="Enter Password"
                                        label="Enter Password"
                                        labelClassName="mfl-max-width"
                                        value={values.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        name="password"
                                        type="password"
                                    />
                                    <Input
                                        s={6}
                                        placeholder="Confirm Password"
                                        label="Confirm Password"
                                        labelClassName="mfl-max-width"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
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
        userCreated: state.users.userCreated
    }
}

const mapDispatchToProps = {
    postFormData
}
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);