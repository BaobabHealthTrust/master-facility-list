//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem } from "react-materialize";
import FacilityAddFooter from "./FacilityAddFooter";
import { debounce } from "lodash";
import {
    RegulatoryStatus,
    OperationalStatus,
    FacilityOwner,
    FacilityType
} from "../types/model-types";

type Props = {
    handleNextForTabs: Function,
    changeFacilityName: Function,
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>,
    facilityOwners: Array<FacilityOwner>,
    facilityTypes: Array<FacilityType>
};

type State = {
    facilityNameValue: string,
    commonNameValue: string
};

class FacilityBasicDetails extends Component<Props, State> {
    state = {
        facilityNameValue: "",
        commonNameValue: ""
    };
    formSubmitted(e) {
        alert(this.state.commonNameValue);
        e.preventDefault();
    }
    render() {
        let facilityOwnerOptions;

        if (this.props.facilityOwners.length > 0) {
            facilityOwnerOptions = this.props.facilityOwners.map(fo => (
                <option value={fo.id}>{fo.facility_owner}</option>
            ));
        }

        let operationalStatusOptions;

        if (this.props.operationalStatuses.length > 0) {
            operationalStatusOptions = this.props.operationalStatuses.map(o => (
                <option value={o.id}>{o.facility_operational_status}</option>
            ));
        }

        let regulatoryStatusOptions;

        if (this.props.regulatoryStatuses.length > 0) {
            regulatoryStatusOptions = this.props.regulatoryStatuses.map(reg => (
                <option value={reg.id}>{reg.facility_regulatory_status}</option>
            ));
        }

        let facilityTypeOptions;

        if (this.props.facilityTypes.length > 0) {
            facilityTypeOptions = this.props.facilityTypes.map(ft => (
                <option value={ft.id}>{ft.facility_type}</option>
            ));
        }

        return (
            <div>
                <div class="row">
                    <form onSubmit={e => this.formSubmitted(e)} class="col s12">
                        <div class="row">
                            <div class="input-field col s6 ">
                                <input
                                    id="facility_name"
                                    type="text"
                                    class="validate"
                                    value={this.state.facilityNameValue}
                                    onChange={e =>
                                        this.setState({
                                            facilityNameValue: e.target.value
                                        })
                                    }
                                    // onChange={e =>
                                    //     this.props.changeFacilityName(e)
                                    // }
                                />
                                <label for="facility_name">Facility Name</label>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Operational Status
                                    </option>
                                    {operationalStatusOptions}
                                </Input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input
                                    id="common_name"
                                    type="text"
                                    class="validate"
                                    value={this.state.commonNameValue}
                                    onChange={e =>
                                        this.setState({
                                            commonNameValue: e.target.value
                                        })
                                    }
                                />
                                <label for="facility_name">Common Name</label>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input s={12} type="select" defaultValue="0">
                                    <option value="0">
                                        Select Facility Type
                                    </option>
                                    {facilityTypeOptions}
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
                                    {regulatoryStatusOptions}
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
