import React from 'react';
import { Row, Input, Card, Button, Col } from 'react-materialize';
import '../App.css';
import { connect } from 'react-redux';
import { fetchFeedbackTypes, postFormData } from '../actions';
import yup from 'yup';
import { Formik } from 'formik';
import { Z_DEFAULT_STRATEGY } from 'zlib';

class FeedbackForm extends React.Component {

    state = {
        delay: 3000
    }

    componentWillMount() {
        this.props.fetchFeedbackTypes();
    }

    initialValues = {
        name: '',
        message: '',
        email: '',
        feedbackType: ''
    }

    validate = values => {
        let errors = {};
        if (values.name.length < 3) errors.name = "Invalid name"
        if (values.message.length < 3) errors.message = "Invalid message"
        // if (values.commonName.length < 3) errors.commonName = "Invalid Common Name"
        // if (!/^\d+$/i.test(values.registrationNumber))
        //     errors.registrationNumber = "Invalid Registration Number Format"
        // if (values.registrationNumber.length < 8)
        //     errors.registrationNumber = "Invalid Registration Number Length"

        return errors
    }


    schema = yup.object().shape({
        name: yup.string().min(3),
        message: yup.string().min(3).required('this is required'),
        email: yup.string().min(3).email().required("email address is required"),
        feedbackType: yup.number().required()
    })

    showToastMessage = message => {
        window.Materialize.toast(message, this.state.delay);
    }

    notifyFeedbackSent = () => {
        this.showToastMessage('Feedback sent successfully!');
    }

    _handleChange = async (values, { setSubmitting, setErros, resetForm }) => {
        setSubmitting(true)
        await this.props.postFormData(
            {
                data:
                    {
                        ...values,
                        type_id: values.feedbackType
                    }
            },
            'Feedbacks',
            'POST',
            'POST_FEEDBACK',
            'feedback'
        );
        if (this.props.feedbackSubmitted) {
            this.notifyFeedbackSent();
            resetForm();
        }
    }

    render() {
        return (
            <div className="container">
                <div className="mfl-tm-2" />
                <Formik
                    initialValues={this.initalValues}
                    validate={this.validate}
                    onSubmit={this.handleSubmit}
                    render={({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                    }) => (
                            <div>
                                <Row>
                                    <Input
                                        s={12}
                                        value={values.name}
                                        name="name"
                                        labelClassName="mfl-max-width"
                                        placeholder="Enter Facility Name"
                                        label="Enter Facility Name"
                                        error={touched.name && errors.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Input
                                        s={12}
                                        value={values.message}
                                        name="message"
                                        placeholder="Enter Facility Common Name"
                                        labelClassName="mfl-max-width"
                                        label="Enter Facility Common Name"
                                        error={touched.message && errors.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                </Row>
                                
                            </div>
                        )}
                />
            </div >
        );
    }
}

const mapStateToProps = state => ({
    feedbackTypes: state.feedback.feedbackTypes,
    feedbackSubmitted: state.feedback.feedbackSubmitted
})

const mapDispatchToProps = {
    fetchFeedbackTypes,
    postFormData
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);
