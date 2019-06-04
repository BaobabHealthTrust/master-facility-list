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
  let {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    setFieldValue
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormWrapper>
        <Grid container spacing={24}>
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.name}
                name="name"
                label="Name"
                placeholder="Enter Name"
                error={errors.name && touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />
              {errors.name && touched.name && (
                <FormHelperText id="component-error-text">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.username}
                name="username"
                label="Username"
                placeholder="Enter Username"
                error={errors.username && touched.username}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />
              {errors.username && touched.username && (
                <FormHelperText id="component-error-text">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.email}
                name="email"
                label="Email"
                placeholder="Enter Email"
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
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                type="password"
                value={values.password}
                name="password"
                label="Password"
                placeholder="Enter Password"
                error={errors.password && touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />
              {errors.password && touched.password && (
                <FormHelperText id="component-error-text">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                type="password"
                value={values.confirmPassword}
                name="confirmPassword"
                label="Password"
                placeholder="Confirm Password"
                error={errors.confirmPassword && touched.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <FormHelperText id="component-error-text">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </FormWrapper>
    </form>
  );
}

const FormWrapper = styled.div`
  padding: 1rem;
`;

export default Form;
