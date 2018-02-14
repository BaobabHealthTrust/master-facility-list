import React from "react";

export default (props) => {
    return (
        <footer className="page-footer light-blue darken-4">
            <div className="container">
                <div className="row mfl-no-margin">
                    <div className="col s12 m4 white-text">
                        <h5 className="mfl-contact">Contact Us</h5>
                    </div>
                    <div className="col s12 m8 white-text">
                        <div className="row">
                            <div className="col m6">
                                <ul>
                                    <li className="white-text text-lighten-4">
                                        <span className="mfl-sm-icon"><i className="material-icons">call</i></span>
                                        +265 1 21 37 81
                                    </li>
                                    <li className="white-text text-lighten-4">
                                        <span className="mfl-sm-icon"><i className="material-icons">email</i></span>
                                        <a href="mailto:moh@health.gov.mw">moh@health.gov.mw</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col m6">
                                <ul>
                                    <li className="white-text text-lighten-4">
                                        <span className="mfl-sm-icon"><i className="material-icons">insert_link</i></span>
                                        <a href="http://health.gov.mw">www.health.gov.mw</a>
                                    </li>
                                </ul>
                                <span className="mfl-copy">© {(new Date()).getFullYear()} Copyright, Republic of Malawi, Ministry of Health</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </footer>
    )
}