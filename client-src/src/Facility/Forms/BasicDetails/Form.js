import React from "react";
import { Input, Row } from "react-materialize";
import { DatePicker, FormWizardNavigation } from "../../../common";
import { renderOptions } from "../../helpers/utilities";
import PropTypes from "prop-types";

export function Form(props) {
  let {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    isSubmitting,
    setFieldValue,
    facilityTypes,
    operationalStatuses,
    regulatoryStatuses,
    facilityOwners,
    districts
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
          {renderOptions(facilityTypes, "facility_type")}
        </Input>
        <Input
          s={6}
          type="select"
          onChange={e => setFieldValue("operationalStatus", e.target.value)}
          label="Select Operational Status"
          value={values.operationalStatus}
          name="operationalStatus"
        >
          {renderOptions(operationalStatuses, "facility_operational_status")}
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
          {renderOptions(regulatoryStatuses, "facility_regulatory_status")}
        </Input>
        <Input
          s={3}
          type="select"
          onChange={e => setFieldValue("facilityOwner", e.target.value)}
          label="Select Facility Owner"
          value={values.facilityOwner}
          name="facilityOwner"
        >
          {renderOptions(facilityOwners, "facility_owner")}
        </Input>
        <Input
          s={3}
          type="select"
          onChange={e => setFieldValue("district", e.target.value)}
          label="Select Facility District"
          value={values.district}
          name="facilitDistrict"
        >
          {renderOptions(districts, "district_name")}
        </Input>
      </Row>
      <Row>
        <DatePicker
          suffix="Opened"
          year={
            !props.fromAdd &&
            values.dateOpened &&
            values.dateOpened.split("-")[0]
          }
          month={
            !props.fromAdd &&
            values.dateOpened &&
            values.dateOpened.split("-")[1]
          }
          day={
            !props.fromAdd &&
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
        saveButton={props.fromAdd ? "Next" : "Save"}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        handleCancel={() => props.cancel()}
      />
    </div>
  );
}

Form.propTypes = {};
