import React from 'react';
import { Row, Input, Card, Button, Col } from 'react-materialize';
import '../App.css';
import { connect } from 'react-redux';
import { fetchFeedbackTypes, postFormData } from '../actions';
import yup from 'yup';
import { Formik } from 'formik';

class FeedbackForm extends React.Component{

    componentWillMount() {
        this.props.fetchFeedbackTypes();
    }
    
    schema = yup.object().shape({
        name: yup.string(),
        message: yup.string().required(),
        email: yup.string().email(),
        feedbackType: yup.number().required()

    })

    _handleChange = async (values, { setSubmitting, setErros }) => {
        await this.props.postFormData(values, 'Feedbacks', 'POST', 'POST_FEEDBACK');
        // TODO: Notify feedback sent
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
                                    <Input
                                        s={12}
                                        type='select'
                                        name="feedbackType"
                                        placeholder="Please select feedback type"
                                        value={values.feedbackType}
                                        onChange={(e) => setFieldValue('feedbackType', e.target.value)}
                                        error={errors.feedbackType}
                                    >
                                        <option value="">please select a feedback</option>
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
                                    <Col><Button className="blue" waves='light' onClick={handleSubmit}>submit feedback</Button></Col>
                                </Row>
                            </Card>
                        )}
                />
                
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    feedbackTypes: state.feedback.feedbackTypes
})

const mapDispatchToProps = {
    fetchFeedbackTypes,
    postFormData
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);