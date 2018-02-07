import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import FacilitiesHome from "./Facility/FacilitiesHome";
import { Route, Switch } from "react-router-dom";
import FacilityDetails from "./Facility/FacilityDetails";
import Dashboard from "./Dashboard/DashboardHome";
import MflAbout from "./common/MflAbout";

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route
                        exact
                        path="/facilities"
                        component={FacilitiesHome}
                    />
                    <Route path="/facilities/:id" component={FacilityDetails} />
                    <Route
                        exact
                        path="/"
                        component={Dashboard}
                    />
                    <Route
                        exact
                        path="/about"
                        component={MflAbout}
                    />
                </Switch>

                <footer className="page-footer grey lighten-2 mfl-tm-5">
                    <div className="container">
                        <div className="row">
                            <div className="col l6 s12">
                                <h5 className="black-text">Contact Us</h5>
                                <p className="black-text text-lighten-4"><i className="material-icons">call</i>+265 1 21 37 81</p>
                                <p className="black-text text-lighten-4"><i className="material-icons">email</i>moh@healthgov.mw</p>
                            </div>
                            <div className="col l4 offset-l2 s12">
                                <h5 className="black-text">Quick Links</h5>
                                <ul>
                                    <li>Ministry of Health: <a className="black-text text-lighten-3" href="www.health.gov.mw">www.health.gov.mw</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright grey darken-2">
                        <div className="container">
                            <p className="mfl-footer-text-align">
                                © {(new Date()).getFullYear()} Copyright, Republic of Malawi, Ministry of Health
                            </p>
                        </div>
                    </div>
                </footer>
            </div >
        );
    }
}

export default App;
