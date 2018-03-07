//@flow
import React, { Component } from "react";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";
import { District } from "../types/model-types";
import { addFormValues } from "../actions";
import { connect } from "react-redux";

type Props = {
    handleNextForTabs: Function,
    districts: Array<District>,
    postalAddress: string,
    contactName: string,
    contactEmail: string
};

class FacilityContacts extends Component<Props> {
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
                    <form class="col s12">
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
                                    type="text"
                                    class="validate"
                                    value={this.props.contactName}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e,
                                            "CONTACT_NAME"
                                        )
                                    }
                                />
                                <label for="contact_name">
                                    Enter contact Name
                                </label>
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
                                    type="text"
                                    class="validate"
                                    value={this.props.contactEmail}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e,
                                            "CONTACT_EMAIL"
                                        )
                                    }
                                />
                                <label for="contact_email">
                                    Enter Contact Email
                                </label>
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
                                    type="text"
                                    class="validate"
                                />
                                <label for="phone_number">
                                    Enter Phone Number
                                </label>
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
                                    type="text"
                                    class="validate"
                                />
                                <label for="longitude">Enter Longitude</label>
                            </div>
                            <div class="input-field col s3">
                                <input
                                    id="latitude"
                                    type="text"
                                    class="validate"
                                />
                                <label for="latitude">Enter Latitude</label>
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
        contactEmail: state.formValues.contactEmail
    };
};

export default connect(mapStateToProps, { addFormValues })(FacilityContacts);
