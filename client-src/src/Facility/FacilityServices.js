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

type Props = {
  services: Array<{ service: Service }>,
  serviceTypes: Array<ServiceType>
}

class FacilityServices extends React.Component<Props> {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCurrentDetails(id);
    await this.props.fetchCurrentServices(id);
  }

  render() {
    const clinicalServices = this.props.services.filter(service => {
      return (
        service.service.serviceType.service_type.toUpperCase() ===
        "CLINICAL SERVICES"
      );
    });
    // TODO: Fix odd issue when loading tabs
    return (
      <div className="container">
        <Tabs className='tabs blue accent-1 mfl-tabs tabs-fixed-width '>
          {
            this.props.serviceTypes.map((type, index) => {
              return (
                <Tab title={type.service_type} active={index == 0}>
                  {
                    <div className="col s12 mt-4">
                      <Container facilityType={type.service_type} services={this.props.services.filter(service => {
                        return service.service.service_type_id === type.id
                      })}
                      />
                    </div>
                  }
                </Tab>
              )
            })
          }
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    facilities: store.facilities.list,
    services: store.facilities.currentServices,
    serviceTypes: store.dependancies.serviceTypes
  };
};

export default connect(mapStateToProps, {
  setCurrentDetails,
  fetchCurrentDetails,
  fetchCurrentServices
})(FacilityServices);
