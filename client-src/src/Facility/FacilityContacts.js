//@flow
import React, { Component } from "react";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";
import { District } from "../types/model-types";
import { addFormValues, postFormData } from "../actions";
import { connect } from "react-redux";
import validateFunction from "./validation";

type Props = {
    handleNextForTabs: Function,
    handlePreviousForTabs: Function,
    handleCancel: Function,
    postFormData: Function,
    districts: Array<District>,
    postalAddress: string,
    contactName: string,
    contactEmail: string,
    emailError: string,
    contactNameError: string,
    phoneNumber: string,
    phoneNumberError: string,
    latitude: string,
    latitudeError: string,
    longitude: string,
    longitudeError: string
};

type State = {
    tabPreviousName: string,
    notice: string,
 }


class FacilityContacts extends Component<Props, State> {
    state= {
      tabPreviousName: "Basic",
      notice: "",
    };

    async submitFormData(e) {
        await e.preventDefault();
        if(this.props.postResponse.basicResponse !== ""){
        const data = {
            contact_person_fullname: this.props.contactName,
            contact_person_phone: this.props.phoneNumber,
            contact_person_email: this.props.contactEmail,
            postal_address: this.props.postalAddress,
            facility_id: this.props.postResponse.basicResponse.data.id
        };

        const token = sessionStorage.getItem("token");
        await e.preventDefault();
        const resource = "/ContactPeople";
        const method = "post";
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
               facility_id: this.props.postResponse.basicResponse.data.id,
        };
        const tokenGeo = sessionStorage.getItem("token");
        const resourceGeo = "/Geolocations";
        const methodGeo = "post";
        const actionNameGeo = "POST_FORM_GEOLOCATION_DATA";
       if(this.props.formValues.error.length === 0) {
        await this.props.postFormData(
            Geodata,
            resourceGeo,
            methodGeo,
            actionNameGeo,
            tokenGeo
        );
        const facilityData = {
            district_id: this.props.district,
        };
        const facilityId = this.props.postResponse.basicResponse.data.id;
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
        if (this.props.postResponse.contactResponse.status === 200 && this.props.postResponse.geolocationResponse.status === 200 && this.props.postResponse.districtResponse.status === 200) {
            this.props.handleNextForTabs("Resources");
        }}
     }else{
        const msg="You can not start from contacts and locations tab but start from basic tab";
        this.setState({notice:msg});
     }
    }

    validation(e) {
        const values = validateFunction(e);
        this.props.addFormValues(values.error, values.actionTypeError);
        this.props.addFormValues(e.target.value, values.actionType);
    }

    render() {
        let districtOptions;

        if (this.props.districts.length > 0) {
            districtOptions = this.props.districts.map(d => (
                <option value={d.id}>{d.district_name}</option>
            ));
        }
        return (
            <div>
                <div class="row">
                    <form
                        onSubmit={e => this.submitFormData(e)}
                        class="col s12"
                    >
                    <span className="red-text">
                    {this.state.notice}
                     </span>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="postal_address"
                                    name="postal_address"
                                    type="text"
                                    class="validate"
                                    value={this.props.postalAddress}
                                    onChange={e => this.validation(e)}
                                    required
                                />
                                <label for="postal_address">
                                    Enter Postal Address
                                </label>
                                <span className="red-text">
                                    {this.props.postalAddressError}
                                </span>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="contact_name"
                                    name="contact_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.contactName}
                                    onChange={e => this.validation(e)}
                                    required
                                />
                                <label for="contact_name">
                                    Enter contact Name
                                </label>
                                <span className="red-text">
                                    {this.props.contactNameError}
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0"
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e.target.value,
                                            "DISTRICT"
                                        )
                                    }>
                                    <option value={`"${
                                            this.props.district
                                        }"`}>Select District</option>
                                    {districtOptions}
                                </Input>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="contact_email"
                                    name="contact_email"
                                    type="text"
                                    class="validate"
                                    value={this.props.contactEmail}
                                    onChange={e => this.validation(e)}
                                    required
                                />
                                <label for="contact_email">
                                    Enter Contact Email
                                </label>
                                <span className="red-text">
                                    {this.props.emailError}
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Traditional Authority
                                    </option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    class="validate"
                                    value={this.props.phoneNumber}
                                    onChange={e => this.validation(e)}
                                    required
                                />
                                <label for="phone_number">
                                    Enter Phone Number
                                </label>
                                <span className="red-text">
                                    {this.props.phoneNumberError}
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">Select Location</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                            <div class="input-field col s3">
                                <input
                                    id="longitude"
                                    name="longitude"
                                    type="text"
                                    class="validate"
                                    value={this.props.longitude}
                                    onChange={e => this.validation(e)}
                                    required
                                />
                                <label for="longitude">Enter Longitude</label>
                                <span className="red-text">
                                    {this.props.longitudeError}
                                </span>
                            </div>
                            <div class="input-field col s3">
                                <input
                                    id="latitude"
                                    name="latitude"
                                    type="text"
                                    class="validate"
                                    value={this.props.latitude}
                                    onChange={e => this.validation(e)}
                                    required
                                />
                                <label for="latitude">Enter Latitude</label>
                                <span className="red-text">
                                    {this.props.latitudeError}
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Estimated Population
                                    </option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                            <div class="col s3">
                                <a
                                    class="waves-effect waves-light btn mfl-select-tab"
                                    //onClick={e => this.props.toggleAddFacility(e)}
                                >
                                    Or Select GeoLocation
                                </a>
                            </div>
                        </div>
                        <FacilityAddFooter
                            tabPreviousName={this.state.tabPreviousName}
                            handlePreviousForTabs={(tabName)=>this.props.handlePreviousForTabs(tabName)}
                            handleNextForTabs={this.props.handleNextForTabs}
                            handleCancel={this.props.handleCancel}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        postalAddress: state.formValues.postalAddress,
        postalAddressError: state.formValues.postalAddressError,
        contactName: state.formValues.contactName,
        contactEmail: state.formValues.contactEmail,
        emailError: state.formValues.emailError,
        contactNameError: state.formValues.contactNameError,
        phoneNumber: state.formValues.phoneNumber,
        phoneNumberError: state.formValues.phoneNumberError,
        latitude: state.formValues.latitude,
        latitudeError: state.formValues.latitudeError,
        longitude: state.formValues.longitude,
        district: state.formValues.district,
        longitudeError: state.formValues.longitudeError,
        postResponse: state.postResponse,
        formValues: state.formValues
    };
};

export default connect(mapStateToProps, { addFormValues, postFormData })(
    FacilityContacts
);
