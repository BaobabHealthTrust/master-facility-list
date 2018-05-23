//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row, Button } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker, FormWizardNavigation } from '../../common';
import { BasicDetailsFormProps } from '../../types/helper-types';
import { Formik } from 'formik';
import { postFormData } from '../../actions';
import yup from 'yup';
import { renderOptions } from './helpers';
import { Resource, ResourceType, FacilityResource } from '../../types/model-types';

type Props = {
  response: any,
  resourceTypes: Array<ResourceType>,
  resources: Array<Resource>,
  onNext: Function
}

class ResourcesForm extends React.Component<Props, Array<FacilityResource>> {

  state = {
    facilityResources: []
  }

  REQUIRED_MESSAGE = "You can't leave this field blank";
  INVALID_NUM_MESSAGE = "This is not a valid number";

  initialValues = this.props.resources.reduce((acc, resource) => {
    return acc[resource.id];
  }, {})

  componentDidMount() {
    const facilityResources = this.props.resources.map(r => {
      return {
        facility_id: 1240,
        resource_id: r.id,
        quantity: 0,
        description: ""
      }
    })
    this.setState({ facilityResources });
  }

  _handleSubmit = async (values, { setSubmitting, setErros }) => {
    // await this.props.postFormData(
    //   { data: { ...values, client: 1 }, id: 1400 },
    //   "Facilities",
    //   "contactDetails",
    //   "POST",
    //   "POST_FACILITY_CONTACT_DETAILS"
    // );
    setSubmitting(false);
    await console.log(this.props.response);
    if (this.props.response.response) this.props.onNext();
  }

  _filteredResources = (typeId) => {
    return this.props.resources.filter(r => r.resource_type_id === typeId);
  }

  changeQuantity = (id, quantity) => {
    const facilityResourceIndex = this.state.facilityResources.findIndex(r => r.resource_id == id);
    const withoutIndexed = this.state.facilityResources.filter((r, i) => i != facilityResourceIndex);
    const facilityResources = [...withoutIndexed, {
      facility_id: 1240,
      resource_id: id,
      quantity: Number(quantity),
      description: ""
    }]
    this.setState({ facilityResources });
  }

  render() {
    return (
      <div>
        <div className="mfl-tm-2" />
        <Formik
          validate={this.validate}
          validationSchema={this.schema}
          onSubmit={this._handleSubmit}
          render={({
            errors,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
              <div>
                <Row>
                  {
                    this.props.resourceTypes.map(type => {
                      return this._filteredResources(type.id).map(resource => {
                        return (
                          <Input
                            s={3}
                            placeholder={`Enter Total ${resource.resource_name}`}
                            label={`Enter Total ${resource.resource_name}`}
                            onChange={(e) => this.changeQuantity(resource.id, e.target.value)}
                            onBlur={handleBlur}
                          />
                        )
                      })
                    })
                  }
                  {console.log(this.schema)}
                </Row>
              </div>
              // <div>
              //   <Row>
              //     <Input
              //       s={3}
              //       type="select"
              //       label="Select Resource Type"
              //       onChange={(e) => this.setState({ selectedResourceType: e.target.value })}
              //     >
              //       {renderOptions(this.props.resourceTypes, "resource_type", )}
              //     </Input>
              //     <Input
              //       s={3}
              //       type="select"
              //       label="Select Resource"
              //     >
              //       {
              //         renderOptions(this._filteredResources(), "resource_name")}
              //     </Input>
              //   </Row>
              //   <Row>
              //     <Input
              //       s={3}
              //       placeholder="Enter Contact Person Name"
              //       label="Enter Contact Person Name"
              //       labelClassName="mfl-max-width"
              //       value={values.contactName}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       error={touched.contactName && errors.contactName}
              //       name="contactName"
              //     />
              //     <Input
              //       s={3}
              //       placeholder="Enter Contact Person Phone Number"
              //       label="Enter Contact Person Phone Number"
              //       labelClassName="mfl-max-width"
              //       value={values.contactPhoneNumber}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       error={touched.contactPhoneNumber && errors.contactPhoneNumber}
              //       name="contactPhoneNumber"
              //     />
              //     <Input
              //       s={6}
              //       placeholder="Enter Contact Person Email"
              //       label="Enter Contact Person Email"
              //       labelClassName="mfl-max-width"
              //       value={values.contactEmail}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       error={touched.contactEmail && errors.contactEmail}
              //       name="contactEmail"
              //     />
              //   </Row>
              //   <Row>
              //     <Input
              //       s={3}
              //       placeholder="Enter Catchment Area"
              //       label="Enter Catchment Area"
              //       labelClassName="mfl-max-width"
              //       value={values.catchmentArea}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       error={touched.catchmentArea && errors.catchmentArea}
              //       name="catchmentArea"
              //     />
              //     <Input
              //       s={3}
              //       placeholder="Enter Estimated Catchment Population"
              //       label="Enter Estimated Catchment Population"
              //       labelClassName="mfl-max-width"
              //       value={values.catchmentPopulation}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       error={touched.catchmentPopulation && errors.catchmentPopulation}
              //       name="catchmentPopulation"
              //     />
              //     <Input
              //       s={3}
              //       placeholder="Enter Facility Longitude"
              //       label="Enter Facility Longitude"
              //       labelClassName="mfl-max-width"
              //       value={values.longitude}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       error={touched.longitude && errors.longitude}
              //       name="longitude"
              //     />
              //     <Input
              //       s={3}
              //       placeholder="Enter Facility Latitude"
              //       label="Enter Facility Latitude"
              //       labelClassName="mfl-max-width"
              //       value={values.latitude}
              //       onChange={handleChange}
              //       onBlur={handleBlur}
              //       error={touched.latitude && errors.latitude}
              //       name="latitude"
              //     />
              //   </Row>
              //   < FormWizardNavigation
              //     handleSubmit={handleSubmit}
              //     isSubmitting={isSubmitting}
              //   />
              // </div>
            )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    response: state.facilities.resourcesResponse,
    resourceTypes: state.dependancies.resourceTypes,
    resources: state.facilities.resources
  }
}

export default connect(mapStateToProps, {
  postFormData
})(ResourcesForm);
