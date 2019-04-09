//@flow
import React, { Component } from "react";
import { Input, Row } from "react-materialize";
import { DatePicker, FormWizardNavigation } from "../../../common";
import { BasicDetailsFormProps } from "../../../types/helper-types";
import { basicSchema } from "../Forms/schema";
import { Formik } from "formik";
import styled from "styled-components";
import _ from "lodash";
import { renderOptions } from "../../helpers/utilities";

const Container = styled.div.attrs({
  className: "container"
})``;

class FacilityBasicDetails extends Component<BasicDetailsFormProps> {
  componentWillReceiveProps(nextProp) {
    if (nextProp.initalValues != this.props.initalValues)
      this.initalValues = nextProp.initalValues;
  }

  initalValues = {
    facilityName: null,
    commonName: null,
    operationalStatus: null,
    district: null,
    facilityType: null,
    regulatoryStatus: null,
    facilityOwner: null,
    dateOpened: "1975-01-01",
    registrationNumber: null,
    publishedDate: null
  };

  _onNext = async (values, { setSubmitting, setErrors }) => {
    let errors = await this.props.onSubmit({
      ...values
    });
    if (!_.isEmpty(errors)) {
      setErrors({
        facilityName: errors.facility_name ? errors.facility_name[0] : "",
        commonName: errors.common_name ? errors.common_name[0] : "",
        registrationNumber: errors.registration_number
          ? errors.registration_number[0]
          : ""
      });
    }
    setSubmitting(false);
  };

  _renderForm = props => {
    let {
      values,
      errors,
      handleChange,
      handleSubmit,
      touched,
      handleBlur,
      isSubmitting,
      setFieldValue
    } = props;
    return (
      <div test-id="basicDetailsForm">
        <div className="mfl-tm-2" />
        <Row>
          <Input
            s={6}
            value={values.facilityName}
            name="facilityName"
            labelClassName="mfl-max-width"
            label="Facility Name"
            placeholder="Enter Facility Name"
            error={touched.facilityName && errors.facilityName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            s={6}
            value={values.commonName}
            name="commonName"
            labelClassName="mfl-max-width"
            label="Common Name"
            placeholder="Enter Common Name"
            error={touched.commonName && errors.commonName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Row>
        <Row>
          <Input
            s={6}
            type="select"
            label="Select Facility Type"
            onChange={e => setFieldValue("facilityType", e.target.value)}
            value={values.facilityType}
            name="facilityType"
          >
            {renderOptions(this.props.facilityTypes, "facility_type")}
          </Input>
          <Input
            s={6}
            type="select"
            onChange={e => setFieldValue("operationalStatus", e.target.value)}
            label="Select Operational Status"
            value={values.operationalStatus}
            name="operationalStatus"
          >
            {renderOptions(
              this.props.operationalStatuses,
              "facility_operational_status"
            )}
          </Input>
        </Row>
        <Row>
          <Input
            s={6}
            type="select"
            onChange={e => setFieldValue("regulatoryStatus", e.target.value)}
            label="Select Facility Regulatory Status"
            name="regulatoryStatus"
            value={values.regulatoryStatus}
          >
            {renderOptions(
              this.props.regulatoryStatuses,
              "facility_regulatory_status"
            )}
          </Input>
          <Input
            s={3}
            type="select"
            onChange={e => setFieldValue("facilityOwner", e.target.value)}
            label="Select Facility Owner"
            value={values.facilityOwner}
            name="facilityOwner"
          >
            {renderOptions(this.props.facilityOwners, "facility_owner")}
          </Input>
          <Input
            s={3}
            type="select"
            onChange={e => setFieldValue("district", e.target.value)}
            label="Select Facility District"
            value={values.district}
            name="facilitDistrict"
          >
            {renderOptions(this.props.districts, "district_name")}
          </Input>
        </Row>
        <Row>
          <DatePicker
            suffix="Opened"
            year={
              !this.props.fromAdd &&
              values.dateOpened &&
              values.dateOpened.split("-")[0]
            }
            month={
              !this.props.fromAdd &&
              values.dateOpened &&
              values.dateOpened.split("-")[1]
            }
            day={
              !this.props.fromAdd &&
              values.dateOpened &&
              values.dateOpened.split("-")[2]
            }
            onChange={date => setFieldValue("dateOpened", date)}
          />
          <Input
            s={6}
            label="Registration Number"
            placeholder="Enter Registration Number"
            name="registrationNumber"
            labelClassName="mfl-max-width"
            value={values.registrationNumber}
            error={touched.registrationNumber && errors.registrationNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Row>
        <FormWizardNavigation
          saveButton={this.props.fromAdd ? "Next" : "Save"}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          handleCancel={() => this.props.cancel()}
        />
      </div>
    );
  };

  render() {
    return (
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={this.initalValues}
          validationSchema={basicSchema}
          onSubmit={this._onNext}
          render={props => this._renderForm(props)}
        />
      </Container>
    );
  }
}
export default FacilityBasicDetails;
