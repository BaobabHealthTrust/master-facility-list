//@flow
import React from "react";
import { Input, Row } from "react-materialize";
import { FormWizardNavigation } from "../../../common";
import { CurrentFacility } from "../../../types/helper-types";
import styled from "styled-components";
import { contactSchema } from "../Forms/schema";
import { Formik } from "formik";
import _ from "lodash";

type Props = {
  response: any,
  postFormData: Function,
  current: CurrentFacility,
  fromAdd: ?boolean
};
const Container = styled.div.attrs({
  className: "container"
})``;

class FacilityContactForm extends React.Component<Props> {
  initalValues = {
    postalAddress: null,
    physicalAddress: null,
    contactName: null,
    contactEmail: null,
    contactPhoneNumber: null,
    catchmentArea: null,
    catchmentPopulation: null,
    longitude: null,
    latitude: null
  };

  _onNext = async (values, { setSubmitting, setErrors }) => {
    let errors = this.props.onSubmit({
      ...values
    });
    if (!_.isEmpty(errors)) {
      setErrors({
        postalAddress: errors.postal_address ? errors.postal_address[0] : "",
        physicalAddress: errors.physical_address
          ? errors.physical_address[0]
          : "",
        contactName: errors.contact_name ? errors.contact_name[0] : "",
        contactEmail: errors.contact_email ? errors.contact_email[0] : "",
        contactPhoneNumber: errors.contact_phone_number
          ? errors.contact_phone_number[0]
          : "",
        catchmentArea: errors.catchment_area ? errors.catchment_area[0] : "",
        catchmentPopulation: errors.catchment_population
          ? errors.catchment_population[0]
          : "",
        longitude: errors.longitude ? errors.longitude[0] : "",
        latitude: errors.latitude ? errors.latitude[0] : ""
      });
    }

    setSubmitting(false);
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.initalValues) this.initalValues = nextProp.initalValues;
  }

  _renderForm = props => {
    var {
      values,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      touched
    } = props;

    return (
      <div test-id="contactDetailsForm">
        <div className="mfl-tm-2" />
        <Row>
          <Input
            s={6}
            label="Facility Postal Address"
            placeholder="Enter Facility Postal Address"
            labelClassName="mfl-max-width"
            value={values.postalAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.postalAddress && errors.postalAddress}
            name="postalAddress"
          />
          <Input
            s={6}
            label="Facility Physical Address"
            placeholder="Enter Facility Physical Address"
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
            label="Contact Person Name"
            placeholder="Enter Contact Person Name"
            labelClassName="mfl-max-width"
            value={values.contactName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.contactName && errors.contactName}
            name="contactName"
          />
          <Input
            s={3}
            label="Contact Person Phone Number"
            placeholder="Enter Contact Person Phone Number"
            labelClassName="mfl-max-width"
            value={values.contactPhoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.contactPhoneNumber && errors.contactPhoneNumber}
            name="contactPhoneNumber"
          />
          <Input
            s={6}
            label="Contact Person Email"
            placeholder="Enter Contact Person Email"
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
            label="Catchment Area"
            placeholder="Enter Catchment Area"
            labelClassName="mfl-max-width"
            value={values.catchmentArea}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.catchmentArea && errors.catchmentArea}
            name="catchmentArea"
          />
          <Input
            s={3}
            label="Estimated Catchment Population"
            placeholder="Enter Estimated Catchment Population"
            labelClassName="mfl-max-width"
            value={values.catchmentPopulation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.catchmentPopulation && errors.catchmentPopulation}
            name="catchmentPopulation"
          />
          <Input
            s={3}
            label="Facility Longitude"
            placeholder="Enter Facility Longitude"
            labelClassName="mfl-max-width"
            value={values.longitude}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.longitude && errors.longitude}
            name="longitude"
          />
          <Input
            s={3}
            label="Facility Latitude"
            placeholder="Enter Facility Latitude"
            labelClassName="mfl-max-width"
            value={values.latitude}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.latitude && errors.latitude}
            name="latitude"
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
          validationSchema={contactSchema}
          onSubmit={this._onNext}
          render={props => this._renderForm(props)}
        />
      </Container>
    );
  }
}
export default FacilityContactForm;
