//@flow
import React, { Component } from "react";
import Card from "../common/MflCard";
import { fetchCurrentDetails, setCurrentDetails, addFormValues, postFormData } from "../actions";
import { connect } from "react-redux";
import MFLGoogleMap from "../common/MFLGoogleMap";
import FacilityContacts from "./FacilityContacts";

type State = {
    isEditContactAndLocation: boolean,
}

class FacilityLocation extends Component<State> {
    state = {
        isEditContactAndLocation: false,
    };

    submitEditContactData = async () => {
        const token = sessionStorage.getItem("token");
        const method = "post";
        const facilityId = this.props.match.params.id;
            if(this.props.formValues.error.length === 0) {
             const data = {
                 contact_person_fullname: this.props.contactName,
                 contact_person_phone: this.props.phoneNumber,
                 contact_person_email: this.props.contactEmail,
                 postal_address: this.props.postalAddress,
                 facility_id: facilityId
                 };

             const resource = "/ContactPeople";
             const actionName = "POST_FORM_CONTACT_DATA";       
              await this.props.postFormData(
                        data,
                        resource,
                        method,
                        actionName,
                        token
                        );

             const Geodata = {
                datum: 90,
                longitude: this.props.longitude,
                latitude: this.props.latitude,
                facility_id: facilityId,
               };
             const resourceGeo = "/Geolocations";
             const actionNameGeo = "POST_FORM_GEOLOCATION_DATA";
              await this.props.postFormData(
                     Geodata,
                     resourceGeo,
                     method,
                     actionNameGeo,
                     token
                     );

             const facilityData = {
                   district_id: this.props.district,
                   };
             const facilityUrl ="/Facilities/"+facilityId;
             const facilityMethod = "patch";
             const facilityActionName = "PATCH_FORM_FACILITY_DATA";
              await this.props.postFormData(
                    facilityData,
                    facilityUrl,
                    facilityMethod,
                    facilityActionName,
                    token
                    );

             const locationData = {
                   catchment_area: "area here",
                   catchment_population: 5000,
                   facility_id: facilityId
                   };
             const locationUrl ="/Locations";
             const locationActionName = "POST_FORM_LOCATION_DATA";
              await this.props.postFormData(
                    locationData,
                    locationUrl,
                    method,
                    locationActionName,
                    token
                    );

             const addressData = {
                   physical_address: "physical address here",
                   postal_address: this.props.postalAddress,
                   facility_id: facilityId
                   };
             const addressUrl ="/Addresses";
             const addressActionName = "POST_FORM_ADDRESS_DATA";
              await this.props.postFormData(
                    addressData,
                    addressUrl,
                    method,
                    addressActionName,
                    token
                    );

              if (this.props.postResponse.contactResponse.status === 200 &&
                  this.props.postResponse.geolocationResponse.status === 200 && 
                  this.props.postResponse.districtResponse.status === 200 &&
                  this.props.postResponse.locationResponse.status === 200 && 
                  this.props.postResponse.addressResponse.status === 200) {
                        await this.props.fetchCurrentDetails(facilityId);
                        this.setState({isEditContactAndLocation: false});
                        await this.props.addFormValues("","REMOVE_ALL_FORM_VALUES");
              }
            }
    }

    toggleEditContactAndLocation = ()=>{
       this.setState({isEditContactAndLocation: true});
    }

    handleCancel= ()=>{
         this.props.addFormValues("","REMOVE_ALL_FORM_VALUES");
         this.setState({isEditContactAndLocation: false});
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchCurrentDetails(id);
        console.log(this.props.current);
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
              {sessionStorage.getItem("token") && (
                     !this.state.isEditContactAndLocation?( <a
                         class="waves-effect waves-light green btn mfl-tab-btn-space-previous"
                         onClick ={this.toggleEditContactAndLocation}
                            >
                         <i class="material-icons left">edit</i> Edit
                      </a>):(
                        ""
                      )
                        )}
               {!this.state.isEditContactAndLocation?(
                <div>
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
                </div>):(
                  <FacilityContacts
                     submitContactData={this.submitEditContactData}
                     postalAddressValue = {this.props.current.addresses.postal_address}
                     contactNameValue = {this.props.current.contactPeople.contact_person_fullname}
                     contactEmailValue = {this.props.current.contactPeople.contact_person_email}
                     phoneNumberValue = {this.props.current.contactPeople.contact_person_phone}
                     latitudeValue = {""}
                     longitudeValue = {""}
                     isEditContactAndLocation={this.state.isEditContactAndLocation}
                     handleCancel={this.handleCancel}
                     districts={this.props.districts}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        facilities: state.facilities.list,
        current: state.facilities.currentDetails,
        districts: state.dependancies.districts,
        error: state.formValues.error,
        postResponse: state.postResponse,
    };
};

export default connect(mapStateToProps, {
    setCurrentDetails,
    fetchCurrentDetails,
    addFormValues,
})(FacilityLocation);
