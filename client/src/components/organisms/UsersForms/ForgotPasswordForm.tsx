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
// @ts-ignore
import { isEmpty } from "lodash";

export function Form(props: any) {
  let { values, errors, touched, handleChange, handleBlur } = props;
  return (
    <FormWrapper>
      <Grid container spacing={24}>
        <Grid item sm={12} md={12}>
          <FormControl className="mfl-max-width">
            <TextField
              value={values.email}
              name="email"
              label="Reset Email"
              placeholder="Enter Your Password Reset Email"
              error={errors.email && touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby="component-error-text"
            />
            {errors.email && touched.email && (
              <FormHelperText id="component-error-text">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  padding: 1rem;
`;

export default Form;
