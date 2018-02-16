import React, { Component } from "react";
import Card from "../common/MflCard";
import setCurrentDetails from "../actions/set-current-details";
import { fetchCurrentDetails } from "../actions/actionsIndex";
import { connect } from "react-redux";
import MFLGoogleMap from "../common/MFLGoogleMap";

class FacilityLocation extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchCurrentDetails(id);
    }

    render() {
        const locationData = this.props.current.locations
            ? [
                [
                    "catchment area",
                    this.props.current.locations.catchment_area
                ],
                [
                    "population",
                    this.props.current.locations.catchment_population
                ],
                ["district", this.props.current.district.district_name]
            ]
            : [];

        const weatherData = [
            ["sunny", "Some Forecast"],
            ["max temp", "Some Max Temo"],
            ["min temp", "Some Min Temp"]
        ];

        const addressData = this.props.current.addresses
            ? [
                ["physical", this.props.current.addresses.physical_address],
                ["postal", this.props.current.addresses.postal_address],
                ["zone", this.props.current.district.zone.zone_name]
            ]
            : [];

        return (
            <div className="container mfl-container">
                <div className="row">
                    <div className="col m6 s12">
                        <div className="z-depth-2">
                            <MFLGoogleMap isMarkerShown />
                        </div>
                    </div>

                    <div className="col m6 s12">
                        <div className="row">
                            <Card
                                heading="Location"
                                icon="location_on"
                                data={locationData}
                            />
                        </div>
                        <div className="row">
                            <Card
                                heading="Address"
                                icon="location_city"
                                data={addressData}
                            />
                        </div>
                        <div className="row">
                            <Card
                                heading="todays weather details"
                                icon="cloud"
                                data={weatherData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        facilities: state.facilities.list,
        current: state.facilities.currentDetails
    };
};

export default connect(mapStateToProps, {
    setCurrentDetails,
    fetchCurrentDetails
})(FacilityLocation);
