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

function Basic(props: Props) {
  const { initialValues, onSubmit } = props;

  const onNext = async (values: any, { setSubmitting, setErrors }: any) => {
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
      <FormWrapper>
        <Grid container spacing={3}>
          {dependancies.utilities.types.map((type: any) => (
            <Grid item sm={12} md={6}>
              {type.utility_type}
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
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
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
