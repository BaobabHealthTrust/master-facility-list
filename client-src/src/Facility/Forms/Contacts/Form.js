import React from "react";
import { Input, Row } from "react-materialize";
import { FormWizardNavigation } from "../../../common";
import styled from "styled-components";

const FormWrapper = styled.div`
  padding: 3rem;
`;

export function Form(props) {
  let {
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
      <FormWrapper>
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
            label="Facility Latitude"
            placeholder="Enter Facility Latitude"
            labelClassName="mfl-max-width"
            value={values.latitude}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.latitude && errors.latitude}
            name="latitude"
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
        </Row>
      </FormWrapper>
      <FormWizardNavigation
        saveButton={props.fromAdd ? "Next" : "Save"}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        handleCancel={() => props.cancel()}
      />
    </div>
  );
}
