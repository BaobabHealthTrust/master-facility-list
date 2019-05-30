//@flow
import React, { Component } from "react";
import { Form } from "./Form";
import { BasicDetailsFormProps } from "../../../types/helper-types";
import { basicSchema } from "../schema";
import { Formik } from "formik";
import styled from "styled-components";
import { isEmpty } from "lodash";

class FacilityBasicDetails extends Component<BasicDetailsFormProps> {
  componentWillReceiveProps(nextProp) {
    if (nextProp.initalValues) this.initalValues = nextProp.initalValues;
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
    if (!isEmpty(errors)) {
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

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.initalValues}
        validationSchema={basicSchema}
        onSubmit={this._onNext}
        render={props => <Form {...this.props} {...props} />}
      />
    );
  }
}
export default FacilityBasicDetails;
