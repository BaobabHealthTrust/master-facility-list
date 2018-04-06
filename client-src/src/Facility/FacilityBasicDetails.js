//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem } from "react-materialize";
import { connect } from "react-redux";
import FacilityAddFooter from "./FacilityAddFooter";
import { addFormValues, postFormData } from "../actions";
import {
    RegulatoryStatus,
    OperationalStatus,
    FacilityOwner,
    FacilityType
} from "../types/model-types";
import validateFunction from "./validation";

type Props = {
    handleNextForTabs: Function,
    handleCancel: Function,
    addFormValues: Function,
    postFormData: Function,
    facilityName: string,
    facilityNameError: string,
    commonNameError: string,
    commonName: string,
    operationalStatus: string,
    dateOpened: Date,
    regulatoryStatus: string,
    facilityType: string,
    facilityOwner: string,
    regulatoryStatuses: Array<RegulatoryStatus>,
    operationalStatuses: Array<OperationalStatus>,
    facilityOwners: Array<FacilityOwner>,
    facilityTypes: Array<FacilityType>,
    registrationNumber: string,
    registrationNumberError: string,
    postResponse: {}
};
 
class FacilityBasicDetails extends Component<Props> {
    submitCreateBasicData = async () => {
        const data = {
            facility_code: this.props.registrationNumber,
            facility_name: this.props.facilityName,
            common_name: this.props.commonName,
            facility_date_opened: this.props.dateOpened,
            facility_type_id: this.props.facilityType,
            facility_owner_id: this.props.facilityOwner,
            facility_operational_status_id: this.props.operationalStatus,
            facility_regulatory_status_id: this.props.regulatoryStatus,
            district_id: 1,
            client_id: 1,
            clientId: 1
        };
        const token = sessionStorage.getItem("token");
        const resource = "/Facilities";
        const method = "post";
        const actionName = "POST_FORM_BASIC_DATA";
       if(this.props.error.length === 0) {
        await this.props.postFormData(
            data,
            resource,
            method,
            actionName,
            token
        );
        if (this.props.postResponse.basicResponse.status === 200) {
            this.props.handleNextForTabs("Contacts and Locations");
        }
      }
    }
    
    componentWillMount(){
        let facilityDetailsData = [];
            this.props.isEditBasic && (
            facilityDetailsData =[
            {value: this.props.facilityNameValue, actionType: "FACILITY_NAME"},
            {value: this.props.commonNameValue, actionType: "COMMON_NAME"},
            {value: this.props.facilityCodeValue, actionType: "REGISTRATION_NUMBER"},
            {value: this.props.dateOpenedValue, actionType: "DATE_OPENED"},
            {value: this.props.operationalStatusValue, actionType: "OPERATIONAL_STATUS"},
            {value: this.props.regulatoryStatusValue, actionType: "REGULATORY_STATUS"},
            {value: this.props.facilityTypeValue, actionType: "FACILITY_TYPE"},
            {value: this.props.facilityOwnerValue, actionType: "FACILITY_OWNER"}],
            facilityDetailsData.map(detail=>this.props.addFormValues(detail.value,detail.actionType)));
    }


    validation(e) {
        const values = validateFunction(e);
        this.props.addFormValues(values.error, values.actionTypeError);
        this.props.addFormValues(e.target.value, values.actionType);
    }

    render() {
        let facilityOwnerOptions;

        if (this.props.facilityOwners.length > 0) {
            facilityOwnerOptions = this.props.facilityOwners.map(fo => (
                <option 
                   selected={fo.id === this.props.facilityOwner ? true : false}
                   key={fo.id}                
                   value={fo.id}
                >
                {fo.facility_owner}
                </option>
            ));
        }

        let operationalStatusOptions;

        if (this.props.operationalStatuses.length > 0) {
            operationalStatusOptions = this.props.operationalStatuses.map(o => (
                <option 
                  selected={o.id === this.props.operationalStatus ? true : false}
                  key={o.id}                
                  value={o.id}
                >
                 {o.facility_operational_status}
                </option>
            ));
        }

        let regulatoryStatusOptions;

        if (this.props.regulatoryStatuses.length > 0) {
            regulatoryStatusOptions = this.props.regulatoryStatuses.map(reg => (
                <option
                   selected={reg.id === this.props.regulatoryStatus ? true : false}
                   key={reg.id}                
                   value={reg.id}
                >
                  {reg.facility_regulatory_status}
                </option>
            ));
        }

        let facilityTypeOptions;

        if (this.props.facilityTypes.length > 0) {
            facilityTypeOptions = this.props.facilityTypes.map(ft => (
                <option
                   selected={ft.id === this.props.facilityType ? true : false}
                   key={ft.id}                
                   value={ft.id}
                >
                    {ft.facility_type}
                </option>
            ));
        }

        return (
            <div>
                <div class="row">
                    <form
                        class="col s12"
                    >
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
                                    required
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
                                            e.target.value,
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
                                    name="common_name"
                                    type="text"
                                    class="validate"
                                    value={this.props.commonName}
                                    onChange={e => this.validation(e)}
                                    placeholder="Common Name"
                                    required
                                />
                                <span className="red-text">
                                    {this.props.commonNameError}
                                </span>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input
                                    s={12}
                                    type="select"
                                    defaultValue={`"${
                                        this.props.facilityType
                                    }"`}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e.target.value,
                                            "FACILITY_TYPE"
                                        )
                                    }
                                >
                                    <option
                                        value={`"${this.props.facilityType}"`}
                                    >
                                        Select Facility Type
                                    </option>
                                    {facilityTypeOptions}
                                </Input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <Input
                                    name="date_opened"
                                    type="date"
                                    value={this.props.dateOpened}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e.target.value,
                                            "DATE_OPENED"
                                        )
                                    }
                                    required

                                />
                                <label for="facility_name">
                                    Select Date Opened
                                </label>
                            </div>
                            <div className="input-field col s6 mfl-select-tab">
                                <Input
                                    s={12}
                                    type="select"
                                    defaultValue={`"${
                                        this.props.regulatoryStatus
                                    }"`}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e.target.value,
                                            "REGULATORY_STATUS"
                                        )
                                    }
                                >
                                    <option
                                        value={`"${
                                            this.props.regulatoryStatus
                                        }"`}
                                    >
                                        Select Regulatory Status
                                    </option>
                                    {regulatoryStatusOptions}
                                </Input>
                            </div>
                        </div>
                        <div class="row">
                            <div className="input-field col s6 mfl-select-tab">
                                <Input
                                    s={12}
                                    type="select"
                                    defaultValue={`"${
                                        this.props.facilityOwner
                                    }"`}
                                    onChange={e =>
                                        this.props.addFormValues(
                                            e.target.value,
                                            "FACILITY_OWNER"
                                        )
                                    }
                                >
                                    <option
                                        value={`"${this.props.facilityOwner}"`}
                                    >
                                        Select Facility Owner
                                    </option>
                                    {facilityOwnerOptions}
                                </Input>
                            </div>
                            <div class="input-field col s6">
                                <input
                                    id="registration_number"
                                    name="registration_number"
                                    type="text"
                                    class="validate"
                                    value={this.props.registrationNumber}
                                    onChange={e => this.validation(e)}
                                    placeholder="Registration Number"
                                    required
                                />
                                <span className="red-text">
                                    {this.props.registrationNumberError}
                                </span>
                            </div>
                        </div>
                        <FacilityAddFooter
                            tabName={"Basic"}
                            isEditFacility={this.props.isEditBasic}
                            submitFormData={this.props.isEditBasic? this.props.submitBasicData: this.submitCreateBasicData}
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
        facilityName: state.formValues.facilityName,
        facilityNameError: state.formValues.facilityNameError,
        commonNameError: state.formValues.commonNameError,
        error: state.formValues.error,
        commonName: state.formValues.commonName,
        operationalStatus: state.formValues.operationalStatus,
        regulatoryStatus: state.formValues.regulatoryStatus,
        facilityType: state.formValues.facilityType,
        facilityOwner: state.formValues.facilityOwner,
        dateOpened: state.formValues.dateOpened,
        registrationNumber: state.formValues.registrationNumber,
        registrationNumberError: state.formValues.registrationNumberError,
        postResponse: state.postResponse,
    };
};

export default connect(mapStateToProps, { addFormValues, postFormData })(
    FacilityBasicDetails
);
