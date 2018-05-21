//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row, Button } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker, FormWizardNavigation } from '../../common';
import { BasicDetailsFormProps } from '../../types/helper-types';
import { Formik } from 'formik';
import { postFormData } from '../../actions';
import yup from 'yup';

class FacilityContactForm extends React.Component<{}> {

  REQUIRED_MESSAGE = "You can't leave this field blank";
  PHONE_MIN_MESSAGE = "What type of phone number is that?"
  INVALID_NUM_MESSAGE = "This is not a valid number"

  initialValues = {
    postalAddress: "",
    physicalAddress: null,
    contactName: "",
    contactEmail: "",
    contactPhoneNumber: "",
    catchmentArea: "",
    catchmentPopulation: 0,
    longitude: "",
    latitude: ""
  }

  schema = yup.object().shape({
    postalAddress: yup.string().min(5, "Postal Address is Too short").required(this.REQUIRED_MESSAGE),
    physicalAddress: yup.string().min(7, "Too short").nullable(),
    contactName: yup.string().min(5, "Contact Name is Too short").required(this.REQUIRED_MESSAGE),
    contactEmail: yup.string().email("Invalid Email Format").required(this.REQUIRED_MESSAGE),
    contactPhoneNumber: yup.string()
      .min(7, this.PHONE_MIN_MESSAGE)
      .max(10, this.PHONE_MIN_MESSAGE)
      .required(this.REQUIRED_MESSAGE),
    catchmentArea: yup.string().min(7, "Catchment Area is Too Short").required(this.REQUIRED_MESSAGE),
    catchmentPopulation: yup.number(this.INVALID_NUM_MESSAGE).positive().integer().required(this.REQUIRED_MESSAGE),
    longitude: yup.number().negative().integer().required(this.REQUIRED_MESSAGE),
    latitude: yup.number().positive().integer().required(this.REQUIRED_MESSAGE)
  })

  _handleChange = async (values, { setSubmitting, setErros }) => {
    await this.props.postFormData(
      { data: { ...values, client: 1 }, id: 1400 },
      "Facilities",
      "contactDetails",
      "POST",
      "POST_FACILITY_CONTACT_DETAILS"
    );
    setSubmitting(false);
    await console.log(this.props.response);
    if (this.props.response.response) this.props.onNext();
  }

  render() {
    return (
      <div>
        <div className="mfl-tm-2" />
        <Formik
          initialValues={this.initialValues}
          validate={this.validate}
          validationSchema={this.schema}
          onSubmit={this._handleChange}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
              <div>
                <Row>
                  <Input
                    s={6}
                    placeholder="Enter Facility Postal Address"
                    label="Enter Facility Postal Address"
                    labelClassName="mfl-max-width"
                    value={values.postalAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postalAddress && errors.postalAddress}
                    name="postalAddress"
                  />
                  <Input
                    s={6}
                    placeholder="Enter Facility Physical Address"
                    label="Enter Facility Physical Address"
                    labelClassName="mfl-max-width"
                    value={values.physicalAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.physicalAddress && errors.physicalAddress}
                    name="physicalAddress"
                  />
                </Row>
                <Row>
                  <Input
                    s={3}
                    placeholder="Enter Contact Person Name"
                    label="Enter Contact Person Name"
                    labelClassName="mfl-max-width"
                    value={values.contactName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contactName && errors.contactName}
                    name="contactName"
                  />
                  <Input
                    s={3}
                    placeholder="Enter Contact Person Phone Number"
                    label="Enter Contact Person Phone Number"
                    labelClassName="mfl-max-width"
                    value={values.contactPhoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contactPhoneNumber && errors.contactPhoneNumber}
                    name="contactPhoneNumber"
                  />
                  <Input
                    s={6}
                    placeholder="Enter Contact Person Email"
                    label="Enter Contact Person Email"
                    labelClassName="mfl-max-width"
                    value={values.contactEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contactEmail && errors.contactEmail}
                    name="contactEmail"
                  />
                </Row>
                <Row>
                  <Input
                    s={3}
                    placeholder="Enter Catchment Area"
                    label="Enter Catchment Area"
                    labelClassName="mfl-max-width"
                    value={values.catchmentArea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.catchmentArea && errors.catchmentArea}
                    name="catchmentArea"
                  />
                  <Input
                    s={3}
                    placeholder="Enter Estimated Catchment Population"
                    label="Enter Estimated Catchment Population"
                    labelClassName="mfl-max-width"
                    value={values.catchmentPopulation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.catchmentPopulation && errors.catchmentPopulation}
                    name="catchmentPopulation"
                  />
                  <Input
                    s={3}
                    placeholder="Enter Facility Longitude"
                    label="Enter Facility Longitude"
                    labelClassName="mfl-max-width"
                    value={values.longitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.longitude && errors.longitude}
                    name="longitude"
                  />
                  <Input
                    s={3}
                    placeholder="Enter Facility Latitude"
                    label="Enter Facility Latitude"
                    labelClassName="mfl-max-width"
                    value={values.latitude}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.latitude && errors.latitude}
                    name="latitude"
                  />
                </Row>
                < FormWizardNavigation
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    response: state.facilities.contactDetailsResponse,
  }
}

export default connect(mapStateToProps, {
  postFormData
})(FacilityContactForm);
