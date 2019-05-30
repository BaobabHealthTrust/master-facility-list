import React, { Component } from "react";
import { CardPanel } from "react-materialize";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import footerResizer from "../helpers/footerResize";
import "../App.css";
import styled, { css } from "styled-components";
import { kids, baobab, kuunika, lin, moh } from "../images";
import { Banner } from ".";

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
  faqs = [
    {
      question: "How do you download Facilities?",
      answer: `The main purpose of the Malawi Health Facility Registry is to
            provide an easily accessible national online database
            containing a comprehensive list of health facilities in the
            country for purposes of facilitating planning for service
            delivery and performance accountability. The Ministry of
            Health and Population maintains a comprehensive list of all
            health facilities in Malawi with a purpose of strengthening
            health service delivery. The list was previously maintained
            through a spreadsheet file which made it difficult to update
            and to access especially by the decision makers.`
    },
    {
      question: "How do you download Facilities?",
      answer: `The main purpose of the Malawi Health Facility Registry is to
            provide an easily accessible national online database
            containing a comprehensive list of health facilities in the
            country for purposes of facilitating planning for service
            delivery and performance accountability. The Ministry of
            Health and Population maintains a comprehensive list of all
            health facilities in Malawi with a purpose of strengthening
            health service delivery. The list was previously maintained
            through a spreadsheet file which made it difficult to update
            and to access especially by the decision makers.`
    },
    {
      question: "How do you download Facilities?",
      answer: `The main purpose of the Malawi Health Facility Registry is to
            provide an easily accessible national online database
            containing a comprehensive list of health facilities in the
            country for purposes of facilitating planning for service
            delivery and performance accountability. The Ministry of
            Health and Population maintains a comprehensive list of all
            health facilities in Malawi with a purpose of strengthening
            health service delivery. The list was previously maintained
            through a spreadsheet file which made it difficult to update
            and to access especially by the decision makers.`
    },
    {
      question: "How do you download Facilities?",
      answer: `The main purpose of the Malawi Health Facility Registry is to
            provide an easily accessible national online database
            containing a comprehensive list of health facilities in the
            country for purposes of facilitating planning for service
            delivery and performance accountability. The Ministry of
            Health and Population maintains a comprehensive list of all
            health facilities in Malawi with a purpose of strengthening
            health service delivery. The list was previously maintained
            through a spreadsheet file which made it difficult to update
            and to access especially by the decision makers.`
    },
    {
      question: "How do you download Facilities?",
      answer: `The main purpose of the Malawi Health Facility Registry is to
            provide an easily accessible national online database
            containing a comprehensive list of health facilities in the
            country for purposes of facilitating planning for service
            delivery and performance accountability. The Ministry of
            Health and Population maintains a comprehensive list of all
            health facilities in Malawi with a purpose of strengthening
            health service delivery. The list was previously maintained
            through a spreadsheet file which made it difficult to update
            and to access especially by the decision makers.`
    }
  ];
  componentDidMount() {
    footerResizer();
  }

  render() {
    return (
      <div>
        <Banner title="Let Us Help You" />
        <TopMargin />
        <div className="container mfl-modal-container">
          <div className="row">
            <div className="col m7 s12">
              <div className="px-5">
                <Heading>Frequently Asked Questions</Heading>
                <div className="text-xl text-grey-darker">
                  <CardPanel>
                    {this.faqs.map(faq => (
                      <ExpansionPanel
                        style={{
                          marginBottom: "10px",
                          boxShadow: "none",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                          color: "#545454"
                        }}
                      >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          {faq.question}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          {faq.answer}
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    ))}
                  </CardPanel>
                </div>
              </div>
            </div>
            <div className="col m5 s12">
              <div className="px-5">
                <Heading>Instruction Video</Heading>
                <ul className="mfl-abm pb-10">
                  <li className="black-text text-lighten-2">
                    <video
                      style={{ width: "100%", background: "black" }}
                      controls
                      preload="none"
                    >
                      <source
                        src={process.env.PUBLIC_URL + "/video/movie.mp4"}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </li>
                </ul>

                <Heading>Useful Links</Heading>
                <ul className="mfl-abm">
                  <li className="text-lighten-2 mfl-useful-links-container">
                    <span className="mfl-about-icon">
                      <i className="material-icons">picture_as_pdf</i>
                    </span>
                    <a className="mfl-about-text" href="#" target="_blank">
                      Guidelines
                    </a>
                  </li>
                  <li className="text-lighten-2 mfl-useful-links-container">
                    <span className="mfl-about-icon">
                      <i className="material-icons">picture_as_pdf</i>
                    </span>
                    <a className="mfl-about-text" href="#" target="_blank">
                      Instruction Manual
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MflAbout;
