//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem } from "react-materialize";
import { connect } from "react-redux";
import FacilityAddFooter from "./FacilityAddFooter";
import { addFormValues } from "../actions";
import {
    RegulatoryStatus,
    OperationalStatus,
    FacilityOwner,
    FacilityType
} from "../types/model-types";

type Props = {
    handleNextForTabs: Function,
    facilityName: string,
    facilityNameError: string,
    commonName: string,
    OperationalStatus: string,
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>,
    facilityOwners: Array<FacilityOwner>,
    facilityTypes: Array<FacilityType>
};

class FacilityBasicDetails extends Component<Props> {
    componentWillReceiveProps(props) {
        alert(props.facilityNameError);
    }
    async formSubmitted(e) {
        await alert(this.props.commonName);
        e.preventDefault();
    }

    validation(e) {
        if (e.target.value.split("").length <= 3) {
            const error = "Name must be more than 3 characters";
            console.log(e.target.value.split("").length);
            this.props.addFormValues(error, "FACILITY_NAME_ERROR");
        } else {
            ("");
        }
        this.props.addFormValues(e.target.value, "FACILITY_NAME");
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
                                    name="facility_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.facilityName}
                                    onChange={e => this.validation(e)}
                                    placeholder="Facility Name"
                                />

                                <span className="red-text">
                                    {this.props.facilityNameError}
                                </span>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input
                                    s={12}
                                    type="select"
                                    defaultValue={`"${
                                        this.props.operationalStatus
                                    }"`}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e,
                                            "OPERATIONAL_STATUS"
                                        )
                                    }
                                >
                                    <option
                                        value={`"${
                                            this.props.operationalStatus
                                        }"`}
                                    >
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
                                    value={this.props.commonName}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e,
                                            "COMMON_NAME"
                                        )
                                    }
                                />
                                <span className="red-text">
                                    Name is too short
                                </span>
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

const mapStateToProps = state => {
    return {
        facilityName: state.formValues.facilityName,
        facilityNameError: state.formValues.facilityNameError,
        commonName: state.formValues.commonName,
        operationalStatus: state.formValues.operationalStatus
    };
};

export default connect(mapStateToProps, { addFormValues })(
    FacilityBasicDetails
);
