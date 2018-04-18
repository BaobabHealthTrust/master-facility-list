//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker } from '../../common'
import { addFormValues, postFormData } from "../../actions";
import { BasicDetailsFormProps } from '../../types/helper-types'
import validateFunction from "./validation";
import Divider from "react-materialize/lib/Divider";

class FacilityBasicDetails extends Component<BasicDetailsFormProps> {
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
        if (this.props.error.length === 0) {
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

    componentWillMount() {
        let facilityDetailsData = [];
        this.props.isEditBasic && (
            facilityDetailsData = [
                { value: this.props.facilityNameValue, actionType: "FACILITY_NAME" },
                { value: this.props.commonNameValue, actionType: "COMMON_NAME" },
                { value: this.props.facilityCodeValue, actionType: "REGISTRATION_NUMBER" },
                { value: this.props.dateOpenedValue, actionType: "DATE_OPENED" },
                { value: this.props.operationalStatusValue, actionType: "OPERATIONAL_STATUS" },
                { value: this.props.regulatoryStatusValue, actionType: "REGULATORY_STATUS" },
                { value: this.props.facilityTypeValue, actionType: "FACILITY_TYPE" },
                { value: this.props.facilityOwnerValue, actionType: "FACILITY_OWNER" }],
            facilityDetailsData.map(detail => this.props.addFormValues(detail.value, detail.actionType)));
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
                <div className="mfl-tm-2" />
                <Row>
                    <Input s={6} placeholder="Enter Facility Name" label="Enter Facility Name" />
                    <Input s={6} type='select' label="Select Operational Status">
                        {operationalStatusOptions}
                    </Input>
                </Row>
                <Row>
                    <Input s={6} placeholder="Enter Facility Common Name" label="Enter Facility Common Name" />
                    <Input s={6} type='select' label="Select Facility Type">
                        {facilityTypeOptions}
                    </Input>
                </Row>
                <Row>
                    <DatePicker suffix="Opened" />
                    <Input s={6} type='select' label="Select Facility Regulatory Status">
                        {regulatoryStatusOptions}
                    </Input>
                </Row>
                <Row>
                    <Input s={6} type='select' label='Select Facility Owner'>
                        {facilityOwnerOptions}
                    </Input>
                    <Input s={6} placeholder='Enter Registration Number' label='Enter Registration Number' />
                </Row>
            </div >
        )
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
