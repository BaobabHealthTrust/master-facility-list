import React from 'react';
import { Modal, Row, Input, Col, Button, Icon } from 'react-materialize';
import { Formik } from 'formik';
import { postFormData, fetchUserAccessTokens } from '../actions';
import { connect } from 'react-redux';
import yup from 'yup';
import '../App.css';

class ChangePasswordForm extends React.Component {

    state = {
        delay: 3000
    }
    
    passwordValidationMessage = 'Weak password, The password must be a combination of numbers, letters, and special characters'

    schema = yup.object().shape({
        password: yup.string()
            .min(5)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm, this.passwordValidationMessage)
            .required(),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null])
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm, this.passwordValidationMessage)
            .required('Password confirm is required')
    })

    showToastMessage = message => {
        window.Materialize.toast(message, this.state.delay);
    }

    onPasswordChanged = async () => {
        this.showToastMessage('Password changed successfully, reloading');
        await this.props.fetchUserAccessTokens(this.props.user.id);
        const accessToken = await sessionStorage.getItem('token');
        const isCurrentUser = this.props.userAccessTokens
            .map(accessToken => accessToken.id)
            .includes(accessToken);
        if(isCurrentUser) {
            await sessionStorage.removeItem('token');
        }
        setTimeout(() => {
            // TODO: workout logic to send the user to the login page
            window.location.reload();
        }, this.state.delay + 300);
    
    }

    onPasswordChangeError = () => {
        this.showToastMessage('Password changing failed, try again');
    }

    _handleChange = async (values, { setSubmitting, setErros }) => {
        await this.props.postFormData(
            values, 
            'Clients', 
            'PATCH', 
            'CHANGE_USER_PASSWORD',
            this.props.user.id
        );
        this.props.passwordChanged ? 
            this.onPasswordChanged() : 
            this.onPasswordChangeError();
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
                            header="Change Password"
                            trigger={<Button waves='light' className="btn-flat">change password</Button>}
                            actions={
                                <div class="">
                                    <Button modal="close" flat waves="light">cancel</Button>
                                    <Button
                                        waves="light"
                                        className="blue darken-2"
                                        onClick={handleSubmit}>
                                        Save Password
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
    }
}

const mapDispatchToProps = {
    postFormData,
    fetchUserAccessTokens
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);