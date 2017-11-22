import React, { Component } from "react";
import Facilitydetails from "./FacilityDetails";
import Card from "../common/MflCard";
import setCurrentDetails from "../actions/set-current-details";
import fetchCurrentDetails from "../actions/fetch-current-details";
import { connect } from "react-redux";
import MFLGoogleMap from "../common/MFLGoogleMap";

class FacilityLocation extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;

        if (this.props.facilities.length > 0) {
            this.props.setCurrentDetails(this.props.facilities, id);
        }

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
                  [
                      "district",
                      this.props.current.locations.district.district_name
                  ],
                  ["zone", "Northern Zone"]
              ]
            : [];

        const weatherData = [
            ["sunny", "Some Forecast"],
            ["max temp", "Some Max Temo"],
            ["min temp", "Some Min Temp"]
        ];

        return (
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <div className="z-depth-2 mfl-w-9">
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
                                data={weatherData}
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
