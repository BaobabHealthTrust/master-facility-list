import React, { Component } from "react";
import Card from "../common/MflCard";
import { connect } from "react-redux";
import { fetchCurrentDetails, setCurrentDetails } from "../actions";
import moment from "moment";

class Summary extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;

        this.props.fetchCurrentDetails(id);
    }

    componentWillReceiveProps(newProps) {
        const newId = newProps.match.params.id;
        newProps.fetchCurrentDetails(newId);
    }

    render() {
        const contactPersonData = this.props.current.contactPeople
            ? [
                [
                    "Fullname",
                    this.props.current.contactPeople.contact_person_fullname
                ],
                [
                    "email",
                    this.props.current.contactPeople.contact_person_email
                ],
                [
                    "phone",
                    this.props.current.contactPeople.contact_person_phone
                ]
            ]
            : [];

        const ownershipData =
            this.props.current.owner &&
                this.props.current.operationalStatus &&
                this.props.current.regulatoryStatus
                ? [
                    ["owner", this.props.current.owner.facility_owner],
                    [
                        "operational Status",
                        this.props.current.operationalStatus
                            .facility_operational_status
                    ],
                    [
                        "regulatory Status",
                        this.props.current.regulatoryStatus
                            .facility_regulatory_status
                    ]
                ]
                : [];

        return (
            <div className="container mfl-container">
                <div className="row z-depth-2">
                    <div className="col m6 s12">
                        <p className="mfl-summary-header">Common Name</p>

                        <p className="mfl-summary-text">
                            <i class="material-icons mfl-icon left">
                                text_fields
                            </i>
                            {this.props.current.common_name}
                        </p>
                        <br />
                        <p className="mfl-summary-header">Facility Code</p>
                        <p className="mfl-summary-text">
                            <i class="material-icons mfl-icon left">map</i>
                            {this.props.current.district
                                ? this.props.current.district.zone.zone_name
                                : ""}
                        </p>
                    </div>

                    <div className="col m6 s12">
                        <p className="mfl-summary-header">DATE OPENED</p>
                        <p className="mfl-summary-text">
                            <i class="material-icons mfl-icon left">today</i>
                            {moment(
                                this.props.current.facility_date_opened
                            ).format("MMMM Do YYYY")}
                        </p>

                        <br />

                        <p className="mfl-summary-header">Facility Type</p>
                        <p className="mfl-summary-text">
                            <i class="material-icons mfl-icon left">
                                local_hospital
                            </i>
                            {this.props.current.facilityType
                                ? this.props.current.facilityType.facility_type
                                : ""}
                        </p>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col l6 m12 s12">
                        <Card
                            heading="contact person"
                            icon="person"
                            data={contactPersonData}
                        />
                    </div>

                    <div className="col l6 m12 s12">
                        <Card
                            heading="ownership & regulation"
                            icon="bookmark"
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

export default connect(mapStateToProps, {
    setCurrentDetails,
    fetchCurrentDetails
})(Summary);
