//@flow
import React, { Component } from "react";
import { Input } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

type Props = {
    handleNextForTabs: Function
};

class FacilityContacts extends Component<Props> {
    render() {
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
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="contact_email"
                                    type="text"
                                    class="validate"
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

export default FacilityContacts;
