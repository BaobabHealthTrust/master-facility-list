import React, { Component } from "react";
import Card from "../common/MflCard";
import { connect } from 'react-redux';
import fetchFacilitiesDetails from '../actions/showfacility-details';
class Summary extends Component {
    componentDidMount() {
        if (this.props.facilityDetails.length == 0) {
            this.props.fetchFacilitiesDetails();
        }
    }
    render() {
        const contactPersonData = [];

        const addressData = [];

        const ownershipData = [];

         this.props.facilityDetails.forEach(facility => {
                        contactPersonData.push(
                            ["Fullname", facility.contactPeople.contact_person_fullname],
                            ["email",facility.contactPeople.contact_person_email],
                            ["phone",facility.contactPeople.contact_person_phone]
                        );
            
                         addressData.push(
                            ["postal address", facility.addresses.postal_address],
                            ["District", "lilongwe"],
                            ["zone", "central"]
                         );
                         ownershipData.push(
                            ["owner", facility.owner.facility_owner],
                            ["operational Status", facility.operationalStatus.facility_operational_status],
                            ["regulatory Status", facility.regulatoryStatus.facility_regulatory_status]
                         );
        });
        




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
const mapStateToProps = state => {
    return { facilityDetails: state.facilityDetails };
};

export default connect(mapStateToProps, { fetchFacilitiesDetails })(Summary);


