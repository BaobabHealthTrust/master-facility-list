import React, { Component } from "react";
import Card from "../common/MflCard";

class MflAbout extends Component {
    render() {
        return (
            <div className="container mfl-modal-container">
                <div className="row">
                    <div className="col m6 s12">
                        {/* <Card
                                heading="Location"
                                icon="location_on"
                                data={locationData}
                            /> */}
                        <h1>MHFL</h1>
                    </div>
                    <div className="col m6 s12">
                        {/* <Card
                                heading="Address"
                                icon="location_city"
                                data={addressData}
                            /> */}
                        <h1>MHFL</h1>
                    </div>
                </div>
            </div>
        );
    }
}


export default MflAbout;
