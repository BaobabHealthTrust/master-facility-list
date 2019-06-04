import React from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// @ts-ignore
import {
  TextField,
  FormControl,
  FormHelperText,
  Select,
  InputLabel,
  Input
} from "@material-ui/core";
import styled from "styled-components";
import { renderOptions } from "../../../services/helpers";
import FormButtons from "../../atoms/FacilityFormButtons";
// @ts-ignore
import { isEmpty } from "lodash";

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
    setFieldValue,
    dependancies,
    onCancel
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormWrapper>
        <Grid container spacing={24}>
          <Grid item sm={12} md={6}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.postalAddress}
                name="postalAddress"
                label="Enter Facility Postal Address"
                placeholder="Enter Facility Postal Address"
                error={errors.postalAddress && touched.postalAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.postalAddress && touched.postalAddress && (
                <FormHelperText id="component-error-text">
                  {errors.postalAddress}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.physicalAddress}
                name="physicalAddress"
                label="Facility Physical Address"
                placeholder="Enter Facility Physical Address"
                error={errors.physicalAddress && touched.physicalAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />
              {errors.physicalAddress && touched.physicalAddress && (
                <FormHelperText id="component-error-text">
                  {errors.physicalAddress}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.contactName}
                name="contactName"
                label="Contact Person Name"
                placeholder="Contact Person Name"
                error={errors.contactName && touched.contactName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contactName && touched.contactName && (
                <FormHelperText id="component-error-text">
                  {errors.contactName}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.contactPhoneNumber}
                name="contactPhoneNumber"
                label="Contact Person Phone Number"
                placeholder="Contact Person Phone Number"
                error={errors.contactPhoneNumber && touched.contactPhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contactPhoneNumber && touched.contactPhoneNumber && (
                <FormHelperText id="component-error-text">
                  {errors.contactPhoneNumber}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.contactEmail}
                name="contactEmail"
                label="Contact Person Email"
                placeholder="Contact Person Email"
                error={errors.contactEmail && touched.contactEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contactEmail && touched.contactEmail && (
                <FormHelperText id="component-error-text">
                  {errors.contactEmail}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.catchmentArea}
                name="catchmentArea"
                label="Catchment Area"
                placeholder="Enter Catchment Area"
                error={errors.catchmentArea && touched.catchmentArea}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.catchmentArea && touched.catchmentArea && (
                <FormHelperText id="component-error-text">
                  {errors.catchmentArea}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.catchmentPopulation}
                name="catchmentPopulation"
                label="Estimated Catchment Population"
                placeholder="Estimated Catchment Population"
                error={
                  errors.catchmentPopulation && touched.catchmentPopulation
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.catchmentPopulation && touched.catchmentPopulation && (
                <FormHelperText id="component-error-text">
                  {errors.catchmentPopulation}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.latitude}
                name="latitude"
                label="Facility Latitude"
                placeholder="Facility Latitude"
                error={errors.latitude && touched.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.latitude && touched.latitude && (
                <FormHelperText id="component-error-text">
                  {errors.latitude}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.longitude}
                name="longitude"
                label="Facility Longitude"
                placeholder="Facility Longitude"
                error={errors.longitude && touched.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.longitude && touched.longitude && (
                <FormHelperText id="component-error-text">
                  {errors.longitude}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </FormWrapper>
      <Grid container spacing={24}>
        <Grid item sm={12} md={12}>
          <FormButtons
            handleSubmit={handleSubmit}
            handleCancel={onCancel}
            saveBtnText="Next"
            isSubmitting={isSubmitting}
          />
        </Grid>
      </Grid>
    </form>
  );
}

type Props = {
  initialValues: any;
  schema: any;
  onSubmit: any;
  networkError: Array<any>;
  dependancies: any;
  onCancel: Function;
};

const FormWrapper = styled.div`
  padding: 3rem;
`;
