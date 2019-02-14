//@flow
import React from "react";

import {
  fetchCurrentDetails,
  fetchCurrentServices,
  setCurrentDetails
} from "../../actions";

import { connect } from "react-redux";
import { Service, ServiceType } from "../../types/model-types";
import { Tab, Tabs } from "react-materialize";
import { Col, Card } from "react-materialize";
import { MflAlert } from "../../common";
import { Loader } from "../../common";

type Props = {
  services: Array<{ service: Service }>,
  serviceTypes: any,
  allServices: Array<Service>
};

class Services extends React.Component<Props> {
  state = {
    isEditResources: false,
    loading: true
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading)
      this.setState({
        loading: false
      });
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCurrentDetails(id);
    await this.props.fetchCurrentServices(id);
  }
  _renderAlert = () => (
    <MflAlert message={"Services are not available for this facility"} />
  );
  _renderService = tlService => (
    <Card title={tlService.service.service_name}>
      <ul>
        {tlService.children.map(slService => {
          return (
            <li>
              <h6>{slService.service.service_name}</h6>
              <ul>
                {slService.children.map(tlService => (
                  <li className="mt-4 ml-8">
                    > {tlService.service.service_name}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Card>
  );
  _renderServiceTab = (type, key) => (
    <Tab key={key} title={type.service_type} active={key == 0}>
      {this.props.services &&
        this.props.services
          .filter(service => service.serviceType.id === type.id)
          .map((tlService, index) => {
            return (
              <Col key={index} m={4} s={12}>
                {this._renderService(tlService)}
              </Col>
            );
          })}
    </Tab>
  );

  render() {
    return (
      <div className="container">
        {this.props.allServices.length == 0 && this._renderAlert()}

        {this.state.loading ? (
          <Loader />
        ) : (
          <Tabs className="tabs blue accent-1 mfl-tabs tabs-fixed-width">
            {this.props.serviceTypes.map((type, index) =>
              this._renderServiceTab(type, index)
            )}
          </Tabs>
        )}
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
export default connect(
  mapStateToProps,
  {
    setCurrentDetails,
    fetchCurrentDetails,
    fetchCurrentServices
  }
)(Services);
