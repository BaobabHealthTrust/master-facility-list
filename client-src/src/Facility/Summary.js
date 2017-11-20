import React, { Component } from "react";
import Card from "../common/MflCard";
import { connect } from "react-redux";
import fetchFacilities from "../actions/get-facilities";
import setCurrentDetails from "../actions/set-current-details";

class Summary extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.setCurrentDetails(this.props.facilities, id);
    }

    render() {
        const contactPersonData = [
            ["Fullname", "Someone"],
            ["email", "Somewhere"],
            ["phone", "123456"]
        ];

        const addressData = [
            ["postal address", "Some Address"],
            ["District", "lilongwe"],
            ["zone", "central"]
        ];

        const ownershipData = [
            ["owner", "Some Owner"],
            ["operational Status", "Some Status"],
            ["regulatory Status", "Some Other Status"]
        ];

        return (
            <div className="container">
                <div className="row z-depth-2">
                    <div className="col m6 s12">
                        <p className="center mfl-summary-header">Common Name</p>
                        <p className="center mfl-summary-text">
                            {this.props.current.facility_name}
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

const mapStateToProps = state => {
    return {
        facilities: state.facilities.list,
        current: state.facilities.currentDetails
    };
};

export default connect(mapStateToProps, { setCurrentDetails })(Summary);
