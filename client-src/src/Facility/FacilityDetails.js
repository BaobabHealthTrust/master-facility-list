import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtilities";
import Services from "./FacilityServices";
import { connect } from "react-redux";

class FacilityDetails extends Component {
    constructor() {
        super();
        this.state = {
            activePage: "summary"
        };
    }

    render() {
        const id = this.props.match.params.id;
        const summaryLink = `/facilities/${id}`;
        const locationsLink = `/facilities/${id}/locations`;
        const resourcesLink = `/facilities/${id}/resources`;
        const utilitiesLink = `/facilities/${id}/utilities`;
        const servicesLink = `/facilities/${id}/services`;

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
                            <li
                                className={
                                    this.state.activePage === "summary"
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link
                                    to={summaryLink}
                                    onClick={e =>
                                        this.setState({
                                            activePage: "summary"
                                        })
                                    }
                                >
                                    SUMMARY
                                </Link>
                            </li>

                            {this.state.activePage === "contactsandlocation" ? (
                                <li className="active">
                                    <Link
                                        to={locationsLink}
                                        onClick={e =>
                                            this.setState({
                                                activePage:
                                                    "contactsandlocation"
                                            })
                                        }
                                    >
                                        CONTACTS AND LOCATION
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        onClick={e =>
                                            this.setState({
                                                activePage:
                                                    "contactsandlocation"
                                            })
                                        }
                                        to={locationsLink}
                                    >
                                        CONTACTS AND LOCATION
                                    </Link>
                                </li>
                            )}
                            <li
                                className={
                                    this.state.activePage === "resources"
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link
                                    to={resourcesLink}
                                    onClick={e =>
                                        this.setState({
                                            activePage: "resources"
                                        })
                                    }
                                >
                                    RESOURCES
                                </Link>
                            </li>
                            <li
                                className={
                                    this.state.activePage === "utilities"
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link
                                    to={utilitiesLink}
                                    onClick={e =>
                                        this.setState({
                                            activePage: "utilities"
                                        })
                                    }
                                >
                                    UTILITIES
                                </Link>
                            </li>
                            <li
                                className={
                                    this.state.activePage === "services"
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link
                                    to={servicesLink}
                                    onClick={e =>
                                        this.setState({
                                            activePage: "services"
                                        })
                                    }
                                >
                                    SERVICES
                                </Link>
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
                        <Route
                            exact
                            path="/facilities/:id/services"
                            component={Services}
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
