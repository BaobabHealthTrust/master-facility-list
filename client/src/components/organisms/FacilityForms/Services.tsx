import React from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import styled from "styled-components";
import { getServicesLeaves } from "../../../services/helpers";
import FormButtons from "../../atoms/FacilityFormButtons";
import InputError from "../../atoms/InputError";

class ServicesForm extends React.Component<Props> {
  onChange = (
    e: any,
    typeId: any,
    setFieldValue: any,
    servicesOptions: any,
    values: any
  ) => {
    const services = values.services.filter(
      (ser: any) => ser.service_type_id != typeId
    );
    const curServices = e.target.value.map(
      (val: any) => servicesOptions.filter((ser: any) => ser.id == val)[0]
    );

    setFieldValue("services", [...services, ...curServices]);
  };

  validate = (value: Array<any>) => {
    return value.length != 0;
  };

  onNext = (values: any, { setSubmitting, setErrors }: any) => {
    if (!this.validate(values.services)) {
      setErrors({ services: "Please Select Atleast One Service" });
      setSubmitting(false);
      return;
    }
    this.props.onSubmit(values.services, "services", "Finish");
    setSubmitting(false);
  };

  render() {
    return (
      <Paper>
        <div>
          <Formik
            enableReinitialize={true}
            initialValues={this.props.initialValues}
            onSubmit={this.onNext}
            render={formikProps => (
              <Form
                onChange={this.onChange}
                services={formikProps.values.services}
                {...this.props}
                {...formikProps}
              />
            )}
          />
        </div>
      </Paper>
    );
  }
}

export default ServicesForm;

export function Form(props: any) {
  let {
    values,
    errors,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    dependancies,
    onChange,
    onCancel,
    fromAdd
  } = props;

  const servicesOptions = getServicesLeaves(dependancies.services.hierachy);

  const isSelected = (value: any) => {
    return values.services.filter((ser: any) => ser.id == value.id).length > 0;
  };

  return (
    <>
      <FormWrapper>
        <Grid container spacing={3}>
          <Grid item sm={12} md={12}>
            <Grid container spacing={3}>
              {dependancies.services.types.map((serType: any) => {
                const optionsForTypes = servicesOptions.filter(
                  (ser: any) => ser.service_type_id == serType.id
                );
                return (
                  <Grid item sm={12} md={6}>
                    <InputLabel>Select {serType.service_type}</InputLabel>
                    <FormControl className="mfl-max-width">
                      <Select
                        data-test={serType.service_type}
                        multiple
                        onChange={e =>
                          onChange(
                            e,
                            serType.id,
                            setFieldValue,
                            servicesOptions,
                            values
                          )
                        }
                        value={values.services
                          .filter(
                            (val: any) => val.service_type_id == serType.id
                          )
                          .map((ser: any) => ser.id)}
                        renderValue={(selected: any) =>
                          selected
                            .map(
                              (sel: any) =>
                                values.services.filter(
                                  (val: any) => val.id == sel
                                )[0].service_name as string[]
                            )
                            .join(", ")
                        }
                      >
                        {optionsForTypes.map((serv: any) => (
                          <MenuItem key={serv.id} value={serv.id}>
                            <Checkbox
                              checked={isSelected(serv)}
                              color="primary"
                            />
                            <ListItemText>{serv.service_name}</ListItemText>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item sm={12} md={12}>
            {errors.services && errors.services.length > 0 && (
              <InputError error={errors.services} for="services"></InputError>
            )}
          </Grid>
        </Grid>
      </FormWrapper>
      <Grid container spacing={3}>
        <Grid item sm={12} md={12}>
          <FormButtons
            handleSubmit={handleSubmit}
            handleCancel={onCancel}
            saveBtnText="Save"
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
