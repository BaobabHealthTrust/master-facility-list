import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtilities";
import { connect } from "react-redux";

class FacilityDetails extends Component {
    render() {
        const id = this.props.current.id;
        const summaryLink = `/facilities/${id}`;
        const locationsLink = `/facilities/${id}/locations`;
        const resourcesLink = `/facilities/${id}/resources`;
        const utilitiesLink = `/facilities/${id}/utilities`;

        let badgeClass = "new badge";

        if (this.props.current.operationalStatus) {
            switch (this.props.current.operationalStatus
                .facility_operational_status) {
                case "Closed":
                    badgeClass = "new badge red";
                    break;
                case "Functional":
                    badgeClass = "new badge green";
                    break;
                case "Pending Operation (Under construction)":
                    badgeClass = "new badge orange";
                    break;
                default:
                    break;
            }
        }

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
                                <Link to={resourcesLink}>RESOURCES</Link>
                            </li>
                            <li>
                                <Link to={utilitiesLink}>UTILITIES</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container mfl-titles">
                    <h5>
                        {this.props.current.facility_name}
                        {this.props.current.operationalStatus ? (
                            <span
                                id="badge"
                                className={badgeClass}
                                data-badge-caption={
                                    this.props.current.operationalStatus
                                        .facility_operational_status
                                }
                            />
                        ) : (
                            ""
                        )}
                    </h5>
                    <h6>
                        {this.props.current.facility_code},&nbsp;
                        {this.props.current.district
                            ? this.props.current.district.district_name
                            : ""}
                    </h6>
                </div>
                {this.props.isError ? (
                    <blockquote>
                        <h4>
                            "Sorry, we cannot connect to the Server. Please
                            check your Network"
                        </h4>
                    </blockquote>
                ) : (
                    <Switch>
                        <Route
                            exact
                            path="/facilities/:id"
                            component={Summary}
                        />

                        <Route
                            exact
                            path="/facilities/:id/locations"
                            component={Location}
                        />
                        <Route
                            exact
                            path="/facilities/:id/resources"
                            component={Resources}
                        />
                        <Route
                            exact
                            path="/facilities/:id/utilities"
                            component={Utilities}
                        />
                    </Switch>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        current: state.facilities.currentDetails,
        isError: state.facilities.isNetworkError
    };
};

export default connect(mapStateToProps, null)(FacilityDetails);
