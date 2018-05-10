import React, { Component } from "react";
import Card from "../common/MflCard";
import kuunika from "../kuunika.png";
import moh from "../moh.jpg";
import banner from "../banner.png";
import baobabHealth from "../baobab-health.jpg";
import Lin from "../Lin.png";
import footerResizer from "../helpers/footerResize";

class MflAbout extends Component {

    componentDidMount() {
        footerResizer();
    }

    render() {
        return (
            <div>
                <div className="container mfl-dash-container mfl-ref">
                    <img src={banner} className="mfl-abs mfl-banner-img" />
                    <div className="mfl-abs mfl-parallax"><h3>About the Malawi Master Health Facility List</h3></div>
                </div>
                <div className="container mfl-modal-container">
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <h4 className="mfl-contact white-text">About Malawi Master Health Facility Registry</h4>
                        </div>
                    </div>
                    <div className="row mfl-tm-10">
                        <div className="col m8 s12">
                            <h5 className="mfl-contact">Purpose</h5>
                            <p>
                                Incididunt ad est deserunt exercitation. Eu veniam ea reprehenderit ex ex non reprehenderit cupidatat ex officia quis elit. Aute tempor ipsum commodo culpa id. Minim velit eu nisi cillum consequat consectetur. Ex magna occaecat ea cupidatat.
                            </p>
                            <p>
                                Dolor deserunt quis ut irure. Officia Lorem ut ex laborum anim incididunt deserunt nisi nulla ipsum incididunt ut ullamco. Consequat ea aliqua ut laborum labore commodo qui in ut ad est elit exercitation do. Est culpa in id officia aute cupidatat id qui labore reprehenderit aute.
                            </p>
                            <p>
                                Sit enim elit qui consectetur magna sint cillum Lorem dolore cupidatat laboris aute. Incididunt et cupidatat cillum ipsum. Ea ullamco veniam aliqua culpa ipsum do nostrud ex et nostrud exercitation laborum voluptate ea.
                            </p>
                        </div>
                        <div className="col m4 s12">
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
                                    <a className="mfl-about-text" href="http://health.gov.mw">About Ministry of Health</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m6 s12">
                            <h5 className=" blue-text mfl-contact">Partners</h5>
                        </div>
                    </div>
                    <div className="row mfl-tm-2">
                        <div className="col s12 m4 l3">
                            <div className="mlf-w-9 mfl-shadow">
                                <div className="mfl-card-title  blue darken-3">
                                    <h5>Kuunika</h5>
                                </div>
                                <div>
                                    <div className="partner-logos">
                                        <img src={kuunika} alt="kuunika logo" width="200" height="100" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4 l3">
                            <div className="mlf-w-9 mfl-shadow">
                                <div className="mfl-card-title  blue darken-3">
                                    <h5>Ministry of Health</h5>
                                </div>
                                <div>
                                    <div className="partner-logos">
                                        <img src={moh} alt="Ministry of Health" width="200" height="100" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4 l3">
                            <div className="mlf-w-9 mfl-shadow">
                                <div className="mfl-card-title  blue darken-3">
                                    <h5>Luke International</h5>
                                </div>
                                <div>
                                    <div className="partner-logos">
                                        <img src={Lin} alt="Center for Monitoring and Evaluation Department" width="200" height="100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4 l3">
                            <div className="mlf-w-9 mfl-shadow">
                                <div className="mfl-card-title  blue darken-3">
                                    <h5>baobab Health</h5>
                                </div>
                                <div>
                                    <div className="partner-logos">
                                        <img src={baobabHealth} alt="baobab health logo" width="200" height="100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}


export default MflAbout;
