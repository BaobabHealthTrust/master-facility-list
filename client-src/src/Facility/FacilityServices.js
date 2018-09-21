//@flow
import React from "react";

import {
  fetchCurrentDetails,
  fetchCurrentServices,
  setCurrentDetails
} from "../actions";

import Container from "./ServicesContainer";
import { connect } from "react-redux";
import { Service, ServiceType } from "../types/model-types";
import { Tab, Tabs } from 'react-materialize';
import { Col, Card } from 'react-materialize';
import { MflAlert } from "../common"
import { Loader } from "../common";


type Props = {
  services: Array<{ service: Service }>,
  serviceTypes: any,
  allServices: Array<Service>
}

class FacilityServices extends React.Component<Props> {

  state = {
    isEditResources: false,
    loading: true
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) this.setState({
      loading: false
    })
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCurrentDetails(id);
    await this.props.fetchCurrentServices(id);
  }

  render() {
    return (
      <div className="container">
        {(this.props.allServices.length == 0) ? (
          <MflAlert
            message={'Services are not available for this facility'}
            />):""
        }
        {
          this.state.loading
          ? <Loader / >
          : (<Tabs className='tabs blue accent-1 mfl-tabs tabs-fixed-width'>
            {
              this.props.serviceTypes.map((type, index) => {
                return (
                  <Tab title={type.service_type} active={index == 0}>
                    {
                      this.props.services && this.props.services.filter(service => (
                        service.serviceType.id === type.id
                      )
                      ).map(tlService => {
                        return (
                          <Col m={4} s={12}>
                            <Card title={tlService.service.service_name}>
                              <ul>
                                {
                                  tlService.children.map(slService => {
                                    return (
                                      <li>
                                        <h6>{slService.service.service_name}</h6>
                                        <ul>
                                          {
                                            slService.children.map(tlService => (
                                              <li className='mt-4 ml-8'>
                                                > {tlService.service.service_name}
                                              </li>
                                            ))
                                          }
                                        </ul>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </Card>
                          </Col>
                        )
                      })
                    }
                  </Tab>
                )
              })
            }
          </Tabs>)
        }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    facilities: store.facilities.list,
    services: store.facilities.currentServices.hierarchy,
    serviceTypes: store.dependancies.serviceTypes,
    allServices: store.facilities.services,
    isLoading: store.facilities.isLoading
  };
};

// TODO: Services and others should go into reducer yake
export default connect(mapStateToProps, {
  setCurrentDetails,
  fetchCurrentDetails,
  fetchCurrentServices
})(FacilityServices);
