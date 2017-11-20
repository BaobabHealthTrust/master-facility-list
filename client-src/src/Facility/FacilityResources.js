import React, { Component } from "react";
import Facilitydetails from "./FacilityDetails";
import Card from "../common/MflCard";

class FacilityResources extends Component {
    render() {
        const transportData = [[]];

        const bedData = [
            ["maternity beds", "12"],
            ["delivery beds", "10"],
            ["inpatient beds", "9"]
        ];

        const generatorData = [
            ["40 Watt generator", "12"],
            ["60 Watt generator", "10"],
            ["100 Watt generator", "9"],
            ["200 Watt generator", "3"]
        ];

        const computerData = [
            ["desktops", "12"],
            ["laptops", "10"],
            ["Tablets", "9"],
            ["touchscreen", "3"]
        ];

        this.props.facilities.forEach(facility => {
            console.log(facility);
        });

        console.log(this.props.resources);
        const buildingData = [["staff", "12"], ["other", "10"]];
        return (
            <div className="container">
                <br />

                <div className="row">
                    <div className="col m4 s12">
                        <Card
                            heading="transport resources"
                            data={transportData}
                        />
                    </div>
                    <div className="col m4 s12">
                        <Card heading="bed resources" data={bedData} />
                    </div>

                    <div className="col m4 s12">
                        <Card
                            heading="generator resources"
                            data={generatorData}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col m4 s12">
                        <Card
                            heading="computer resources"
                            data={computerData}
                        />
                    </div>
                    <div className="col m4 s12">
                        <Card
                            heading="building resources"
                            data={buildingData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FacilityResources;
