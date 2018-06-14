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

    schema = yup.object().shape({
        password: yup.string().min(5).required(),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null])
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
                    isSubmitting
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
                                    s={12}
                                    placeholder="Enter New Password"
                                    labelClassName="mfl-max-width"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    name="password"
                                    type="password"
                                />
                                <Input
                                    s={12}
                                    placeholder="Confirm New Password"
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
        passwordChanged: state.users.passwordChanged,
        userAccessTokens: state.users.userAccessTokens
    }
}

const mapDispatchToProps = {
    postFormData,
    fetchUserAccessTokens
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);