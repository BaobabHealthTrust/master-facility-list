import React, { Component, Fragment } from "react";
import footerResizer from "../helpers/footerResize";
import { FeedbackForm } from "./components";
import { Banner } from "../common";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: "container mfl-modal-container"
})``;

const Heading = styled.div.attrs({
  className: "text-3xl text-blue font-bold mb-8"
})``;

const TopMargin = styled.div`
  margin: 40px 0px;
`;

const Row = styled.div.attrs({
  className: "row"
})``;

const MainContainer = styled.div.attrs({
  className: "col m8 s12"
})`
  @media (min-width: 620px) {
    padding-right: 60px !important;
  }
`;

const AsideContainer = styled.div.attrs({
  className: "col m4 s12"
})``;

class MflFeedback extends Component {
  // TODO: show loading state upon sending user feedback
  _renderLinks = () => (
    <ul className="mfl-abm">
      <li className="text-lighten-2 mfl-useful-links-container">
        <span className="mfl-about-icon">
          <i className="material-icons">file_download</i>
        </span>
        <a
          className="mfl-about-text"
          href="http://www.health.gov.mw/"
          target="_blank"
        >
          Download guidelines
        </a>
      </li>
      <li className="text-lighten-2 mfl-useful-links-container">
        <span className="mfl-about-icon">
          <i className="material-icons">insert_link</i>
        </span>
        <a
          className="mfl-about-text"
          href="http://www.health.gov.mw/"
          target="_blank"
        >
          About Ministry of Health
        </a>
      </li>
    </ul>
  );

  _renderInstructions = () => (
    <div className="mfl-feedback">
      <p className="text-xl text-grey-darker">
        Please give us your feedback on the experience you have using this
        system. We will be glad to assist with any problems you may be having.
        Comments and recommendations for future improvements are also welcome
      </p>
    </div>
  );

  render() {
    return (
      <Fragment>
        <Banner title="Get in Touch With Us" />
        <TopMargin />
        <Container>
          <Row>
            <MainContainer>
              <Heading>Feedback Form</Heading>
              <FeedbackForm />
            </MainContainer>
            <AsideContainer>
              <Heading>Instructions</Heading>
              {this._renderInstructions()}
              <Heading>Useful Links</Heading>
              {this._renderLinks()}
              <TopMargin />
            </AsideContainer>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default MflFeedback;
