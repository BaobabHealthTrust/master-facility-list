import React, { Component } from "react";
import { Card, CardTitle } from "react-materialize";
import footerResizer from "../helpers/footerResize";
import '../App.css';
import styled, { css } from 'styled-components';
import { kids, baobab, kuunika, lin, moh } from '../images'
import { Banner } from '../common'

const Heading = styled.div.attrs({ className: "text-3xl text-blue font-bold mb-8" })``
const TopMargin = styled.div`
  margin: 40px 0px;
`
const CardImage = styled.div`
  width: 100%;
  height: 200px;
  ${props => props.image && css`
    background-image: url(${props.image});
    background-position: center;
    background-size: contain;
    background-repeat: none;
  `}
`

class MflAbout extends Component {

  componentDidMount() {
    footerResizer();
  }

  render() {
    const image = "https://www.myjobo.com/public/uploads/1523978871336466B9-FCFE-4FB9-A1CF-812D85A97450.png";
    const lin = "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.0-1/11665455_1066531170077971_205320784678689341_n.jpg?_nc_cat=0&oh=5fe44d55b6cd2496cd562cd7256c0f5c&oe=5C282ED1";
    return (
      <div>
        <Banner title="About the Master Health Facility Registry of Malawi" />
        <TopMargin />
        <div className="container mfl-modal-container">
          <div className="row">
            <div className="col m8 s12">
              <Heading>Purpose</Heading>
              <div className="text-xl text-grey-darker">
                <p>In order to strengthen the delivery of adequate services, the Ministry of Health and Population maintains a comprehensive list of all health facilities in Malawi.  This list was previously maintained through a spreadsheet file which made it difficult to update and for decision makers to access.</p>
                <br />
                <p>Additionally, various sections of the Ministry have been maintaining parallel health facility lists making it harder to share and triangulate data across systems. To address these challenges, the Ministry has implemented this Master Health Facility Registry (MHFR). The MHFR is a web service with a user interface to allow health workers access to the full list of facilities, summaries through the dashboard and to perform custom queries depending of specific information needs.</p>
                <br />
                <p>As a Web Service the MHFL provides an Application Programmable Interface (API) which allows other software systems to directly query the central MHFR and update their own lists. This function is a foundation for the Interoperability of Health Information Systems in Malawi.</p>
              </div>
            </div>
            <div className="col m4 s12">
              <Heading>Related Links</Heading>
              <ul className="mfl-abm">
                <li className="black-text text-lighten-2">
                  <span className="mfl-about-icon"><i className="material-icons">file_download</i></span>
                  <a className="mfl-about-text" href="http://health.gov.mw">Download guidelines</a>
                </li>
                <li className="black-text text-lighten-2">
                  <span className="mfl-about-icon"><i className="material-icons">insert_link</i></span>
                  <a className="mfl-about-text" href="http://health.gov.mw">About Kuunika</a>
                </li>
                <li className="black-text text-lighten-2">
                  <span className="mfl-about-icon"><i className="material-icons">insert_link</i></span>
                  <a className="mfl-about-text" href="http://health.gov.mw">About Ministry of Health</a>
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
                  <Card
                    header={<CardImage image={image} />}>
                    <h5>Baobab Health Trust</h5>
                  </Card>
                </div>
                <div className="col m3 s12">
                  <Card
                    header={<CardImage image={lin} />}>
                    <h5>Luke International</h5>
                  </Card>
                </div>
                <div className="col m3 s12">
                  <Card
                    header={<CardImage image={kuunika} />}>
                    <h5>Kuunika</h5>
                  </Card>
                </div>
                <div className="col m3 s12">
                  <Card
                    header={<CardImage image={moh} />}>
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
