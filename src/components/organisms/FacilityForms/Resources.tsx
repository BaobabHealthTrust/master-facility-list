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
    onSubmit(values, "resources", "Utilities");
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
        <Grid container spacing={24}>
          {dependancies.resources.list.map((resource: any) => (
            <Grid item sm={12} md={3}>
              <FormControl className="mfl-max-width">
                <TextField
                  value={values && values[`resource_${resource.id}`]}
                  name={`resource_${resource.id}`}
                  label={`${resource.resource_name}`}
                  placeholder="Enter Facility Postal Address"
                  error={
                    values &&
                    touched[`resource_${resource.id}`] &&
                    errors[`resource_${resource.id}`]
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {values &&
                  touched[`resource_${resource.id}`] &&
                  errors[`resource_${resource.id}`] && (
                    <FormHelperText id="component-error-text">
                      {errors[`resource_${resource.id}`]}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </FormWrapper>
      <Grid container spacing={24}>
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
