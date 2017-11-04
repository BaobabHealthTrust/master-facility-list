import React, { Component } from "react";
import Card from "../common/MflCard";

class Summary extends Component {
    render() {
        const contactPersonData = [
            ["Fullname", "Japhat Gondwe"],
            ["email", "jgondwe@gmail.com"],
            ["phone", "+265888122301"]
        ];

        const addressData = [
            ["postal address", "p.o box 334"],
            ["District", "lilongwe"],
            ["zone", "central"]
        ];

        const ownershipData = [
            ["owner", "malawi goevernment"],
            ["operational status", "operation"],
            ["regulation status", "licensed"]
        ];

        return (
            <div className="container">
                
                <div className="row z-depth-2">
                    <div className="col m6 s12">
                        <p className="center mfl-summary-header">Common Name</p>
                        <p className="center mfl-summary-text">
                            Bottom Hospital
                        </p>
                        <br />
                        <p className="center mfl-summary-header">
                            Facility Code
                        </p>
                        <p className="center mfl-summary-text">LL00111</p>
                    </div>

                    <div className="col m6 s12">
                        <p className="center mfl-summary-header">DATE OPENED</p>
                        <p className="center mfl-summary-text">May 1987</p>

                        <br />

                        <p className="center mfl-summary-header">
                            Facility Type
                        </p>
                        <p className="center mfl-summary-text">Hospital</p>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col m4 s12">
                        <Card
                            heading="contact person"
                            data={contactPersonData}
                        />
                    </div>
                    <div className="col m4 s12">
                        <Card heading="address" data={addressData} />
                    </div>

                    <div className="col m4 s12">
                        <Card
                            heading="ownership&regulation"
                            data={ownershipData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;
