//@flow
import React from "react";
import { Input, Row } from "react-materialize";
import { FormWizardNavigation } from "../../../common";

import { Formik } from "formik";
import { getResourcesSchema } from "../../components/Forms/schema";
import {
  Resource,
  ResourceType,
  FacilityResource,
  Facility
} from "../../../types/model-types";
import styled from "styled-components";
import _ from "lodash";

type Props = {
  response: any,
  resourceTypes: Array<ResourceType>,
  resources: Array<Resource>,
  onNext: Function,
  facility: Facility,
  fromAdd: Function,
  currentResources: Array<FacilityResource>
};

const Container = styled.div.attrs({
  className: "container"
})``;

class ResourcesForm extends React.Component<Props> {
  schema = {};
  initalValues = {};

  _filteredResources = typeId => {
    return this.props.resources.filter(r => r.resource_type_id === typeId);
  };

  componentWillMount() {
    this.schema = getResourcesSchema(this.props.resources);
  }

  componentWillReceiveProps(nextProp) {
    this.schema = getResourcesSchema(this.props.resources);
    if (nextProp.initalValues) this.initalValues = nextProp.initalValues;
  }

  _onNext = async (values, { setSubmitting }) => {
    this.props.onSubmit({
      ...values
    });
    setSubmitting(false);
  };

  _renderForm = props => {
    var {
      values,
      errors,
      handleChange,
      handleSubmit,
      touched,
      handleBlur,
      isSubmitting
    } = props;

    return (
      <div test-id="resourcesForm">
        <div className="mfl-tm-2">
          <Row>
            {this.props.resourceTypes.map(type => {
              return this._filteredResources(type.id).map(resource => {
                return (
                  <div>
                    <Input
                      s={3}
                      label={`${resource.resource_name}`}
                      placeholder={`Enter Total ${resource.resource_name}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values && values[`resource_${resource.id}`]}
                      error={
                        values &&
                        touched[`resource_${resource.id}`] &&
                        errors[`resource_${resource.id}`]
                      }
                      name={`resource_${resource.id}`}
                    />
                  </div>
                );
              });
            })}
          </Row>

          <FormWizardNavigation
            saveButton={this.props.fromAdd ? "Next" : "Save"}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            handleCancel={() => this.props.cancel()}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={this.props.initalValues}
          validationSchema={this.schema}
          onSubmit={this._onNext}
          render={props => this._renderForm(props)}
        />
      </Container>
    );
  }
}

export default ResourcesForm;
