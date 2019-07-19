import React from "react";
import Banner from "../../components/atoms/Banner";
import Container from "../../components/atoms/Container";
import Card from "../../components/atoms/Card";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import Heading from "../../components/atoms/SectionSubHeading";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFilePdf,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

function index() {
  const faqs = [
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

  return (
    <>
      <Banner title="Let Us Help You" />
      <Container style={{ paddingTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Heading>FAQs</Heading>
            <Card bodyStyle={{ padding: "20px" }}>
              {faqs.map(faq => (
                <ExpansionPanel
                  style={{
                    marginBottom: "10px",
                    boxShadow: "none",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    color: "#545454"
                  }}
                >
                  <ExpansionPanelSummary
                    expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                  >
                    {faq.question}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>{faq.answer}</ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Heading>Instructions</Heading>
            <video
              style={{ width: "100%", background: "black" }}
              controls
              preload="none"
            >
              <source src={"/static/video/movie.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Heading>Useful Links</Heading>
            <TextContainer>
              <div>
                <a href="/">
                  <Icon icon={faFilePdf} />
                  Guidelines
                </a>
              </div>
              <div>
                <a href="/">
                  <Icon icon={faFileAlt} />
                  Instruction Manual
                </a>
              </div>
            </TextContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default index;

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
