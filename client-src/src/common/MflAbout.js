import React, { Component } from "react";
import Card from "../common/MflCard";
import kuunika from "../kuunika.jpg"
import baobabHealth from "../baobab-health.jpg";

class MflAbout extends Component {
    render() {
        return (
            <div className="container mfl-modal-container">
                <div className="row">
                    <div className="col m6 s12">
                        <h4 className="mfl-contact">About Malawi Master Health Facility Registry</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12">
                        <h5 className="mfl-contact">Purpose</h5>
                        <p className="mfl-paragraph">This is about the Master Health Facility Register</p>
                        <p className="mfl-paragraph">This is about the Master Health Facility Register</p>
                        <p className="mfl-paragraph">This is about the Master Health Facility Register</p>
                        <p className="mfl-paragraph">This is about the Master Health Facility Register</p>
                    </div>
                    <div className="col m6 s12">
                        <h5 className="mfl-contact">Links</h5>
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
                                <a className="mfl-about-text" href="http://health.gov.mw">About CMED</a>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col m12 l12">
                            <div className="row">
                                <div className="col s4 m3 l3">
                                    <ul>
                                        <li>
                                            <img src={kuunika} alt="kuunika logo" width="400" height="400" />
                                        </li>
                                    </ul>
                                </div>
                                <div className="col s4 m3 l3">
                                    <ul>
                                        <li>
                                            <img src={kuunika} alt="kuunika logo" width="400" height="400" />
                                        </li>
                                    </ul>
                                </div>
                                <div className="col s4 m3 l3">
                                    <ul>
                                        <li>
                                            <img src={baobabHealth} alt="baobab health logo" width="400" height="100" />
                                        </li>
                                    </ul>
                                </div>
                                <div className="col s4 m3 l3">
                                    <ul>
                                        <li>
                                            <img src={baobabHealth} alt="baobab health logo" width="400" height="100" />
                                        </li>
                                    </ul>
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
