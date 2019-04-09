//@flow
import React from "react";

import { Formik } from "formik";
import { getResourcesSchema } from "../schema";
import {
  Resource,
  ResourceType,
  FacilityResource,
  Facility
} from "../../../types/model-types";
import styled from "styled-components";
import _ from "lodash";
import { Form } from "./Form";

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

  render() {
    return (
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={this.props.initalValues}
          validationSchema={this.schema}
          onSubmit={this._onNext}
          render={props => (
            <Form
              {...this.props}
              {...props}
              filteredResources={id => this._filteredResources(id)}
            />
          )}
        />
      </Container>
    );
  }
}

export default ResourcesForm;
