import React from "react";
import Banner from "../../components/atoms/Banner";
import Container from "../../components/atoms/Container";
import Card from "../../components/atoms/Card";
import { Grid } from "@material-ui/core";
import Heading from "../../components/atoms/SectionSubHeading";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faInfoCircle,
  faQuestionCircle,
  faDesktop
} from "@fortawesome/free-solid-svg-icons";

function index() {
  return (
    <>
      <Banner title="About the Master Health Facility Registry of Malawi" />
      <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
            <Heading>Purpose</Heading>
            <TextContainer>
              <p>
                The main purpose of the Malawi Health Facility Registry is to
                provide an easily accessible national online database containing
                a comprehensive list of health facilities in the country for
                purposes of facilitating planning for service delivery and
                performance accountability. The Ministry of Health and
                Population maintains a comprehensive list of all health
                facilities in Malawi with a purpose of strengthening health
                service delivery. The list was previously maintained through a
                spreadsheet file which made it difficult to update and to access
                especially by the decision makers.
              </p>
              <p>
                Additionally, various sections of the Ministry have been
                maintaining parallel health facility lists making it harder to
                share and triangulate data across systems. To address these
                challenges, the Ministry has implemented an online Master Health
                Facility Registry (MHFR). The MHFR is a web service with a user
                interface to allow health workers get access to the full list of
                facilities and view summaries through the dashboard in addition
                to performing custom queries depending of specific information
              </p>
              <p>
                As a Web Service the MHFL [BN1] provides an Application
                Programmable Interface (API) which allows other software systems
                to directly query the central MHFR and update their own lists.
                This function is a foundation for the Interoperability of Health
                Information Systems in Malawi.
              </p>
            </TextContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Heading>Useful Links</Heading>
            <TextContainer>
              <div>
                <a href="https://www.health.gov.mw/" target="_blank">
                  <Icon icon={faInfoCircle} />
                  About Ministry of Health
                </a>
              </div>
              
              <div>
                <a href="https://www.kuunika.org/" target="_blank">
                  <Icon icon={faInfoCircle} />
                  About Kuunika
                </a>
              </div>
            </TextContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextContainer>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={true}>
                  <Card bodyStyle={{ height: "200px" }}>
                    <img
                      alt="Baobab"
                      style={{ width: "100%" }}
                      src="/static/images/baobab.jpg"
                    />
                    <div style={{ textAlign: "center" }}>Baobab Health</div>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={true}>
                  <Card bodyStyle={{ height: "200px" }}>
                    <img
                      alt="LIN"
                      style={{ width: "100%" }}
                      src="/static/images/lin.png"
                    />
                    <div style={{ textAlign: "center" }}>
                      Luke International
                    </div>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={true}>
                  <Card bodyStyle={{ height: "200px" }}>
                    <img
                      alt="Kuunika"
                      style={{ width: "100%" }}
                      src="/static/images/kuunika.png"
                    />
                    <div style={{ textAlign: "center" }}>Kuunika</div>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={true}>
                  <Card bodyStyle={{ height: "200px" }}>
                    <img
                      alt="MoH"
                      style={{ width: "100%" }}
                      src="/static/images/moh.png"
                    />
                    <div style={{ textAlign: "center" }}>
                      Ministry of Health
                    </div>
                  </Card>
                </Grid>
              </Grid>
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
