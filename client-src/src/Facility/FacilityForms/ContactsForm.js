//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row, Button } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker, FormWizardNavigation } from '../../common';
import { CurrentFacility } from '../../types/helper-types';
import { Formik } from 'formik';
import { postFormData } from '../../actions';
import { Redirect } from 'react-router-dom';
import yup from 'yup';
import { Card, CardTitle, Table, Icon, Col } from 'react-materialize';
import { confirmAlert } from 'react-confirm-alert';

type Props = {
  response: any,
  postFormData: Function,
  current: CurrentFacility,
  fromAdd: ?boolean
}
class FacilityContactForm extends React.Component<Props> {

  state = {
    cancelForm: false
  }

  REQUIRED_MESSAGE = "You can't leave this field blank";
  PHONE_MIN_MESSAGE = "What type of phone number is that?"
  INVALID_NUM_MESSAGE = "This is not a valid number"

  initialValues = {
    postalAddress: this.props.fromAdd
      ? ""
      : this.props.current.addresses.postal_address,
    physicalAddress: this.props.fromAdd
      ? ""
      : this.props.current.addresses.physical_address,
    contactName: this.props.fromAdd
      ? ""
      : this.props.current.contactPeople.contact_person_fullname,
    contactEmail: this.props.fromAdd
      ? ""
      : this.props.current.contactPeople.contact_person_email,
    contactPhoneNumber: this.props.fromAdd
      ? ""
      : this.props.current.contactPeople.contact_person_phone,
    catchmentArea: this.props.fromAdd
      ? ""
      : this.props.current.locations.catchment_area,
    catchmentPopulation: this.props.fromAdd
      ? 0
      : this.props.current.locations.catchment_population,
    longitude: this.props.fromAdd
      ? ""
      : this.props.current.geolocations.longitude,
    latitude: this.props.fromAdd
      ? ""
      : this.props.current.geolocations.latitude
  }

  schema = yup.object().shape({
    postalAddress: yup
      .string()
      .min(5, "Postal Address is Too short")
      .required(this.REQUIRED_MESSAGE),
    physicalAddress: yup
      .string()
      .min(5, "Physical address is Too short")
      .required(this.REQUIRED_MESSAGE),
    contactName: yup.string().min(5, "Contact Name is Too short").required(this.REQUIRED_MESSAGE),
    contactEmail: yup.string().email("Invalid Email Format").required(this.REQUIRED_MESSAGE),
    contactPhoneNumber: yup.string()
      .min(7, this.PHONE_MIN_MESSAGE)
      .max(10, this.PHONE_MIN_MESSAGE)
      .required(this.REQUIRED_MESSAGE),
    catchmentArea: yup.string()
      .min(7, "Catchment Area is Too Short")
      .required(this.REQUIRED_MESSAGE),
    catchmentPopulation: yup.number(this.INVALID_NM_MESSAGE)
      .positive()
      .integer()
      .required(this.REQUIRED_MESSAGE),
    longitude: yup.number(this.INVALID_NUM_MESSAGE)
      .positive()
      .required(this.REQUIRED_MESSAGE),
    latitude: yup.number(this.INVALID_NUM_MESSAGE).negative().required(this.REQUIRED_MESSAGE)
  })

  _onClick = async (onClose, values, setSubmitting, setErros, e) => {
    const endpoiint = this.props.fromAdd ? "contactDetails" : "updateContactDetails"
    const facilityId = this.props.fromAdd ? (this.props.facility.id || 1) : Number(this.props.match.params.id)

    await this.props.postFormData(
      { data: { ...values, client: 1 }, id: facilityId },
      "Facilities",
      "POST",
      "POST_FACILITY_CONTACT_DETAILS",
      endpoiint,
      ""
    );

    setSubmitting(false);
    if (this.props.response.response && this.props.fromAdd) this.props.onNext();
    if (this.props.response.response && !this.props.fromAdd) this.setState({ cancelForm: true });
    onClose()
  }

  _handleChange = async (values, { setSubmitting, setErros }) => {
    if(!this.props.fromAdd){
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <Col m={6} s={12} style={{ minWidth: '400px' }}>
              <Card
                title='Confirm'
                className='blu darken-4'
                textClassName='white-tex'
                actions={
                  [
                    <Button onClick={onClose} className="mfl-rm-2 btn-flat">No</Button>,
                    <Button className="btn-flat"
                      onClick={this._onClick.bind(this, onClose, values, setSubmitting, setErros)}
                    >
                      Yes
                    </Button>
                  ]
                }>
                Are you sure you want to save these changes?
              </Card>
            </Col>
          )
        }
      })
    }
  }

  render() {
    return (
      <div className="container">
        {(this.state.cancelForm && this.props.fromAdd) && <Redirect to='/facilities' />}
        {
          (this.state.cancelForm && !this.props.fromAdd) &&
          <Redirect to={`/facilities/${this.props.match.params.id}/locations`} />
        }
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
                  saveButton={this.props.fromAdd ? 'Next' : 'Save'}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  handleCancel={() => this.setState({ cancelForm: true })}
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
    current: state.facilities.currentDetails
  }
}

export default connect(mapStateToProps, {
  postFormData
})(FacilityContactForm);
