//@flow
import React, {Component} from "react";
import {Input, Navbar, NavItem, Row, Button} from "react-materialize";
import {connect} from "react-redux";
import {DatePicker, FormWizardNavigation} from "../../../common";
import {BasicDetailsFormProps} from "../../../types/helper-types";
import {Formik} from "formik";
import {postFormData, fetchCurrentDetails} from "../../../actions";
import {Redirect} from "react-router-dom";
import {Card, CardTitle, Table, Icon, Col} from "react-materialize";
import {confirmAlert} from "react-confirm-alert";
import moment from "moment";

class FacilityBasicDetails extends Component<BasicDetailsFormProps> {
  state = {
    cancelForm: false
  };

  _renderOptions = (dependancy, entityName) => {
    return dependancy.map(entity => (
      <option key={entity.id} value={entity.id}>
        {entity[entityName]}
      </option>
    ));
  };

  onClick = async (onClose, values, setSubmitting, e) => {
    let data = {
      registration_number: values.registrationNumber,
      facility_name: values.facilityName,
      common_name: values.commonName,
      facility_date_opened: values.dateOpened,
      facility_type_id: values.facilityType,
      facility_owner_id: values.facilityOwner,
      facility_operational_status_id: values.operationalStatus,
      facility_regulatory_status_id: values.regulatoryStatus,
      district_id: values.district,
      client_id: 1,
      updated_at: Date.now()
    };

    if (!this.props.fromAdd) {
      data = {
        ...data,
        published_date: values.publishedDate
      };
    }

    setSubmitting(true);
    const id = this.props.fromAdd ? null : this.props.match.params.id;
    const method = this.props.fromAdd ? "POST" : "PUT";
    await this.props.postFormData(
      data,
      "Facilities",
      method,
      "POST_FACILITY_BASIC_DETAILS",
      "",
      id
    );
    setSubmitting(false);

    if (this.props.response.id && this.props.fromAdd) {
      this.props.submitFacility(this.props.response);
      this.props.onNext();
    }

    if (this.props.response.id && !this.props.fromAdd) {
      this.setState({
        cancelForm: true
      });
    }

    onClose();
  };

  initalValues = {
    facilityName: this.props.fromAdd
      ? ""
      : this.props.currentFacility.facility_name,
    commonName: this.props.fromAdd
      ? ""
      : this.props.currentFacility.common_name,
    operationalStatus: this.props.fromAdd
      ? this.props.operationalStatuses[0].id
      : this.props.currentFacility.facility_operational_status_id,
    district: this.props.fromAdd
      ? this.props.districts[0].id
      : this.props.currentFacility.district_id,
    facilityType: this.props.fromAdd
      ? this.props.facilityTypes[0].id
      : this.props.currentFacility.facility_type_id,
    regulatoryStatus: this.props.fromAdd
      ? this.props.regulatoryStatuses[0].id
      : this.props.currentFacility.facility_regulatory_status_id,
    facilityOwner: this.props.fromAdd
      ? this.props.facilityOwners[0].id
      : this.props.currentFacility.facility_owner_id,
    dateOpened: "1975-01-01",
    registrationNumber: this.props.fromAdd
      ? 0
      : this.props.currentFacility.registration_number || 0,
    publishedDate: this.props.fromAdd
      ? null
      : this.props.currentFacility.published_date
  };

  // TODO: Update this validation to YUP
  validate = values => {
    let errors = {};
    if (values.facilityName.length < 3)
      errors.facilityName = "Invalid Facility Name";
    if (values.commonName.length < 3) errors.commonName = "Invalid Common Name";
    if (!/^\d+$/i.test(values.registrationNumber))
      errors.registrationNumber = "Invalid Registration Number Format";
    if (values.registrationNumber.length < 8)
      errors.registrationNumber = "Invalid Registration Number Length";

    return errors;
  };

  handleSubmit = async (values, {setSubmitting, setErrors}) => {
    if (!this.props.fromAdd) {
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <Col m={6} s={12} style={{minWidth: "400px"}}>
              <Card
                title="Confirm"
                className="blu darken-4"
                textClassName="white-tex"
                actions={[
                  <Button onClick={onClose} className="mfl-rm-2 btn-flat">
                    No
                  </Button>,
                  <Button
                    className="btn-flat"
                    onClick={this.onClick.bind(
                      this,
                      onClose,
                      values,
                      setSubmitting
                    )}
                  >
                    Yes
                  </Button>
                ]}
              >
                Are you sure you want save these changes?
              </Card>
            </Col>
          );
        }
      });
    }
  };

  render() {
    // TODO: Fetch your own dependancies in case you have been refreshed
    return (
      <div className="container">
        {this.state.cancelForm &&
          this.props.fromAdd && <Redirect to="/facilities" />}
        {this.state.cancelForm &&
          !this.props.fromAdd && (
            <Redirect
              to={`/facilities/${this.props.match.params.id}/summary`}
            />
          )}
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
                  error={touched.facilityName && errors.facilityName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  s={6}
                  value={values.commonName}
                  name="commonName"
                  placeholder="Enter Facility Common Name"
                  labelClassName="mfl-max-width"
                  label="Enter Facility Common Name"
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
                  {this._renderOptions(
                    this.props.facilityTypes,
                    "facility_type"
                  )}
                </Input>
                <Input
                  s={6}
                  type="select"
                  onChange={e =>
                    setFieldValue("operationalStatus", e.target.value)
                  }
                  label="Select Operational Status"
                  value={values.operationalStatus}
                  name="operationalStatus"
                >
                  {this._renderOptions(
                    this.props.operationalStatuses,
                    "facility_operational_status"
                  )}
                </Input>
              </Row>
              <Row>
                <Input
                  s={6}
                  type="select"
                  onChange={e =>
                    setFieldValue("regulatoryStatus", e.target.value)
                  }
                  label="Select Facility Regulatory Status"
                  name="regulatoryStatus"
                  value={values.regulatoryStatus}
                >
                  {this._renderOptions(
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
                  {this._renderOptions(
                    this.props.facilityOwners,
                    "facility_owner"
                  )}
                </Input>
                <Input
                  s={3}
                  type="select"
                  onChange={e => setFieldValue("district", e.target.value)}
                  label="Select Facility District"
                  value={values.district}
                  name="facilitDistrict"
                >
                  {this._renderOptions(this.props.districts, "district_name")}
                </Input>
              </Row>
              <Row>
                <DatePicker
                  suffix="Opened"
                  year={!this.props.fromAdd && values.dateOpened[0]}
                  month={!this.props.fromAdd && values.dateOpened[1]}
                  day={!this.props.fromAdd && values.dateOpened[2]}
                  onChange={date => setFieldValue("dateOpened", date)}
                />
                <Input
                  s={6}
                  placeholder="Enter Registration Number"
                  label="Enter Registration Number"
                  name="registrationNumber"
                  labelClassName="mfl-max-width"
                  value={values.registrationNumber}
                  error={
                    touched.registrationNumber && errors.registrationNumber
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Row>
              <FormWizardNavigation
                saveButton={this.props.fromAdd ? "Next" : "Save"}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                handleCancel={() => this.setState({cancelForm: true})}
              />
            </div>
          )}
        />
      </div>
    );
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
    currentFacility: state.facilities.currentDetails
  };
};

export default connect(
  mapStateToProps,
  {
    postFormData,
    fetchCurrentDetails
  }
)(FacilityBasicDetails);
