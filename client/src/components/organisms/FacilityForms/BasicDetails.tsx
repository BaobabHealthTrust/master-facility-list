import React from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
import FacilityCodesForm from "./FacilityCodes";
import TextInput from "../../atoms/TextInput";
import InputError from "../../atoms/InputError";

function Basic(props: Props) {
  const { initialValues, schema, onSubmit } = props;

  const onNext = async (values: any, { setSubmitting, setErrors }: any) => {
    onSubmit(values, "details", "Contacts & Location");
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
    onCancel,
    fromAdd
  } = props;
  return (
    <>
      <FormWrapper>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <TextInput
              value={values.facilityName}
              label="Facility Name"
              placeholder="Enter Facility Name"
              error={errors.facilityName}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.facilityName}
              name="facilityName"
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextInput
              value={values.commonName}
              name="commonName"
              label="Common Name"
              placeholder="Enter Common Name"
              error={errors.commonName}
              touched={touched.commonName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <InputLabel htmlFor="facilityType">Facility Type</InputLabel>
            <FormControl className="mfl-max-width">
              <Select
                data-test="facilityType"
                value={values.facilityType}
                onBlur={handleBlur}
                error={errors.facilityType && touched.facilityType}
                onChange={(e: any) =>
                  setFieldValue("facilityType", e.target.value)
                }
                inputProps={{
                  id: "facilityType",
                  name: "facilityType"
                }}
              >
                {renderOptions(
                  dependancies.facilityTypes.list,
                  "facility_type"
                )}
              </Select>
              {errors.facilityType && touched.facilityType && (
                <InputError error={errors.facilityType} for="facilityType" />
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <InputLabel>Operational Status</InputLabel>
            <FormControl className="mfl-max-width">
              <Select
                data-test="operationalStatus"
                onBlur={handleBlur}
                error={errors.operationalStatus && touched.operationalStatus}
                onChange={(e: any) =>
                  setFieldValue("operationalStatus", e.target.value)
                }
                input={
                  <Input
                    name="operationalStatus"
                    error={
                      errors.operationalStatus && touched.operationalStatus
                    }
                    id="operationalStatus"
                  />
                }
                value={values.operationalStatus}
              >
                {renderOptions(
                  dependancies.operationalStatuses.list,
                  "facility_operational_status"
                )}
              </Select>
              {errors.operationalStatus && touched.operationalStatus && (
                <InputError
                  error={errors.operationalStatus}
                  for="operationalStatus"
                />
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <InputLabel>Regulatory Status</InputLabel>
            <FormControl className="mfl-max-width">
              <Select
                data-test="regulatoryStatus"
                onBlur={handleBlur}
                error={errors.regulatoryStatus && touched.regulatoryStatus}
                onChange={(e: any) =>
                  setFieldValue("regulatoryStatus", e.target.value)
                }
                input={
                  <Input
                    name="regulatoryStatus"
                    error={errors.regulatoryStatus && touched.regulatoryStatus}
                    id="regulatoryStatus"
                  />
                }
                value={values.regulatoryStatus}
              >
                {renderOptions(
                  dependancies.regulatoryStatuses.list,
                  "facility_regulatory_status"
                )}
              </Select>
              {errors.operationalStatus && touched.regulatoryStatus && (
                <InputError
                  error={errors.regulatoryStatus}
                  for="regulatoryStatus"
                />
              )}
            </FormControl>
          </Grid>

          <Grid item sm={12} md={6}>
            <InputLabel>Facility Owner</InputLabel>
            <FormControl className="mfl-max-width">
              <Select
                data-test="facilityOwner"
                onBlur={handleBlur}
                error={errors.facilityOwner && touched.facilityOwner}
                onChange={(e: any) =>
                  setFieldValue("facilityOwner", e.target.value)
                }
                input={
                  <Input
                    name="facilityOwner"
                    error={errors.facilityOwner && touched.facilityOwner}
                    id="facilityOwner"
                  />
                }
                value={values.facilityOwner}
              >
                {renderOptions(dependancies.owners.list, "facility_owner")}
              </Select>
              {errors.facilityOwner && touched.facilityOwner && (
                <InputError error={errors.facilityOwner} for="facilityOwner" />
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <InputLabel>District</InputLabel>
            <FormControl className="mfl-max-width">
              <Select
                data-test="district"
                onBlur={handleBlur}
                error={errors.district && touched.district}
                onChange={(e: any) => setFieldValue("district", e.target.value)}
                input={
                  <Input
                    name="district"
                    error={errors.district && touched.district}
                    id="district"
                  />
                }
                value={values.district}
              >
                {renderOptions(dependancies.districts.list, "district_name")}
              </Select>
              {errors.district && touched.district && (
                <InputError error={errors.district} for="district" />
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            <TextInput
              value={values.registrationNumber}
              name="registrationNumber"
              label="Registration Number"
              placeholder="Enter Registration Number"
              error={errors.registrationNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.registrationNumber}
            />
          </Grid>
          <Grid item sm={12} md={3}>
            <FormControl className="mfl-max-width">
              <TextField
                id="date"
                name="dateOpened"
                label="Date Opened"
                type="date"
                defaultValue={values.dateOpened}
                error={errors.dateOpened && touched.dateOpened}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
            {!fromAdd && (
              <FacilityCodesForm
                systems={values.facility_code_mapping}
                setFieldValue={setFieldValue}
              />
            )}
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
