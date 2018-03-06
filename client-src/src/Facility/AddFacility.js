//@flow
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import FacilityBasicDetails from "./FacilityBasicDetails";
import FacilityContacts from "./FacilityContacts";
import Location from "./FacilityLocation";
import Resources from "./FacilityResources";
import Utilities from "./FacilityUtilities";
import Services from "./FacilityServices";
import footerResizer from "../helpers/footerResize";
import FacilityTabs from "./FacilityTabs";

class AddFacility extends React.Component<Props> {
    componentDidMount() {
        footerResizer();
    }

    render() {
        const basicLink = `/facilitybasicdetails`;
        const links = [
            {
                name: "basic",
                displayName: "Basic".toUpperCase(),
                redirect: basicLink,
                clickHandler: null
            }
        ];

        return (
            <div>
                <div className="row">
                    <div className="col s4 m2 mfl-add-facility">
                        <h5>
                            <i className="material-icons mfl-tm-2">
                                local_hospital
                            </i>
                        </h5>
                    </div>
                    <div className="col s4 m2  mfl-facility-name">
                        <h5>New Facility</h5>
                    </div>
                    <div className="mfl-vertical-ruler" />
                    <div className="col s4 m2">
                        <h5>
                            <b>Chibabvi</b>
                        </h5>
                    </div>
                </div>

                <FacilityTabs />

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
                            path="/facilitybasicdetails"
                            component={FacilityBasicDetails}
                        />

                        <Route
                            exact
                            path="/facilitycontacts"
                            component={FacilityContacts}
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

export default AddFacility;
