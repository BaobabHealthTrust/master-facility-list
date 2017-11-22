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
                    <div class="nav-wrapper blue accent-1">
                        <ul class="left">
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
                        </ul>
                    </div>
                </nav>
                <div className="container mfl-titles">
                    <h5>Bwaila District Hospital</h5>
                    <h6>0011102, Lilongwe</h6>
                </div>

                <Switch>
                    <Route exact path="/facilities/:id" component={Summary} />

                    <Route
                        exact
                        path="/facilities/:id/locations"
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
