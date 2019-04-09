//@flow
import React from "react";
import { Input, Row, Button, Pagination } from "react-materialize";
import { Alert, FormWizardNavigation } from "../../../common";
import { renderOptions } from "../../helpers/utilities";
import {
  Service,
  ServiceType,
  FacilityService,
  Facility
} from "../../../types/model-types";
import swal from "@sweetalert/with-react";
import styled from "styled-components";
import { Formik } from "formik";
import SelectedServicesContainer from "./SelectedServicesContainer";

type Props = {
  response: FacilityService,
  facilityServices: Array<FacilityService>,
  serviceTypes: Array<ServiceType>,
  services: Array<Service>,
  facility: Facility,
  postFormData: Function,
  deleteFromApi: Function,
  deleteServiceResponse: { count: number },
  onNext: Function,
  fromAdd: Function,
  patchResponse: any
};

const Container = styled.div.attrs({
  className: "container"
})``;

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

  componentWillReceiveProps(nextProp) {
    if (nextProp.initalValues)
      this.setState({ services: nextProp.initalValues.services });
  }

  _addService = () => {
    let errors = this._validate();

    if (errors != "") {
      this.setState({ errors });
      return;
    }

    let services = this.state.services;

    if (!this._wasAdded(this.state.service)) {
      services.push(this.state.service);
    }
    this.setState({ services: services, errors: "" });
    this._resetForm();
  };

  _removeService = id => {
    let removedService = null;
    let services = this.state.services.filter(ser => {
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

  _wasAdded = service => {
    let services = this.state.services.filter(
      ser => JSON.stringify(ser) === JSON.stringify(service)
    );
    return services.length > 0;
  };

  _getSelectedServiceTypes = () => {
    return this.state.services.map(service => {
      let serviceTyp = this.props.serviceTypes.find(
        serviceType => serviceType.id == Number(service.selectedServiceType)
      );
      return serviceTyp;
    });
  };

  _getServicesForRender = () => {
    let serviceTypes = this._getSelectedServiceTypes();

    let services = [];

    for (let serviceType of serviceTypes) {
      let servicesForType = this.state.services.filter(
        serv => serv.selectedServiceType == serviceType.id
      );

      let firstLevelServices = servicesForType.map(serv =>
        Number(serv.firstLevelService)
      );

      let secondLevelServices = servicesForType.map(serv =>
        Number(serv.secondLevelService)
      );

      let thirdLevelServices = servicesForType.map(serv =>
        Number(serv.thirdLevelService)
      );

      serviceType["first"] = this.props.services.filter(serv =>
        firstLevelServices.includes(serv.id)
      );

      serviceType["second"] = this.props.services.filter(serv =>
        secondLevelServices.includes(serv.id)
      );

      serviceType["third"] = this.props.services.filter(serv =>
        thirdLevelServices.includes(serv.id)
      );

      services.push(serviceType);
    }
    return services;
  };

  _renderSelectedServices() {
    let services = this._getServicesForRender();

    return (
      <SelectedServicesContainer
        services={services}
        onRemove={id => {
          this._removeService(id);
        }}
      />
    );
  }

  _onNext = async (values, { setSubmitting }) => {
    if (this.state.services.length == 0) {
      this.setState({ errors: "Please select a service" });
      setSubmitting(false);
      return;
    }

    await this.props.onSubmit(this.state.services);
    setSubmitting(false);
  };

  _validate = () => {
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
      this._filteredServices(firstLevelService).length > 0
    ) {
      return "Please select a Subservice";
    }

    if (
      thirdLevelService === -1 &&
      this._filteredServices(secondLevelService).length > 0
    ) {
      return "Please select a Sub Sub Service";
    }

    return "";
  };

  _handleChange = async () => {
    const {
      firstLevelService,
      secondLevelService,
      thirdLevelService
    } = this.state.service;

    let error = this._validate();

    if (error != "") {
      swal(error, "", "error");
      return;
    }
    let services = [];

    if (Number(firstLevelService) > 0) services.push(firstLevelService);

    if (Number(secondLevelService) > 0) services.push(secondLevelService);

    if (Number(thirdLevelService) > 0) services.push(thirdLevelService);
  };

  _resetForm = () => {
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

  _filteredServices = category => {
    return this.props.services.filter(s => {
      const isServiceType =
        s.service_type_id === Number(this.state.service.selectedServiceType);
      const isOfCategory = s.service_category_id === Number(category);
      return isServiceType && isOfCategory;
    });
  };

  _renderForm = props => {
    var { isSubmitting, handleSubmit } = props;

    return (
      <div test-id="servicesForm">
        <div className="mfl-tm-2" />
        {this.state.errors.length > 0 && (
          <Alert warning message={`${this.state.errors}`} />
        )}
        <div>
          <div className="row" style={{ minHeight: 300 }}>
            <div className="col m6 s12">
              <Row>
                <Input
                  s={12}
                  type="select"
                  value={this.state.service.selectedServiceType}
                  label="Select Service Type"
                  onChange={e =>
                    this.setState({
                      service: {
                        ...this.state.service,
                        selectedServiceType: Number(e.target.value),
                        firstLevelService: -1,
                        secondLevelService: -1,
                        thirdLevelService: -1
                      }
                    })
                  }
                >
                  <option key="default" value="-1">
                    Select Service Type
                  </option>
                  {renderOptions(this.props.serviceTypes, "service_type")}
                </Input>
                {this.state.service.selectedServiceType > 0 && (
                  <Input
                    s={12}
                    type="select"
                    label="Select Service"
                    onChange={e =>
                      this.setState({
                        service: {
                          ...this.state.service,
                          firstLevelService: Number(e.target.value),
                          secondLevelService: -1,
                          thirdLevelService: -1
                        }
                      })
                    }
                  >
                    <option key="default" value="-1">
                      Select Sub Service
                    </option>
                    {renderOptions(this._filteredServices(0), "service_name")}
                  </Input>
                )}
              </Row>
              <Row>
                {this._filteredServices(this.state.service.firstLevelService)
                  .length > 0 && (
                  <Input
                    s={12}
                    type="select"
                    label="Select Sub Service"
                    onChange={e =>
                      this.setState({
                        service: {
                          ...this.state.service,
                          secondLevelService: Number(e.target.value),
                          thirdLevelService: -1
                        }
                      })
                    }
                  >
                    <option key="default" value="-1">
                      Select Sub-sub Service
                    </option>
                    {renderOptions(
                      this._filteredServices(
                        this.state.service.firstLevelService
                      ),
                      "service_name"
                    )}
                  </Input>
                )}
                {this._filteredServices(this.state.service.secondLevelService)
                  .length > 0 && (
                  <Input
                    s={12}
                    type="select"
                    label="Select Sub-sub Service"
                    onChange={e =>
                      this.setState({
                        service: {
                          ...this.state.service,
                          thirdLevelService: Number(e.target.value)
                        }
                      })
                    }
                  >
                    <option key="default" value="-1">
                      Select Sub Service
                    </option>
                    {renderOptions(
                      this._filteredServices(
                        this.state.service.secondLevelService
                      ),
                      "service_name"
                    )}
                  </Input>
                )}
                <Row>
                  <Button
                    className="ml-6"
                    onClick={this._addService}
                    disabled={isSubmitting}
                  >
                    Add Service
                  </Button>
                </Row>
              </Row>
            </div>
            <div className="col m6 s12">
              <h6 className="mb-4 flex items-center">
                <i className="material-icons mr-4">verified_user</i> Services
              </h6>
              {this._renderSelectedServices()}
            </div>
          </div>
          <FormWizardNavigation
            saveButton={isSubmitting ? "Saving..." : "Save"}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            handleCancel={() => this.props.cancel()}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={this.props.initalValues}
          validationSchema={this.schema}
          onSubmit={this._onNext}
          render={props => this._renderForm(props)}
        />
      </Container>
    );
  }
}

export default ServicesForm;
