//@flow
import React, { Component } from "react";
import Card from "../common/MflCard";
import { fetchCurrentDetails, setCurrentDetails, addFormValues, postFormData } from "../actions";
import { connect } from "react-redux";
import MFLGoogleMap from "../common/MFLGoogleMap";
import { ContactsForm } from "./FacilityForms";

type State = {
  isEditContactAndLocation: boolean,
}

class FacilityLocation extends Component<State> {
  state = {
    isEditContactAndLocation: false,
  };

  submitEditContactData = async () => {
    const token = sessionStorage.getItem("token");
    const method = "patch";
    const facilityId = this.props.match.params.id;
    if (this.props.error.length === 0) {
      const data = {
        contact_person_fullname: this.props.contactName,
        contact_person_phone: this.props.phoneNumber,
        contact_person_email: this.props.contactEmail,
        postal_address: this.props.postalAddress,
      };
      const contactpeopleId = this.props.current.contactPeople.id;
      const resource = "/ContactPeople/" + contactpeopleId;
      const actionName = "EDIT_FORM_CONTACT_DATA";
      await this.props.postFormData(
        data,
        resource,
        method,
        actionName,
        token
      );

      const facilityData = {
        district_id: this.props.district,
      };
      const facilityUrl = "/Facilities/" + facilityId;
      const facilityActionName = "PATCH_FORM_FACILITY_DATA";
      await this.props.postFormData(
        facilityData,
        facilityUrl,
        method,
        facilityActionName,
        token
      );

      const Geodata = {
        datum: 90,
        longitude: this.props.longitude,
        latitude: this.props.latitude,
      };
      console.log(Geodata);
      const geolocationId = this.props.current.geolocations.id
      const resourceGeo = "/Geolocations/" + geolocationId;
      const actionNameGeo = "EDIT_FORM_GEOLOCATION_DATA";
      await this.props.postFormData(
        Geodata,
        resourceGeo,
        method,
        actionNameGeo,
        token
      );

      const locationData = {
        catchment_area: "area here",
        catchment_population: 5000,
      };
      const locationId = this.props.current.locations.id;
      const locationUrl = "/Locations/" + locationId;
      const locationActionName = "EDIT_FORM_LOCATION_DATA";
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
      };
      const addressId = this.props.current.addresses.id;
      const addressUrl = "/Addresses/" + addressId;
      const addressActionName = "EDIT_FORM_ADDRESS_DATA";
      await this.props.postFormData(
        addressData,
        addressUrl,
        method,
        addressActionName,
        token
      );

      if (this.props.postResponse.editContactResponse.status === 200 &&
        this.props.postResponse.editGeolocationResponse.status === 200 &&
        this.props.postResponse.districtResponse.status === 200 &&
        this.props.postResponse.editLocationResponse.status === 200 &&
        this.props.postResponse.editAddressResponse.status === 200) {
        await this.props.fetchCurrentDetails(facilityId);
        this.setState({ isEditContactAndLocation: false });
        await this.props.addFormValues("", "REMOVE_ALL_FORM_VALUES");
      }
    }
  }

  toggleEditContactAndLocation = () => {
    this.setState({ isEditContactAndLocation: true });
  }

  handleCancel = () => {
    this.props.addFormValues("", "REMOVE_ALL_FORM_VALUES");
    this.setState({ isEditContactAndLocation: false });
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
      <div className="container">
        {sessionStorage.getItem("token") && (
          !this.state.isEditContactAndLocation ? (<a
            class="waves-effect waves-light green btn mfl-tab-btn-space-previous"
            onClick={this.toggleEditContactAndLocation}
          >
            <i class="material-icons left">edit</i> Edit
                      </a>) : (
              ""
            )
        )}
        {!this.state.isEditContactAndLocation ? (
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
          </div>) : (
            <ContactsForm
              submitContactData={this.submitEditContactData}
              postalAddressValue={this.props.current.addresses.postal_address}
              contactNameValue={this.props.current.contactPeople.contact_person_fullname}
              contactEmailValue={this.props.current.contactPeople.contact_person_email}
              phoneNumberValue={this.props.current.contactPeople.contact_person_phone}
              districtValue={this.props.current.district_id}
              latitudeValue={this.props.current.geolocations.latitude}
              longitudeValue={this.props.current.geolocations.longitude}
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
    contactName: state.formValues.contactName,
    phoneNumber: state.formValues.phoneNumber,
    contactEmail: state.formValues.contactEmail,
    postalAddress: state.formValues.postalAddress,
    district: state.formValues.district,
    latitude: state.formValues.latitude,
    longitude: state.formValues.longitude,
  };
};

export default connect(mapStateToProps, {
  setCurrentDetails,
  fetchCurrentDetails,
  addFormValues,
  postFormData
})(FacilityLocation);
