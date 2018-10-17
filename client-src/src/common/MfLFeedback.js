import React, { Component } from "react";
import Card from "../common/MflCard";
import banner from "../banner.png";
import footerResizer from "../helpers/footerResize";
import { FeedbackForm } from "./index";
import { Banner } from "../common";
import styled from "styled-components";

const Heading = styled.div.attrs({
  className: "text-3xl text-blue font-bold mb-8"
})``;
const TopMargin = styled.div`
  margin: 40px 0px;
`;
class MflFeedback extends Component {
  // TODO: show loading state upon sending user feedback
  componentDidMount() {
    footerResizer();
  }
  render() {
    return <div>
        <Banner title="Get in Touch With Us" />
        <TopMargin />
        <div className="container mfl-modal-container">
          <div className="row">
            <div className="col m8 s12">
              <Heading>Feedback Form</Heading>
              <FeedbackForm />
            </div>
            <div className="col m4 s12">
              <Heading>Useful Links</Heading>
              <ul className="mfl-abm">
                <li className="black-text text-lighten-2">
                  <span className="mfl-about-icon">
                    <i className="material-icons">file_download</i>
                  </span>
                  <a className="mfl-about-text" href="http://www.health.gov.mw/" target="_blank">
                    Download guidelines
                  </a>
                </li>
                <li className="black-text text-lighten-2">
                  <span className="mfl-about-icon">
                    <i className="material-icons">insert_link</i>
                  </span>
                  <a className="mfl-about-text" href="http://www.health.gov.mw/" target="_blank">
                    About Ministry of Health
                  </a>
                </li>
              </ul>
              <TopMargin />
              <Heading>Instructions</Heading>
              <div className="mfl-feedback">
                <p className="text-xl text-grey-darker">
                  Please give us your feedback on the experience you have
                  using this system. We will be glad to assist with any
                  problems you may be having. Comments and recommendations
                  for future improvements are also welcome
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default MflFeedback;
