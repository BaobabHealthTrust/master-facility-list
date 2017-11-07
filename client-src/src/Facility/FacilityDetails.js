import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtility";
import MyMapComponent from "./MyMapComponent";

class FacilityDetails extends Component {
    render() {
        return (
            <div className="">
                <nav>
                    <div class="nav-wrapper grey darken-2">
                        <ul class="left hide-on-med-and-down">
                            <li className="active">
                                <Link to="/facilities/1">SUMMARY</Link>
                            </li>
                            <li>
                                <Link to="/facilities/1/locations">
                                    CONTACTS AND LOCATIONS
                                </Link>
                            </li>
                            <li>
                                <Link to="/facilities/1/resources">
                                    RESOURCES
                                </Link>
                            </li>
                            <li>
                                <Link to="/facilities/1/utilities">
                                    UTILITIES
                                </Link>
                            </li>

                            <li>
                                <Link to="/facilities/1/MapWithAMarkerInfoWindow">
                                    UTILITIES
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h6 className="mfl-summary-subheader mfl-title">
                    {"Bwaila District Hospital".toUpperCase()}
                </h6>
                <h5 className="mfl-summary-subtext mfl-title">
                    {"ll00001,lilongwe".toUpperCase()}
                </h5>
                <br />
                <Switch>
                    <Route
                        exact
                        path={`${this.props.match.url}`}
                        component={Summary}
                    />
                    <Route
                        path={`${this.props.match.url}/locations`}
                        component={Location}
                    />
                    <Route
                        path={`${this.props.match.url}/resources`}
                        component={Resources}
                    />
                    <Route
                        path={`${this.props.match.url}/utilities`}
                        component={Utilities}
                    />

                    <Route
                        path={`${this.props.match.url}/MyMapComponent`}
                        component={MyMapComponent}
                    />
                </Switch>
            </div>
        );
    }
}

export default FacilityDetails;
