//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";

type Props = {
    handleNextForTabs: Function,
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>
};

class FacilityBasicDetails extends Component<Props> {
    render() {
        let facilityOwnerOptions;

        if (this.props.facilityOwners.length > 0) {
            facilityOwnerOptions = this.props.facilityOwners.map(fo => (
                <option value={fo.id}>{fo.facility_owner}</option>
            ));
        }

        let operationalStatusOptions;
        
                if (this.props.facilityOwners.length > 0) {
                    facilityOwnerOptions = this.props.facilityOwners.map(fo => (
                        <option value={fo.id}>{fo.facility_owner}</option>
                    ));
                }
        

        return (
            <div>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6 ">
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                />
                                <label for="facility_name">Facility Name</label>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Regulatory Status
                                    </option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                />
                                <label for="facility_name">Common Name</label>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Facility Type
                                    </option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                />
                                <label for="facility_name">
                                    Select Date Opened
                                </label>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Regulatory Status
                                    </option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </Input>
                            </div>
                        </div>
                        <div class="row">
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Facility Owner
                                    </option>
                                    {facilityOwnerOptions}
                                </Input>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="registration_number"
                                    type="text"
                                    class="validate"
                                />
                                <label for="registration_number">
                                    Enter Registration Number
                                </label>
                            </div>
                        </div>
                        <FacilityAddFooter
                            tabName={"Basic"}
                            handleNextForTabs={this.props.handleNextForTabs}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default FacilityBasicDetails;
