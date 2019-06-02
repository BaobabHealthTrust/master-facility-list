import React, { useState } from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "../../../components/atoms/Button";
import SelectedServicesContainer from "../../../components/molecules/SelectedServicesContainer";
// @ts-ignore
import { FormControl, Select, InputLabel, Input } from "@material-ui/core";
import styled from "styled-components";
import { renderOptions } from "../../../services/helpers";
import FormButtons from "../../atoms/FacilityFormButtons";

class ServicesForm extends React.Component<Props> {
  state = {
    service: {
      selectedServiceType: -1,
      firstLevelService: -1,
      secondLevelService: -1,
      thirdLevelService: -1
    },
    services: [],
    errors: []
  };

  componentDidMount() {
    this.setState({ services: this.props.initialValues.services });
  }

  getSelectedServiceTypes = () => {
    return this.state.services.map((service: any) => {
      let serviceTyp = this.props.dependancies.services.types.find(
        (serviceType: any) =>
          serviceType.id == Number(service.selectedServiceType)
      );
      return serviceTyp;
    });
  };

  generateServiceHierarchy = () => {
    let serviceTypes = this.getSelectedServiceTypes();

    let services = [];

    for (let serviceType of serviceTypes) {
      let serviceOfSpecificType = this.state.services.filter(
        (serv: any) => serv.selectedServiceType == serviceType.id
      );

      let firstLevelServiceIds = serviceOfSpecificType.map((serv: any) =>
        Number(serv.firstLevelService)
      );

      let secondLevelServiceIds = serviceOfSpecificType.map((serv: any) =>
        Number(serv.secondLevelService)
      );

      let thirdLevelServiceIds = serviceOfSpecificType.map((serv: any) =>
        Number(serv.thirdLevelService)
      );

      serviceType["first"] = this.props.dependancies.services.list.filter(
        (serv: any) => firstLevelServiceIds.includes(serv.id)
      );

      serviceType["second"] = this.props.dependancies.services.list.filter(
        (serv: any) => secondLevelServiceIds.includes(serv.id)
      );

      serviceType["third"] = this.props.dependancies.services.list.filter(
        (serv: any) => thirdLevelServiceIds.includes(serv.id)
      );

      services.push(serviceType);
    }
    return services;
  };
  removeService = (id: number) => {
    let removedService = null;
    let services = this.state.services.filter((ser: any) => {
      if (ser.firstLevelService == id) {
        return false;
      } else if (ser.secondLevelService == id) {
        removedService = {
          ...ser,
          secondLevelService: -1,
          thirdLevelService: -1
        };
        return false;
      } else if (ser.thirdLevelService == id) {
        removedService = { ...ser, thirdLevelService: -1 };
        return false;
      }

      return true;
    });

    if (removedService != null) {
      services.push(removedService);
    }
    this.setState({ services });
  };

  renderSelectedServices = () => {
    let services = this.generateServiceHierarchy();
    return (
      <SelectedServicesContainer
        services={services}
        onRemove={(id: any) => {
          this.removeService(id);
        }}
      />
    );
  };

  onChange = (e: any, level: any) => {
    switch (level) {
      case "type":
        this.setState({
          service: {
            ...this.state.service,
            selectedServiceType: Number(e.target.value),
            firstLevelService: -1,
            secondLevelService: -1,
            thirdLevelService: -1
          }
        });
        break;
      case "first":
        this.setState({
          service: {
            ...this.state.service,
            firstLevelService: Number(e.target.value),
            secondLevelService: -1,
            thirdLevelService: -1
          }
        });
        break;
      case "second":
        this.setState({
          service: {
            ...this.state.service,
            secondLevelService: Number(e.target.value),
            thirdLevelService: -1
          }
        });
        break;
      case "third":
        this.setState({
          service: {
            ...this.state.service,
            thirdLevelService: Number(e.target.value)
          }
        });
        break;
    }
  };
  validate = () => {
    const {
      selectedServiceType,
      firstLevelService,
      secondLevelService,
      thirdLevelService
    } = this.state.service;

    if (selectedServiceType === -1) {
      return "Please select a Service Type";
    }

    if (firstLevelService === -1) {
      return "Please select a Service";
    }

    if (
      secondLevelService === -1 &&
      this.filteredServices(firstLevelService).length > 0
    ) {
      return "Please select a Subservice";
    }

    if (
      thirdLevelService === -1 &&
      this.filteredServices(secondLevelService).length > 0
    ) {
      return "Please select a Sub Sub Service";
    }

    return "";
  };

  wasAdded = (service: any) => {
    let services = this.state.services.filter(
      (ser: any) => JSON.stringify(ser) === JSON.stringify(service)
    );
    return services.length > 0;
  };

  addService = () => {
    let errors: any = this.validate();
    if (errors != "") {
      this.setState({ errors });
      return;
    }

    let services: any = this.state.services;

    if (!this.wasAdded(this.state.service)) {
      services.push(this.state.service);
    }
    this.setState({ services, errors: [] });
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      service: {
        ...this.state.service,
        selectedServiceType: -1,
        firstLevelService: -1,
        secondLevelService: -1,
        thirdLevelService: -1
      }
    });
  };

  filteredServices = (category: any) => {
    return this.props.dependancies.services.list.filter((s: any) => {
      const isServiceType =
        s.service_type_id === Number(this.state.service.selectedServiceType);
      const isOfCategory = s.service_category_id === Number(category);
      return isServiceType && isOfCategory;
    });
  };
  handleChange = async () => {
    const {
      firstLevelService,
      secondLevelService,
      thirdLevelService
    } = this.state.service;

    let error = this.validate();

    // if (error != "") {
    //   swal(error, "", "error");
    //   return;
    // }
    let services = [];

    if (Number(firstLevelService) > 0) services.push(firstLevelService);

    if (Number(secondLevelService) > 0) services.push(secondLevelService);

    if (Number(thirdLevelService) > 0) services.push(thirdLevelService);
  };

  onNext = async (values: any, { setSubmitting, setErrors }: any) => {
    this.props.onSubmit();
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
                service={this.state.service}
                filteredServices={this.filteredServices}
                addService={this.addService}
                renderSelectedServices={this.renderSelectedServices}
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
    touched,
    handleSubmit,
    handleBlur,
    isSubmitting,
    setFieldValue,
    dependancies,
    service,
    onChange,
    addService,
    renderSelectedServices
  } = props;

  return (
    <>
      <FormWrapper>
        <Grid container spacing={24}>
          <Grid item sm={12} md={6}>
            <Grid container spacing={24}>
              <Grid item sm={12} md={12}>
                <InputLabel>Select Service Type</InputLabel>
                <FormControl className="mfl-max-width">
                  <Select
                    onChange={e => onChange(e, "type")}
                    input={<Input name="resourceType" id="resourceType" />}
                    value={service.selectedServiceType}
                  >
                    {renderOptions(dependancies.services.types, "service_type")}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={12}>
                {props.service.selectedServiceType > 0 && (
                  <>
                    <FormControl className="mfl-max-width">
                      <Select
                        onChange={e => onChange(e, "first")}
                        input={<Input name="resourceType" id="resourceType" />}
                        value={service.selectedServiceType}
                      >
                        {renderOptions(
                          props.filteredServices(0),
                          "service_name"
                        )}
                      </Select>
                    </FormControl>
                  </>
                )}
              </Grid>
              <Grid item sm={12} md={12}>
                {props.service.firstLevelService > 0 && (
                  <>
                    <FormControl className="mfl-max-width">
                      <Select
                        onChange={e => onChange(e, "second")}
                        input={<Input name="resourceType" id="resourceType" />}
                        value={props.service.secondLevelService}
                      >
                        {renderOptions(
                          props.filteredServices(
                            props.service.firstLevelService
                          ),
                          "service_name"
                        )}
                      </Select>
                    </FormControl>
                  </>
                )}
              </Grid>
              <Grid item sm={12} md={12}>
                {props.service.secondLevelService > 0 && (
                  <>
                    <FormControl className="mfl-max-width">
                      <Select
                        onChange={e => onChange(e, "third")}
                        input={<Input name="resourceType" id="resourceType" />}
                        value={props.service.thirdLevelService}
                      >
                        {renderOptions(
                          props.filteredServices(
                            props.service.secondLevelService
                          ),
                          "service_name"
                        )}
                      </Select>
                    </FormControl>
                  </>
                )}
              </Grid>
              <Grid item sm={12} md={12}>
                <Button
                  onClick={addService}
                  disabled={isSubmitting}
                  theme="secondary"
                >
                  Add Service
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={6}>
            {renderSelectedServices()}
          </Grid>
        </Grid>
      </FormWrapper>
      <Grid container spacing={24}>
        <Grid item sm={12} md={12}>
          <FormButtons
            handleSubmit={handleSubmit}
            handleCancel={() => {
              alert("canel");
            }}
            saveBtnText="Next"
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
};

const FormWrapper = styled.div`
  padding: 3rem;
`;
