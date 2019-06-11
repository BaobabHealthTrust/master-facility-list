import React from "react";
import Banner from "../../components/atoms/Banner";
import Container from "../../components/atoms/Container";
import Card from "../../components/atoms/Card";
import { Grid } from "@material-ui/core";
import FeedbackForm from "../../components/organisms/FeedbackForm";
import {
  fetchFeedbackTypes,
  sendFeedback
} from "../../services/redux/actions/feedback";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Notification from "../../components/atoms/Notification";
import Heading from "../../components/atoms/SectionSubHeading";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faQuestionCircle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

function index(props: any) {
  if (props.feedbackTypes.length == 0) {
    props.fetchFeedbackTypes();
  }

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    await props
      .sendFeedback({
        data: {
          ...values,
          type_id: values.feedbackType
        }
      })
      .then(() => {
        toast.info(<Notification message="Feedback Sent!!!" />);
      })
      .catch(() => {
        toast.info(
          <Notification
            error
            message="Failed To send Feedback. Please, Try Again"
          />
        );
      });
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <Banner title="Get in Touch With Us" />
      <Container style={{ paddingTop: "20px" }}>
        <Grid container spacing={40}>
          <Grid item xs={12} sm={12} md={6}>
            <Card bodyStyle={{ padding: "20px" }}>
              <Heading>Feedback Form</Heading>
              <FeedbackForm
                onSubmit={onSubmit}
                feedbackTypes={props.feedbackTypes}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Heading>Instructions</Heading>
            <TextContainer>
              Please give us your feedback on the experience you have using this
              system. We will be glad to assist with any problems you may be
              having. Comments and recommendations for future improvements are
              also welcome.
            </TextContainer>
            <Heading>Useful Links</Heading>
            <TextContainer>
              <div>
                <a href="/">
                  <Icon icon={faDownload} />
                  Download Guides
                </a>
              </div>
              <div>
                <a href="/">
                  <Icon icon={faInfoCircle} />
                  About Ministry of Health
                </a>
              </div>
              <div>
                <a href="/">
                  <Icon icon={faQuestionCircle} />
                  Help
                </a>
              </div>
            </TextContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  feedbackTypes: state.feedback.feedbackTypes
});
export default connect(
  mapStateToProps,
  { fetchFeedbackTypes, sendFeedback }
)(index);

const TextContainer = styled.div`
  color: #484848;
  & a {
    font-weight: bold;
  }
  & div {
    padding: 3px 0px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 24px;
`;
