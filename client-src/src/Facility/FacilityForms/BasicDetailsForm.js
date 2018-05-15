//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row, Button } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker, FormWizardNavigation } from '../../common';
import { BasicDetailsFormProps } from '../../types/helper-types';
import { Formik } from 'formik';
import { postFormData } from '../../actions';

class FacilityBasicDetails extends Component<BasicDetailsFormProps> {

    _renderOptions = (dependancy, entityName) => {
        return dependancy.map(entity => (
            <option
                key={entity.id}
                value={entity.id}
            >
                {entity[entityName]}
            </option>
        ))
    }

    initalValues = {
        facilityName: "",
        commonName: "",
        operationalStatus: this.props.operationalStatuses[0].id,
        district: this.props.districts[0].id,
        facilityType: this.props.facilityTypes[0].id,
        regulatoryStatus: this.props.regulatoryStatuses[0].id,
        facilityOwner: this.props.facilityOwners[0].id,
        dateOpened: "1975-01-01",
        registrationNumber: 0
    }

    validate = values => {
        let errors = {};
        if (values.facilityName.length < 5) errors.facilityName = "Invalid Facility Name"
        if (values.commonName.length < 5) errors.commonName = "Invalid Common Name"
        if (!/^[0-9]/i.test(values.registrationNumber))
            errors.registrationNumber = "Invalid Registration Number Format"
        if (values.registrationNumber.length < 8)
            errors.registrationNumber = "Invalid Registration Number Length"

        return errors
    }

    handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const data = {
            "registration_number": values.registrationNumber,
            "facility_name": values.facilityName,
            "common_name": values.commonName,
            "facility_date_opened": values.dateOpened,
            "facility_type_id": values.facilityType,
            "facility_owner_id": values.facilityOwner,
            "facility_operational_status_id": values.operationalStatus,
            "facility_regulatory_status_id": values.regulatoryStatus,
            "district_id": values.district,
            "client_id": 1
        }
        setSubmitting(true)
        await this.props.postFormData(
            data,
            "Facilities",
            "",
            "POST",
            "POST_FACILITY_BASIC_DETAILS"
        );
        setSubmitting(false);
        if (this.props.response.id) this.props.onNext();
    }

    render() {

        return (
            <div>
                <div className="mfl-tm-2" />
                <Formik
                    initialValues={this.initalValues}
                    validate={this.validate}
                    onSubmit={this.handleSubmit}
                    render={({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                    }) => (
                            <div>
                                <Row>
                                    <Input
                                        s={6}
                                        value={values.facilityName}
                                        name="facilityName"
                                        labelClassName="mfl-max-width"
                                        placeholder="Enter Facility Name"
                                        label="Enter Facility Name"
                                        error={errors.facilityName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        s={6}
                                        value={values.commonName}
                                        placeholder="Enter Facility Common Name"
                                        label="Enter Facility Common Name"
                                        labelClassName="mfl-max-width"
                                        onChange={handleChange}
                                        error={errors.commonName}
                                        name="commonName"
                                    />

                                </Row>
                                <Row>
                                    <Input
                                        s={6}
                                        type='select'
                                        label="Select Facility Type"
                                        onChange={(e) => setFieldValue("facilityType", e.target.value)}
                                        value={values.facilityType}
                                        name="facilityType"
                                    >
                                        {this._renderOptions(this.props.facilityTypes, "facility_type")}
                                    </Input>
                                    <Input
                                        s={6}
                                        type='select'
                                        onChange={(e) => setFieldValue("operationalStatus", e.target.value)}
                                        label="Select Operational Status"
                                        value={values.operationalStatus}
                                        name="operationalStatus"
                                    >
                                        {this._renderOptions(this.props.operationalStatuses, "facility_operational_status")}
                                    </Input>
                                </Row>
                                <Row>
                                    <Input
                                        s={6}
                                        type='select'
                                        onChange={(e) => setFieldValue("regulatoryStatus", e.target.value)}
                                        label="Select Facility Regulatory Status"
                                        name="regulatoryStatus"
                                        value={values.regulatoryStatus}
                                    >
                                        {this._renderOptions(this.props.regulatoryStatuses, "facility_regulatory_status")}
                                    </Input>
                                    <Input
                                        s={3}
                                        type='select'
                                        onChange={(e) => setFieldValue("facilityOwner", e.target.value)}
                                        label='Select Facility Owner'
                                        value={values.facilityOwner}
                                        name="facilityOwner"
                                    >
                                        {this._renderOptions(this.props.facilityOwners, "facility_owner")}
                                    </Input>
                                    <Input
                                        s={3}
                                        type='select'
                                        onChange={(e) => setFieldValue("district", e.target.value)}
                                        label='Select Facility District'
                                        value={values.district}
                                        name="facilitDistrict"
                                    >
                                        {this._renderOptions(this.props.districts, "district_name")}
                                    </Input>
                                </Row>
                                <Row>
                                    <DatePicker
                                        suffix="Opened"
                                        onChange={(date) => setFieldValue("dateOpened", date)}
                                    />
                                    <Input
                                        s={6}
                                        placeholder='Enter Registration Number'
                                        label='Enter Registration Number'
                                        name='registrationNumber'
                                        labelClassName="mfl-max-width"
                                        value={values.registrationNumber}
                                        error={errors.registrationNumber}
                                        onChange={handleChange}
                                    />
                                </Row>
                                <FormWizardNavigation
                                    handleSubmit={handleSubmit}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        )}
                />
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        regulatoryStatuses: state.dependancies.regulatoryStatuses,
        facilityOwners: state.dependancies.facilityOwners,
        facilityTypes: state.dependancies.facilityTypes,
        districts: state.dependancies.districts,
        operationalStatuses: state.dependancies.operationalStatuses,
        response: state.facilities.basicDetailsResponse,
    }
}

export default connect(mapStateToProps, {
    postFormData
})(FacilityBasicDetails);
