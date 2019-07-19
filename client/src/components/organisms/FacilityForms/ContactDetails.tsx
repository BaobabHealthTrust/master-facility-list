import React from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LocationPickerModal from "../../molecules/LocationPickerModal";
import styled from "styled-components";
import FormButtons from "../../atoms/FacilityFormButtons";
import TextInput from "../../atoms/TextInput";

function Basic(props: Props) {
  const { initialValues, schema, onSubmit } = props;

  const onNext = async (values: any, { setSubmitting, setErrors }: any) => {
    onSubmit(values, "contact", "Resources");
    setSubmitting(false);
  };

  return (
    <Paper>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onNext}
          render={formikProps => <Form {...props} {...formikProps} />}
        />
      </div>
    </Paper>
  );
}

export default Basic;

export function Form(props: any) {
  let {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    onCancel,
    fromAdd,
    setFieldValue
  } = props;

  const setCoordinates = (position: { lat: any; lng: any }) => {
    setFieldValue("latitude", position.lat);
    setFieldValue("longitude", position.lng);
  };

  return (
    <>
      <FormWrapper>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <TextInput
              value={values.postalAddress}
              name="postalAddress"
              label="Enter Facility Postal Address"
              placeholder="Enter Facility Postal Address"
              error={errors.postalAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.postalAddress}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextInput
              value={values.physicalAddress}
              name="physicalAddress"
              label="Facility Physical Address"
              placeholder="Enter Facility Physical Address"
              error={errors.physicalAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.physicalAddress}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <TextInput
              value={values.contactName}
              name="contactName"
              label="Contact Person Name"
              placeholder="Contact Person Name"
              error={errors.contactName}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.contactName}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <TextInput
              value={values.contactPhoneNumber}
              name="contactPhoneNumber"
              label="Contact Person Phone Number"
              placeholder="Contact Person Phone Number"
              error={errors.contactPhoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.contactPhoneNumber}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextInput
              value={values.contactEmail}
              name="contactEmail"
              label="Contact Person Email"
              placeholder="Contact Person Email"
              error={errors.contactEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.contactEmail}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <TextInput
              value={values.catchmentArea}
              name="catchmentArea"
              label="Catchment Area"
              placeholder="Enter Catchment Area"
              error={errors.catchmentArea}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.catchmentArea}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <TextInput
              value={values.catchmentPopulation}
              name="catchmentPopulation"
              label="Estimated Catchment Population"
              placeholder="Estimated Catchment Population"
              error={errors.catchmentPopulation}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.catchmentPopulation}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <TextInput
                  value={values.latitude}
                  name="latitude"
                  label="Facility Latitude"
                  placeholder="Facility Latitude"
                  error={errors.latitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.latitude}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextInput
                  value={values.longitude}
                  name="longitude"
                  label="Facility Longitude"
                  placeholder="Facility Longitude"
                  error={errors.longitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.longitude}
                />
              </Grid>
              <Grid item sm={12} md={12}>
                <LocationPickerModal onSave={setCoordinates} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormWrapper>
      <Grid container spacing={3}>
        <Grid item sm={12} md={12}>
          <FormButtons
            handleSubmit={handleSubmit}
            handleCancel={onCancel}
            saveBtnText={fromAdd ? "Next" : "Save"}
            isSubmitting={isSubmitting}
          />
        </Grid>
      </Grid>
    </>
  );
}

type Props = {
  initialValues: any;
  schema: any;
  onSubmit: any;
  networkError: Array<any>;
  dependancies: any;
  onCancel: Function;
  fromAdd?: boolean;
};

const FormWrapper = styled.div`
  padding: 3rem;
`;
