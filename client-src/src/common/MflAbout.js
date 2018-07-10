import React, { Component } from "react";
import Card from "../common/MflCard";
import kuunika from "../kuunika.png";
import moh from "../moh.jpg";
import banner from "../banner.png";
import baobab from "../logos/baobab.jpg";
import lin from "../logos/lin.png";
import lighthouse from "../logos/lighthouse.jpg";
import footerResizer from "../helpers/footerResize";
import '../App.css';

class MflAbout extends Component {

    componentDidMount() {
        footerResizer();
    }

    render() {
        return (
            <div>
                <div style={{ backgroundImage: 'url("https://cdn-images-1.medium.com/max/660/1*WgROsTKa6diRYTG5K0R5mw.jpeg")'}}>
                    <div style={{ padding: '6rem 2rem', backgroundColor: 'rgba(0,0,0,.5)' }}>
                        <h3 className="text-center" style={{color: 'white'}}>About the Malawi Master Health Facility Registry</h3>
                    </div>
                </div>
                {/* <div className="containe mfl-dash-container mfl-ref" style={{background: 'yellow', border: '1px solid red'}}>
                    <img src={banner} className="mfl-abs mfl-banner-img"style={{width: "130px"}} />
                    <div className="mfl-abs mfl-parallax" style={{backkground: 'yellow'}}><h3>About the Malawi Master Health Facility Registry</h3></div>
                </div> */}
                <div className="container mfl-modal-container">
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <h4 className="mfl-contact white-text">About Malawi Master Health Facility Registry</h4>
                        </div>
                    </div>
                    <div className="row">
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
                    {/* TODO: resize all partners images */}
                        <div className="col m12 s12">
                            <h5 className="mfl-contact">Partners</h5>
                            <div class="row">
                                <div className="col s12 m4 l3">
                                    <div className="mlf-w-9 mfl-shado">
                                        <div>
                                            <div className="partner-logos">
                                                <img
                                                    src={moh}
                                                    alt="Ministry of Health"
                                                    className="partner-logo"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col s12 m4 l3">
                                    <div className="mlf-w-9 mfl-shado">
                                        <div>
                                            <div className="partner-logos">
                                                <img
                                                    src={lighthouse}
                                                    alt="kuunika logo"
                                                    className="partner-logo"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m4 l3">
                                    <div className="mlf-w-9 mfl-shado">
                                        <div>
                                            <div className="partner-logos">
                                                <img 
                                                    src={baobab} 
                                                    alt="baobab health logo" 
                                                    className="partner-logo"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m4 l3">
                                    <div className="mlf-w-9 mfl-shado">
                                        <div>
                                            <div className="partner-logos">
                                                <img 
                                                    src={lin} 
                                                    alt="Center for Monitoring and Evaluation Department" 
                                                    className="partner-logo"
                                                    />
                                            </div>
                                        </div>
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
