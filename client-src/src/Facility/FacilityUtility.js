import React, { Component } from "react";
import Card from "../common/MflCard";
import FacilityDetails from "./FacilityDetails";
import { connect } from 'react-redux';
import ShowUtility from '../actions/showUtility';

class Utilities extends Component {
    render() {
        const energyData = [
            ["national grid", ""],
            ["generator", ""],
            ["solar panels", ""]
        ];

        const waterData = [
            ["piped into healthfacility", ""],
            ["piped into facilityground", ""],
            ["public taps/stand pipes", ""]
        ];

        const waistData = [
            ["rubbish pit", ""],
            ["toilet/pit latrine", ""],
            ["rubbish", ""]
        ];

        return (
            <div className="container">
                <br />

                <div className="row">
                    <div className="col m4 s12">
                        <Card heading="energy provider" data={energyData} />
                    </div>
                    <div className="col m4 s12">
                        <Card heading="water provider" data={waterData} />
                    </div>

                    <div className="col m4 s12">
                        <Card heading="waste disposal" data={waistData} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { showUtility: state.showUtility };
};

export default connect(mapStateToProps, { ShowUtility })(Utilities);

