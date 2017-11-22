import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtility";
import { connect } from "react-redux";

class FacilityDetails extends Component {
    render() {
        const id = this.props.current.id;
        const summaryLink = `/facilities/${id}`;
        const locationsLink = `/facilities/${id}/locations`;
        return (
            <div className="">
                <nav>
                    <div class="nav-wrapper blue accent-1">
                        <ul class="left">
                            <li className="active">
                                <Link to={summaryLink}>SUMMARY</Link>
                            </li>
                            <li>
                                <Link to={locationsLink}>
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
                    <h5>{this.props.current.facility_name}</h5>
                    <h6>
                        0011102,{" "}
                        {this.props.current.locations
                            ? this.props.current.locations.district
                                  .district_name
                            : ""}
                    </h6>
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
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { current: state.facilities.currentDetails };
};

export default connect(mapStateToProps, null)(FacilityDetails);
