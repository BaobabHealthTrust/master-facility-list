//@flow
import React, { Component } from "react";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";
import { District } from "../types/model-types";
import { addFormValues } from "../actions";
import { connect } from "react-redux";
import validateFunction from "./validation";

type Props = {
    handleNextForTabs: Function,
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

class FacilityContacts extends Component<Props> {
    async formSubmitted(e) {
        await alert(this.props.commonName);
        e.preventDefault();
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
                    <form onSubmit={e => this.formSubmitted(e)} class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="postal_address"
                                    type="text"
                                    class="validate"
                                    value={this.props.postalAddress}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e,
                                            "POSTAL_ADDRESS"
                                        )
                                    }
                                />
                                <label for="postal_address">
                                    Enter Postal Address
                                </label>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="contact_name"
                                    name="contact_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.contactName}
                                    onChange={e => this.validation(e)}
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
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">Select District</option>
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
                            handleNextForTabs={this.props.handleNextForTabs}
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
        contactName: state.formValues.contactName,
        contactEmail: state.formValues.contactEmail,
        emailError: state.formValues.emailError,
        contactNameError: state.formValues.contactNameError,
        phoneNumber: state.formValues.phoneNumber,
        phoneNumberError: state.formValues.phoneNumberError,
        latitude: state.formValues.latitude,
        latitudeError: state.formValues.latitudeError,
        longitude: state.formValues.longitude,
        longitudeError: state.formValues.longitudeError
    };
};

export default connect(mapStateToProps, { addFormValues })(FacilityContacts);
