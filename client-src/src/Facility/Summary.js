import React, { Component } from "react";
import Card from "../common/MflCard";
import { connect } from "react-redux";
import fetchFacilities from "../actions/get-facilities";
import setCurrentDetails from "../actions/set-current-details";
import fetchCurrentDetails from "../actions/fetch-current-details";
import moment from "moment";

class Summary extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;

        if (this.props.facilities.length > 0) {
            this.props.setCurrentDetails(this.props.facilities, id);
        }

        this.props.fetchCurrentDetails(id);
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

        const addressData = this.props.current.addresses
            ? [
                  [
                      "postal address",
                      this.props.current.addresses.postal_address
                  ],
                  ["District", "lilongwe"],
                  ["zone", "central"]
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
            <div className="container">
                <div className="row z-depth-2">
                    <div className="col m6 s12">
                        <p className="mfl-summary-header">Common Name</p>

                        <p className="mfl-summary-text">
                            <i class="material-icons mfl-icon left">
                                text_fields
                            </i>
                            {this.props.current.facility_name}
                        </p>
                        <br />
                        <p className="mfl-summary-header">Facility Code</p>
                        <p className="mfl-summary-text">
                            <i class="material-icons mfl-icon left">filter_1</i>
                            {this.props.current.facility_code}
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
