//@flow
import React, { Component } from "react";
import { Input, Navbar, NavItem, Row, Button } from "react-materialize";
import { connect } from "react-redux";
import { DatePicker, FormWizardNavigation } from '../../common';
import { BasicDetailsFormProps } from '../../types/helper-types';
import { Formik } from 'formik';
import { postFormData } from '../../actions';
import yup from 'yup';
import { renderOptions } from './helpers';
import { Service, ServiceType } from '../../types/model-types';

type Props = {
  response: any,
  serviceTypes: Array<ServiceType>,
  services: Array<Service>
}

class ServicesForm extends React.Component<Props> {
  // TODO: Ensure null safety for all default values
  state = {
    selectedServiceType: -1,
    firstLevelService: -1,
    secondLevelService: -1,
    thirdLevelService: -1
  }

  _handleChange = async (values, { setSubmitting, setErros }) => {

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
      firstLevelService === -1
    ) {
      alert("Please select a Subservice");
      setSubmitting(false);
      return;
    }

    if (
      secondLevelService === -1
      &&
      this._filteredServices(firstLevelService).length > 0
    ) {
      alert("Please select a Subservice");
      setSubmitting(false);
      return;
    }

    if (
      thirdLevelService === -1
      &&
      this._filteredServices(secondLevelService).length > 0
    ) {
      alert("Please select a Sub Sub Service");
      setSubmitting(false);
      return;
    }

    let service;


    if (Number(thirdLevelService) > 0) {
      service = thirdLevelService;
    }

    if (Number(secondLevelService) > 0) {
      service = secondLevelService;
    }

    if (Number(firstLevelService) > 0) {
      service = firstLevelService;
    }

    setSubmitting(false);
    alert(service);
    // await this.props.postFormData(
    //   { data: { ...values, client: 1 }, id: 1400 },
    //   "Facilities",
    //   "contactDetails",
    //   "POST",
    //   "POST_FACILITY_CONTACT_DETAILS"
    // );
    // await console.log(this.props.response);
    // if (this.props.response.response) this.props.onNext();
  }

  _filteredServices = (category) => {
    return this.props.services
      .filter(s => {
        const isServiceType = s.service_type_id === Number(this.state.selectedServiceType);
        const isOfCategory = s.service_category_id === Number(category)
        return isServiceType && isOfCategory
      })
  }

  render() {
    return (
      <div>
        <div className="mfl-tm-2" />
        <Formik
          onSubmit={this._handleChange}
          render={({
            handleSubmit,
            isSubmitting,
          }) => (
              <div>
                <div className="row" style={{ minHeight: 300 }}>
                  <div className="col m6 s12">
                    <Row>
                      <Input
                        s={12}
                        type="select"
                        label="Select Service Type"
                        onChange={(e) => this.setState({
                          selectedServiceType: e.target.value,
                          firstLevelService: -1,
                          secondLevelService: -1,
                          thirdLevelService: -1
                        })}
                      >
                        <option key="default" value="-1">Select Service Type</option>
                        {renderOptions(this.props.serviceTypes, "service_type", )}
                      </Input>
                      {
                        this.state.selectedServiceType > 0 && (
                          <Input
                            s={12}
                            type="select"
                            label="Select Service"
                            onChange={(e) => this.setState({
                              firstLevelService: e.target.value,
                              secondLevelService: -1,
                              thirdLevelService: -1
                            })}
                          >
                            <option key="default" value="-1">Select Sub Service</option>
                            {renderOptions(this._filteredServices(0), "service_name")}
                          </Input>
                        )
                      }
                    </Row>
                    <Row>
                      {
                        this._filteredServices(this.state.firstLevelService).length > 0 && (
                          <Input
                            s={12}
                            type="select"
                            label="Select Sub Service"
                            onChange={(e) => this.setState({
                              secondLevelService: e.target.value,
                              thirdLevelService: -1
                            })}
                          >
                            <option key="default" value="-1">Select Sub-sub Service</option>
                            {renderOptions(this._filteredServices(this.state.firstLevelService), "service_name")}
                          </Input>
                        )
                      }
                      {
                        this._filteredServices(this.state.secondLevelService).length > 0 && (
                          <Input
                            s={12}
                            type="select"
                            label="Select Sub-sub Service"
                            onChange={(e) => this.setState({ thirdLevelService: e.target.value })}
                          >
                            <option key="default" value="-1">Select Sub Service</option>
                            {renderOptions(this._filteredServices(this.state.secondLevelService), "service_name")}
                          </Input>
                        )
                      }
                      <Row>
                        <Button
                          className="mfl-rm-5 green"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Adding..." : "Add Service"}
                        </Button>
                      </Row>
                    </Row>
                  </div>
                  <div className="col m6 s12" style={{ padding: 30 }}>
                    Change stuff here
                </div>
                </div>
                < FormWizardNavigation
                  handleSubmit={() => alert('Nexting...')}
                  isSubmitting={(isSubmitting)}
                />
              </div>
            )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    response: state.facilities.resourcesResponse,
    serviceTypes: state.dependancies.serviceTypes,
    services: state.facilities.services
  }
}

export default connect(mapStateToProps, {
  postFormData
})(ServicesForm);
