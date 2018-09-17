import React, { Component } from "react";
import { Card, CardTitle } from "react-materialize";
import kuunika from "../kuunika.png";
import moh from "../moh.jpg";
import banner from "../banner.png";
import baobab from "../logos/baobab.jpg";
import lin from "../logos/lin.png";
import lighthouse from "../logos/lighthouse.jpg";
import footerResizer from "../helpers/footerResize";
import '../App.css';
import styled from 'styled-components';
import { kids } from '../images'

const Banner = styled.div`
  background: rgba(0,0,0,.6);
  background-image: url(${kids});
  color: white;
  background-blend-mode: darken;
  padding: 6rem 2rem;
`
const Title = styled.div.attrs({ className: "text-center text-white text-4xl" })`
  text-shadow: 1px 0px #666;
`
const Heading = styled.div.attrs({ className: "text-3xl text-blue font-bold mb-8" })``
const TopMargin = styled.div`
  margin: 40px 0px;
`

class MflAbout extends Component {

  componentDidMount() {
    footerResizer();
  }

  render() {
    const image = "https://www.myjobo.com/public/uploads/1523978871336466B9-FCFE-4FB9-A1CF-812D85A97450.png";
    return (
      <div>
        <Banner>
          <Title>About the Master Health Facility Registry of Malawi</Title>
        </Banner>
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
              <TopMargin />
              <Heading>Implementing Partners</Heading>
              <Card className='small'
                header={<CardTitle image='img/sample-1.jpg'>Card Title</CardTitle>}
                actions={[<a href='#'>This is a Link</a>]}>
                I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
              </Card>
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
        </div>
      </div>
    );
  }
}


export default MflAbout;
