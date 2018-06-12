import React from 'react';
import { Modal, Row, Input, Col, Button, Icon } from 'react-materialize';
import { Formik } from 'formik';
import { postFormData } from '../actions';
import { connect } from 'react-redux';
import yup from 'yup';
import '../App.css';

class EditUserModal extends React.Component {
    state = {
        user: this.props.user
    }
    
    initialValues = {
        firstname:  this.state.user.firstname,
        lastname: this.state.user.lastname,
        username: this.state.user.username,
        email: this.state.user.email,
    }

    reloadPage = () => {
        window.location.reload();
    }

    schema = yup.object().shape({
        firstname: yup.string().min(6).required(),
        lastname: yup.string().min(6).required(),
        username: yup.string().min(8).required(),
        email: yup.string().email().required(),
    })

    updateExistingUser = async (values, userId) => {
        
    }

    _handleChange = async (values, { setSubmitting, setErros }) => {
        await this.props.postFormData(
            values,
            "Clients",
            "PATCH",
            "UPDATE_USER",
            `${this.props.user.id}`,
        );
        this.props.userUpdated ? 
            this.props.onUserUpdateSuccess() : 
            this.props.onUserUpdateError();
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
                    isSubmitting
                }) => (
                        <Modal
                            header="Edit administrator user"
                            trigger={<Button waves='light' className="btn-flat">edit</Button>}
                            actions={
                                <div class="">
                                    <Button 
                                        modal="close" 
                                        flat waves="light"
                                        onClick={e => this.reloadPage() }
                                        >cancel</Button>
                                    <Button
                                        waves="light"
                                        className="blue darken-2"
                                        onClick={handleSubmit}>
                                       Update User
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
                                    placeholder="Enter User First Name"
                                    labelClassName="mfl-max-width"
                                    value={values.firstname}
                                    onChange={handleChange}
                                    error={errors.firstname}
                                    name="firstname"
                                />
                                <Input
                                    s={6}
                                    placeholder="Enter User Last Name"
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
                                    labelClassName="mfl-max-width"
                                    value={values.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                    name="username"
                                />
                                <Input
                                    s={6}
                                    placeholder="Enter Email"
                                    labelClassName="mfl-max-width"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    name="email"
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
    }
}

const mapDispatchToProps = {
    postFormData
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);
