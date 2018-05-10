//@flow
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Summary from "./Summary";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtilities";
import Services from "./FacilityServices";
import { connect } from "react-redux";
import SecondaryMenu from "../common/SecondaryMenu";
import footerResizer from "../helpers/footerResize";

type Props = {
    match: any,
    current: any
};

class FacilityDetails extends React.Component<Props> {
    componentWillReceiveProps() {
        footerResizer();
    }

    render() {
        const id = this.props.match.params.id;
        const summaryLink = `/facilities/${id}`;
        const locationsLink = `/facilities/${id}/locations`;
        const resourcesLink = `/facilities/${id}/resources`;
        const utilitiesLink = `/facilities/${id}/utilities`;
        const servicesLink = `/facilities/${id}/services`;

        const links = [
            {
                name: "summary",
                displayName: "Summary".toUpperCase(),
                redirect: summaryLink,
                clickHandler: null
            },
            {
                name: "contactsandlocations",
                displayName: "Contacts and Locations".toUpperCase(),
                redirect: locationsLink,
                clickHandler: null
            },
            {
                name: "resources",
                displayName: "resources".toUpperCase(),
                redirect: resourcesLink,
                clickHandler: null
            },
            {
                name: "utilities",
                displayName: "utilities".toUpperCase(),
                redirect: utilitiesLink,
                clickHandler: null
            },
            {
                name: "services",
                displayName: "services".toUpperCase(),
                redirect: servicesLink,
                clickHandler: null
            }
        ];

        let badgeClass = "new badge";

        if (this.props.current.operationalStatus) {
            switch (this.props.current.operationalStatus
                .facility_operational_status) {
                case "Closed":
                    badgeClass = "new badge red";
                    break;
                case "Closed (Temporary)":
                    badgeClass = "new badge deep-orange";
                    break;
                case "Functional":
                    badgeClass = "new badge green";
                    break;
                case "Pending Operation (Under construction)":
                    badgeClass = "new badge orange";
                    break;
                case "Pending Operation (Construction Complete)":
                    badgeClass = "new badge brown";
                    break;
                default:
                    break;
            }
        }

        return (
            <div>
                <SecondaryMenu links={links} defaultActivePage={"summary"} />
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
