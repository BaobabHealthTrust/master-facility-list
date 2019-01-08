//@flow
import React, {Component} from "react";
import {
  Input,
  Navbar,
  NavItem,
  Row,
  Button,
  Pagination
} from "react-materialize";
import {connect} from "react-redux";
import {DatePicker, FormWizardNavigation} from "../../../common";
import {BasicDetailsFormProps} from "../../../types/helper-types";
import {Formik} from "formik";
import {
  postFormData,
  fetchCurrentServices,
  deleteFromApi
} from "../../../actions";
import yup from "yup";
import {renderOptions} from "../helpers";
import {Redirect} from "react-router-dom";
import {
  Service,
  ServiceType,
  FacilityService,
  Facility
} from "../../../types/model-types";
// import { postFormDataInterface } from "../../types/function-types";

type Props = {
  response: FacilityService,
  facilityServices: Array<FacilityService>,
  serviceTypes: Array<ServiceType>,
  services: Array<Service>,
  facility: Facility,
  postFormData: Function,
  deleteFromApi: Function,
  deleteServiceResponse: {count: number},
  onNext: Function,
  fromAdd: Function,
  patchResponse: any
};

class ServicesForm extends React.Component<Props> {
  // TODO: Ensure null safety for all default values
  state = {
    selectedServiceType: -1,
    firstLevelService: -1,
    secondLevelService: -1,
    thirdLevelService: -1,
    cancelForm: false,
    pageNumber: 1
  };

  _publishFacility = async () => {
    await this.props.postFormData(
      {
        id: this.props.facility.id || 1,
        district_id: this.props.facility.district_id || 1
      },
      "Facilities",
      "POST",
      "PATCH_BASIC_DETAILS",
      "publish"
    );
    if (this.props.patchResponse) this.props.onNext();
    else alert("Could not Finalize Process");
  };

  _handleChange = async (values, {setSubmitting, setErros}) => {
    const {
      selectedServiceType,
      firstLevelService,
      secondLevelService,
      thirdLevelService
    } = this.state;

    if (selectedServiceType === -1) {
      alert("Please select a Service Type");
      setSubmitting(false);
      return;
    }

    // TODO: Define one function to get this done
    if (
      firstLevelService === -1 &&
      this._filteredServices(secondLevelService).length > 0
    ) {
      alert("Please select a Subservice");
      setSubmitting(false);
      return;
    }

    if (
      secondLevelService === -1 &&
      this._filteredServices(firstLevelService).length > 0
    ) {
      alert("Please select a Subservice");
      setSubmitting(false);
      return;
    }

    if (
      thirdLevelService === -1 &&
      this._filteredServices(secondLevelService).length > 0
    ) {
      alert("Please select a Sub Sub Service");
      setSubmitting(false);
      return;
    }

    let services = [];

    if (Number(firstLevelService) > 0) services.push(firstLevelService);

    if (Number(secondLevelService) > 0) services.push(secondLevelService);

    if (Number(thirdLevelService) > 0) services.push(thirdLevelService);

    const data = {
      service_ids: services,
      client_id: 1,
      facility_id: await this._getFacilityId()
    };

    await this.props.postFormData(
      data,
      "FacilityServices",
      "POST",
      "POST_FACILITY_SERVICE",
      "saveMany"
    );
    setSubmitting(false);

    if (this.props.response) {
      this._resetForm();
      await this.props.fetchCurrentServices(await this._getFacilityId());
      alert("Service Successfully Created");
    }
  };

  _getFacilityId = async () => {
    const facilityId = this.props.fromAdd
      ? (await this.props.facility.id) || 1
      : Number(await this.props.match.params.id);
    return facilityId;
  };

  _remove = async id => {
    await this.props.deleteFromApi(
      id,
      "FacilityServices",
      "DELETE_FACILITY_SERVICE"
    );
    const response = await this.props.deleteServiceResponse;
    if (response.count > 0) {
      await this.props.fetchCurrentServices(await this._getFacilityId());
      alert("Service Successfully Deleted");
    }
  };

  _resetForm = () => {
    this.setState({
      selectedServiceType: -1,
      firstLevelService: -1,
      secondLevelService: -1,
      thirdLevelService: -1
    });
  };

  _filteredServices = category => {
    return this.props.services.filter(s => {
      const isServiceType =
        s.service_type_id === Number(this.state.selectedServiceType);
      const isOfCategory = s.service_category_id === Number(category);
      return isServiceType && isOfCategory;
    });
  };

  async componentDidMount() {
    await this.props.fetchCurrentServices(await this._getFacilityId());
  }

  render() {
    return (
      <div className="container">
        {this.state.cancelForm &&
          this.props.fromAdd && <Redirect to="/facilities" />}
        {this.state.cancelForm &&
          !this.props.fromAdd && (
            <Redirect
              to={`/facilities/${this.props.match.params.id}/services`}
            />
          )}
        <div className="mfl-tm-2" />
        <Formik
          onSubmit={this._handleChange}
          render={({handleSubmit, isSubmitting}) => (
            <div>
              <div className="row" style={{minHeight: 300}}>
                <div className="col m6 s12">
                  <Row>
                    <Input
                      s={12}
                      type="select"
                      value={this.state.selectedServiceType}
                      label="Select Service Type"
                      onChange={e =>
                        this.setState({
                          selectedServiceType: e.target.value,
                          firstLevelService: -1,
                          secondLevelService: -1,
                          thirdLevelService: -1
                        })
                      }
                    >
                      <option key="default" value="-1">
                        Select Service Type
                      </option>
                      {renderOptions(this.props.serviceTypes, "service_type")}
                    </Input>
                    {this.state.selectedServiceType > 0 && (
                      <Input
                        s={12}
                        type="select"
                        label="Select Service"
                        onChange={e =>
                          this.setState({
                            firstLevelService: e.target.value,
                            secondLevelService: -1,
                            thirdLevelService: -1
                          })
                        }
                      >
                        <option key="default" value="-1">
                          Select Sub Service
                        </option>
                        {renderOptions(
                          this._filteredServices(0),
                          "service_name"
                        )}
                      </Input>
                    )}
                  </Row>
                  <Row>
                    {this._filteredServices(this.state.firstLevelService)
                      .length > 0 && (
                      <Input
                        s={12}
                        type="select"
                        label="Select Sub Service"
                        onChange={e =>
                          this.setState({
                            secondLevelService: e.target.value,
                            thirdLevelService: -1
                          })
                        }
                      >
                        <option key="default" value="-1">
                          Select Sub-sub Service
                        </option>
                        {renderOptions(
                          this._filteredServices(this.state.firstLevelService),
                          "service_name"
                        )}
                      </Input>
                    )}
                    {this._filteredServices(this.state.secondLevelService)
                      .length > 0 && (
                      <Input
                        s={12}
                        type="select"
                        label="Select Sub-sub Service"
                        onChange={e =>
                          this.setState({thirdLevelService: e.target.value})
                        }
                      >
                        <option key="default" value="-1">
                          Select Sub Service
                        </option>
                        {renderOptions(
                          this._filteredServices(this.state.secondLevelService),
                          "service_name"
                        )}
                      </Input>
                    )}
                    <Row>
                      <Button
                        className="ml-6"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Add Service"}
                      </Button>
                    </Row>
                  </Row>
                </div>
                <div className="col m6 s12">
                  <h6 className="mb-4 flex items-center">
                    <i className="material-icons mr-4">verified_user</i>{" "}
                    Services
                  </h6>
                  {/* TODO: Should go in own component */}
                  {this.props.facilityServices &&
                    this.props.facilityServices
                      .filter((fs, i) => {
                        return (
                          i >= (this.state.pageNumber - 1) * 3 &&
                          i < this.state.pageNumber * 3
                        );
                      })
                      .map(fs => {
                        return (
                          <div className="p-4 mb-2 shadow w-full cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <strong>{fs.service.service_name}</strong>
                              </div>
                              <div>
                                <i
                                  className="material-icons mr-4"
                                  onClick={() =>
                                    this._remove(fs.facilityService.id)
                                  }
                                >
                                  close
                                </i>
                              </div>
                            </div>
                            {fs.children &&
                              fs.children.map(fs => {
                                return (
                                  <div>
                                    <div className="flex justify-between mt-4 ml-4">
                                      <div>{fs.service.service_name}</div>
                                      <div>
                                        <i
                                          className="material-icons mr-4"
                                          onClick={() =>
                                            this._remove(fs.facilityService.id)
                                          }
                                        >
                                          close
                                        </i>
                                      </div>
                                    </div>
                                    {fs.children &&
                                      fs.children.map(fs => {
                                        return (
                                          <div className="flex justify-between mt-4 ml-8">
                                            <div>{fs.service.service_name}</div>
                                            <div>
                                              <i
                                                className="material-icons mr-4"
                                                onClick={() =>
                                                  this._remove(
                                                    fs.facilityService.id
                                                  )
                                                }
                                              >
                                                close
                                              </i>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                  {(this.props.facilityServices &&
                    this.props.facilityServices.length) > 3 && (
                    <Pagination
                      items={
                        this.props.facilityServices
                          ? Math.ceil(this.props.facilityServices.length / 3)
                          : 0
                      }
                      activePage={this.state.pageNumber}
                      maxButtons={
                        this.props.facilityServices
                          ? Math.ceil(this.props.facilityServices.length / 3)
                          : 0
                      }
                      onSelect={number => this.setState({pageNumber: number})}
                      className="mt-4"
                    />
                  )}
                </div>
              </div>
              <FormWizardNavigation
                saveButton={this.props.fromAdd && "Next"}
                handleSubmit={this._publishFacility}
                handleCancel={() => this.setState({cancelForm: true})}
                isSubmitting={false}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    facilityServices: state.facilities.currentServices.hierarchy,
    response: state.facilities.servicesResponse,
    serviceTypes: state.dependancies.serviceTypes,
    services: state.facilities.services,
    deleteServiceResponse: state.facilities.deleteServiceResponse,
    patchResponse: state.facilities.patchResponse
  };
};

export default connect(
  mapStateToProps,
  {
    postFormData,
    fetchCurrentServices,
    deleteFromApi
  }
)(ServicesForm);
