//@flow
import React from "react";
import { CurrentFacility } from "../../../types/helper-types";
import styled from "styled-components";
import { contactSchema } from "../schema";
import { Formik } from "formik";
import _ from "lodash";
import { Form } from "./Form";

type Props = {
  response: any,
  postFormData: Function,
  current: CurrentFacility,
  fromAdd: ?boolean
};
const Container = styled.div.attrs({
  className: "container"
})``;

class FacilityContactForm extends React.Component<Props> {
  initalValues = {
    postalAddress: null,
    physicalAddress: null,
    contactName: null,
    contactEmail: null,
    contactPhoneNumber: null,
    catchmentArea: null,
    catchmentPopulation: null,
    longitude: null,
    latitude: null
  };

  _onNext = async (values, { setSubmitting, setErrors }) => {
    let errors = this.props.onSubmit({
      ...values
    });
    if (!_.isEmpty(errors)) {
      setErrors({
        postalAddress: errors.postal_address ? errors.postal_address[0] : "",
        physicalAddress: errors.physical_address
          ? errors.physical_address[0]
          : "",
        contactName: errors.contact_name ? errors.contact_name[0] : "",
        contactEmail: errors.contact_email ? errors.contact_email[0] : "",
        contactPhoneNumber: errors.contact_phone_number
          ? errors.contact_phone_number[0]
          : "",
        catchmentArea: errors.catchment_area ? errors.catchment_area[0] : "",
        catchmentPopulation: errors.catchment_population
          ? errors.catchment_population[0]
          : "",
        longitude: errors.longitude ? errors.longitude[0] : "",
        latitude: errors.latitude ? errors.latitude[0] : ""
      });
    }

    setSubmitting(false);
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.initalValues) this.initalValues = nextProp.initalValues;
  }

  render() {
    return (
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={this.initalValues}
          validationSchema={contactSchema}
          onSubmit={this._onNext}
          render={props => <Form {...this.props} {...props} />}
        />
      </Container>
    );
  }
}
export default FacilityContactForm;
