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
import { Redirect } from 'react-router-dom';
import { Resource, ResourceType, FacilityResource, Facility } from '../../types/model-types';

type Props = {
  response: any,
  resourceTypes: Array<ResourceType>,
  resources: Array<Resource>,
  onNext: Function,
  facility: Facility,
  fromAdd: Function,
  currentResources: Array<FacilityResource>
}

class ResourcesForm extends React.Component<Props, {}> {
  state = {
    cancelForm: false
  }

  REQUIRED_MESSAGE = "You can't leave this field blank";
  NO_VALUE_MESSAGE = "Please add this";
  INVALID_NUM_MESSAGE = "This is not a valid number";


  validate = values => {
    let errors = {};
    this.props.resources.forEach(resource => {
      const key = `resource_${resource.id}`;
      if (values[key] === null)
        errors[key] = this.NO_VALUE_MESSAGE;
      else {
        if (!/^\d+$/.test(Number(values[key]))) errors[key] = this.INVALID_NUM_MESSAGE
      }
    })
    console.log(errors);
    return errors;
  }

  _getInitialValues = () => {
    if (this.props.fromAdd) return {};

    let initialValues = {};

    this.props.currentResources.forEach(resource => {
      initialValues[`resource_${resource.resource_id}`] = resource.quantity
    })

    return initialValues
  }

  _getFacilityId = async () => {
    const facilityId = this.props.fromAdd
      ? (await this.props.facility.id || 1)
      : Number(await this.props.match.params.id)
    return facilityId;
  }
  // TODO: Get Client ID from Redux store
  //TODO: Add Loading states!

  _handleSubmit = async (values, { setSubmitting, setErros }) => {
    const id = await this._getFacilityId();
    const date = new Date();
    const data = this.props.resources.map(resource => {
      return {
        facility_id: id,
        client_id: 1,
        resource_id: resource.id,
        quantity: Number(values[`resource_${resource.id}`]),
        description: "",
        created_date: date
      }
    })
    await this.props.postFormData(
      data,
      "FacilityResources",
      "POST",
      "POST_FACILITY_RESOURCES",
    );
    setSubmitting(false);
    if (this.props.response.length > 0 && this.props.fromAdd) this.props.onNext();
    if (this.props.response.length > 0 && !this.props.fromAdd) this.setState({ cancelForm: true })
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
          initialValues={this._getInitialValues()}
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
                {(this.state.cancelForm && this.props.fromAdd) && <Redirect to='/facilities' />}
                {
                  (this.state.cancelForm && !this.props.fromAdd) &&
                  <Redirect to={`/facilities/${this.props.match.params.id}/resources`} />
                }
                <Row>
                  {
                    this.props.resourceTypes.map(type => {
                      return this._filteredResources(type.id).map(resource => {
                        return (
                          <div>
                            <Input
                              s={3}
                              placeholder={`Enter Total ${resource.resource_name}`}
                              label={`Enter Total ${resource.resource_name}`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values[`resource_${resource.id}`]}
                              error={touched[`resource_${resource.id}`] && errors[`resource_${resource.id}`]}
                              name={`resource_${resource.id}`}
                            />
                          </div>
                        )
                      })
                    })
                  }
                </Row>
                <FormWizardNavigation
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
    currentResources: state.facilities.currentResources.data,
    response: state.facilities.resourcesResponse,
    resourceTypes: state.dependancies.resourceTypes,
    resources: state.facilities.resources
  }
}

export default connect(mapStateToProps, {
  postFormData
})(ResourcesForm);
