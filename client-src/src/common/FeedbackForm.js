import React from 'react';
import { Row, Input, Card, Button, Col } from 'react-materialize';
import '../App.css';
import { connect } from 'react-redux';
import { fetchFeedbackTypes, postFormData } from '../actions';
import yup from 'yup';
import { Formik } from 'formik';
import { Z_DEFAULT_STRATEGY } from 'zlib';
import { kids, baobab, lighthouse, lin, moh } from '../images'

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

    handleSubmit = async (values, {resetForm, setSubmitting}) => {
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
            setSubmitting(false)
            this.notifyFeedbackSent();
            resetForm(this.initialValues);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="mfl-tm-2" />
                <Formik
                    initialValues={this.initalValues}
                    validationSchema={this.schema}
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
                            <Card>
                                <div>
                                    <Row>
                                        <Input
                                            s={12}
                                            value={values.name}
                                            name="name"
                                            labelClassName="mfl-max-width"
                                            label="Enter your name"
                                            error={touched.name && errors.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Input
                                            s={12}
                                            value={values.email}
                                            name="email"
                                            labelClassName="mfl-max-width"
                                            label="Enter your email address *"
                                            error={touched.email && errors.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="email"
                                        />
                                        <Input
                                            s={12}
                                            type='select'
                                            name="feedbackType"
                                            value={values.feedbackType}
                                            onChange={(e) => setFieldValue('feedbackType', e.target.value)}
                                            error={errors.feedbackType}
                                        >
                                            <option value="">Select Feedback Type *</option>
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
                                            value={values.message}
                                            name="message"
                                            labelClassName="mfl-max-width"
                                            label="Enter your messaged here *"
                                            error={touched.message && errors.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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
                                </div>
                            </Card>
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
