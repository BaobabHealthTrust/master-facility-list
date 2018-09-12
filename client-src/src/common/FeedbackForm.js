import React from 'react';
import { Row, Input, Card, Button, Col } from 'react-materialize';
import '../App.css';
import { connect } from 'react-redux';
import { fetchFeedbackTypes, postFormData } from '../actions';
import yup from 'yup';
import { Formik } from 'formik';
import { Z_DEFAULT_STRATEGY } from 'zlib';

class FeedbackForm extends React.Component{

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

    schema = yup.object().shape({
        name: yup.min(3).string(),
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
            { data:
                {   ...values,
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
            <React.Fragment>
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
                        setFieldValue
                    }) => (
                            <Card className="mfl-tm-2">
                                <h5>Feedback Form</h5>
                                <Row>
                                    <Input
                                        s={6}
                                        placeholder="Enter name"
                                        labelClassName="mfl-max-width"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                        name="name"
                                    />
                                    <Input
                                        s={6}
                                        placeholder="Enter email"
                                        labelClassName="mfl-max-width"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        name="email"
                                        type="email"
                                    />
                                    {errors.name}
                                    <Input
                                        s={12}
                                        type='select'
                                        name="feedbackType"
                                        placeholder="Please select feedback type"
                                        value={values.feedbackType}
                                        onChange={(e) => setFieldValue('feedbackType', e.target.value)}
                                        error={errors.feedbackType}
                                    >
                                        {this.props.feedbackTypes.map(feedbackType => (
                                            <option
                                                key={feedbackType.id}
                                                value={feedbackType.id}
                                            >
                                                {feedbackType.feedback_type}
                                            </option>
                                        ))}
                                    </Input>

                                    <Input
                                        s={12}
                                        placeholder="Message"
                                        labelClassName="mfl-max-width"
                                        value={values.message}
                                        onChange={handleChange}
                                        error={errors.message}
                                        name="message"
                                        type="textarea"
                                     />

                                </Row>
                                <Row>
                                    <Col>
                                        <Button className="blue" waves='light' onClick={handleSubmit}>
                                            {isSubmitting ? 'sending...' : 'send feedback'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        )}
                />

            </React.Fragment>
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
