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
import { Resource, ResourceType, FacilityResource, Facility } from '../../types/model-types';

type Props = {
  response: any,
  resourceTypes: Array<ResourceType>,
  resources: Array<Resource>,
  onNext: Function,
  facility: Facility
}

class ResourcesForm extends React.Component<Props, Array<FacilityResource>> {

  REQUIRED_MESSAGE = "You can't leave this field blank";
  INVALID_NUM_MESSAGE = "This is not a valid number";

  initialValues = {}

  validate = values => {
    let errors = {};
    this.props.resources.forEach(resource => {
      const key = `resource_${resource.id}`;
      if (!values[key])
        errors[key] = this.REQUIRED_MESSAGE;
      else {
        if (!/^\d+$/.test(Number(values[key]))) errors[key] = this.INVALID_NUM_MESSAGE
        if (values[key].length == 0) errors[key] = this.REQUIRED_MESSAGE
      }
    })
    return errors;
  }


  // TODO: Get Client ID from Redux store
  //TODO: Add Loading states!

  _handleSubmit = async (values, { setSubmitting, setErros }) => {
    const data = this.props.resources.map(resource => {
      return {
        facility_id: this.props.facility.id || 1,
        client_id: 1,
        resource_id: resource.id,
        quantity: Number(values[`resource_${resource.id}`]),
        description: ""
      }
    })
    await this.props.postFormData(
      data,
      "FacilityResources",
      "POST",
      "POST_FACILITY_RESOURCES",
    );
    setSubmitting(false);
    await console.log(this.props.response);
    if (this.props.response.length > 0) this.props.onNext();
  }

  _filteredResources = (typeId) => {
    return this.props.resources.filter(r => r.resource_type_id === typeId);
  }

  render() {
    return (
      <div className="container">
        <div className="mfl-tm-2" />
        <Formik
          validate={this.validate}
          initialValues={this.initialValues}
          onSubmit={this._handleSubmit}
          render={({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[`resource_${resource.id}`]}
                            error={touched[`resource_${resource.id}`] && errors[`resource_${resource.id}`]}
                            name={`resource_${resource.id}`
                            }
                          />
                        )
                      })
                    })
                  }
                </Row>
                <FormWizardNavigation
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
    response: state.facilities.resourcesResponse,
    resourceTypes: state.dependancies.resourceTypes,
    resources: state.facilities.resources
  }
}

export default connect(mapStateToProps, {
  postFormData
})(ResourcesForm);
