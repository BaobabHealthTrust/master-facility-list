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

                <footer className="page-footer grey darken-2 mfl-tm-5">
                    <div className="footer-copyright grey darken-2">
                        <div className="row">
                            <div className="col s4 m4 l4">
                                <h6 class="white-text">Contact Us</h6>
                                <ul>
                                    <li className="white-text text-lighten-4"><i className="material-icons">call</i>+265 1 21 37 81</li>
                                    <li className="white-text text-lighten-4"><i className="material-icons">email</i>moh@health.gov.mw</li>
                                </ul>
                            </div>
                            <div className="col s4 m4 l4">
                                <p className="mfl-footer-text-align">
                                    © {(new Date()).getFullYear()} Copyright, Republic of Malawi, Ministry of Health
                            </p>
                            </div>
                            <div className="col s4 m4 l4">
                                <h6 class="white-text">Quick Links</h6>
                                <p className="white-text text-lighten-4">www.health.gov.mw</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div >
        );
    }
}

export default App;
