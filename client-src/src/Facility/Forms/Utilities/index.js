//@flow
import React from "react";
import { Form } from "./Form";

import {
  Utility,
  Facility,
  UtilityType,
  FacilityUtility
} from "../../../types/model-types";
import { Formik } from "formik";
import styled from "styled-components";

type Props = {
  response: any,
  utilityTypes: Array<UtilityType>,
  utilities: Array<Utility>,
  onNext: Function,
  facility: Facility,
  fromAdd: ?boolean,
  currentUtilities: Array<FacilityUtility>
};

class UtilitiesForm extends React.Component<Props> {
  state = {
    errors: []
  };

  inputField = [];

  _validate = values => {
    let errors = [];
    this.props.utilityTypes.forEach(type => {
      const utilitiesOfAType = this.props.utilities.filter(
        util => util.utility_type_id == type.id
      );

      if (!utilitiesOfAType.some(util => values.utilities.includes(util.id))) {
        errors.push(type.utility_type);
      }
    });
    return errors;
  };

  _onNext = async (values, { setSubmitting }) => {
    let errors = this._validate(values);

    if (errors.length > 0) {
      this.setState({ errors });
      setSubmitting(false);
      return;
    }

    this.props.onSubmit(values.utilities);
    setSubmitting(false);
  };

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.props.initalValues}
        onSubmit={this._onNext}
        render={props => (
          <Form {...this.props} {...props} errors={this.state.errors} />
        )}
      />
    );
  }
}

export default UtilitiesForm;
