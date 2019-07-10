import React from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// @ts-ignore
import { Checkbox } from "@material-ui/core";
import styled from "styled-components";
import { renderOptions } from "../../../services/helpers";
import FormButtons from "../../atoms/FacilityFormButtons";
// @ts-ignore
import { isEmpty } from "lodash";
import { resources } from "./initialValues";
import InputError from "../../atoms/InputError";

function Basic(props: Props) {
  const { initialValues, onSubmit, dependancies } = props;

  const validate = (value: Array<any>) => {
    let errors: Array<any> = [];
    dependancies.utilities.types.forEach((type: any) => {
      const utilitiesOfAType = dependancies.utilities.list.filter(
        (util: any) => util.utility_type_id == type.id
      );

      if (!utilitiesOfAType.some((util: any) => value.includes(util.id))) {
        errors.push(type.utility_type);
      }
    });
    return errors;
  };

  const onNext = async (values: any, { setSubmitting, setErrors }: any) => {
    const errors = validate(values.utilities);
    if (errors.length > 0) {
      setErrors({
        utilities: `Please Select Atleast One Utility for types ${errors.join(
          ","
        )}`
      });
      setSubmitting(false);
      return;
    }
    onSubmit(values.utilities, "utilities", "Services");
    setSubmitting(false);
  };

  return (
    <Paper>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
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

  const onUtilityClick = async (utility: any) => {
    let utilities = values.utilities;
    if (!utilities.includes(utility.id)) {
      utilities.push(utility.id);
      setFieldValue(utilities, utilities);
    } else {
      let index = utilities.indexOf(utility.id);
      utilities = utilities.splice(index, 1);
      setFieldValue(utilities, utilities);
    }
  };
  return (
    <>
      <FormWrapper data-test="utilitiesForm">
        <Grid container spacing={3}>
          {dependancies.utilities.types.map((type: any) => (
            <Grid item sm={12} md={6}>
              <h3
                style={{
                  fontWeight: "bold",
                  borderBottom: "1px solid black",
                  paddingBottom: "5px"
                }}
              >
                {type.utility_type}
              </h3>
              <Grid container spacing={3}>
                {dependancies.utilities.list
                  .filter((util: any) => util.utility_type_id === type.id)
                  .map((utility: any) => (
                    <Grid item sm={6} md={6} key={`utilities${utility.id}`}>
                      <Checkbox
                        value={`utilities${utility.id}`}
                        checked={values.utilities.includes(utility.id)}
                        onChange={() => onUtilityClick(utility)}
                        color="primary"
                      />{" "}
                      {utility.utility_name}
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
          <Grid item sm={12} md={12}>
            {errors.utilities && errors.utilities.length > 0 && (
              <InputError error={errors.utilities} for="utilities"></InputError>
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
  onSubmit: any;
  networkError: Array<any>;
  dependancies: any;
  onCancel: Function;
  fromAdd?: boolean;
};

const FormWrapper = styled.div`
  padding: 3rem;
`;
