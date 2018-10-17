import React, { Component } from "react";
import { Card, CardTitle } from "react-materialize";
import footerResizer from "../helpers/footerResize";
import "../App.css";
import styled, { css } from "styled-components";
import { kids, baobab, kuunika, lin, moh } from "../images";
import { Banner } from "../common";

const Heading = styled.div.attrs({
  className: "text-3xl text-blue font-bold mb-8"
})``;
const TopMargin = styled.div`
  margin: 40px 0px;
`;
const CardImage = styled.div`
  width: 100%;
  height: 200px;
  ${props =>
    props.image &&
    css`
      background-image: url(${props.image});
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    `};
`;

class MflAbout extends Component {
  componentDidMount() {
    footerResizer();
  }

  render() {
    return (
      <div>
        <Banner title="About the Master Health Facility Registry of Malawi" />
        <TopMargin />
        <div className="container mfl-modal-container">
          <div className="row">
            <div className="col m8 s12">
              <Heading>Purpose</Heading>
              <div className="text-xl text-grey-darker mfl-purpose">
                <p>
                  The main purpose of the Malawi Health Facility Registry is to
                  provide an easily accessible national online database
                  containing a comprehensive list of health facilities in the
                  country for purposes of facilitating planning for service
                  delivery and performance accountability. The Ministry of
                  Health and Population maintains a comprehensive list of all
                  health facilities in Malawi with a purpose of strengthening
                  health service delivery. The list was previously maintained
                  through a spreadsheet file which made it difficult to update
                  and to access especially by the decision makers.
                </p>
                <p>
                  Additionally, various sections of the Ministry have been
                  maintaining parallel health facility lists making it harder to
                  share and triangulate data across systems. To address these
                  challenges, the Ministry has implemented an online Master
                  Health Facility Registry (MHFR). The MHFR is a web service
                  with a user interface to allow health workers get access to
                  the full list of facilities and view summaries through the
                  dashboard in addition to performing custom queries depending
                  of specific information
                </p>
                <p>
                  As a Web Service the MHFL [BN1] provides an Application
                  Programmable Interface (API) which allows other software
                  systems to directly query the central MHFR and update their
                  own lists. This function is a foundation for the
                  Interoperability of Health Information Systems in Malawi.
                </p>
              </div>
            </div>
            <div className="col m4 s12">
              <Heading>Related Links</Heading>
              <ul className="mfl-abm">
                <li className="black-text text-lighten-2">
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
                <li className="black-text text-lighten-2">
                  <span className="mfl-about-icon">
                    <i className="material-icons">insert_link</i>
                  </span>
                  <a
                    className="mfl-about-text"
                    href="http://www.health.gov.mw/"
                    target="_blank"
                  >
                    About Kuunika
                  </a>
                </li>
                <li className="black-text text-lighten-2">
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
            </div>
          </div>
          <div className="row">
            <div className="col m12">
              <TopMargin />
              <Heading>Implementing Partners</Heading>
              <div className="row">
                <div className="col m3 s12">
                  <Card header={<CardImage image={baobab} />}>
                    <h5>Baobab Health Trust</h5>
                  </Card>
                </div>
                <div className="col m3 s12">
                  <Card header={<CardImage image={lin} />}>
                    <h5>Luke International</h5>
                  </Card>
                </div>
                <div className="col m3 s12">
                  <Card header={<CardImage image={kuunika} />}>
                    <h5>Kuunika</h5>
                  </Card>
                </div>
                <div className="col m3 s12">
                  <Card header={<CardImage image={moh} />}>
                    <h5>Ministry of Health</h5>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MflAbout;
