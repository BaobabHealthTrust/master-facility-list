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
import { Row, Col, Card } from "react-materialize";
import { MflAlert } from "../../common";
import { Loader } from "../../common";
import styled from "styled-components";
import { isLoggedIn } from "../helpers/utilities";
import { DetailsCard } from "./components/DetailsCard";
import { redirectToEdit } from "./helpers";
import { ServicesContainer } from "./components/ServicesContainer";
import { chunk } from "lodash";

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

  _renderServices = servicesChunks =>
    servicesChunks.map(serviceChunk => (
      <Row>
        {serviceChunk.map(serviceHierachy => (
          <Col m={6} s={12}>
            <ServicesContainer
              key={serviceChunk.id}
              serviceHierachy={serviceHierachy}
            />
          </Col>
        ))}
      </Row>
    ));

  _getServicesHierachy = () =>
    this.props.services && this.props.serviceTypes
      ? this.props.serviceTypes
          .map(type => {
            return {
              ...type,
              services: this.props.services.filter(
                service => service.serviceType.id === type.id
              )
            };
          })
          .filter(serviceType => serviceType.services.length > 0)
      : [];

  render() {
    let servicesChunks = chunk(this._getServicesHierachy(), 3);
    return (
      <Row>
        <Col m={8} s={12} offset="m4">
          <DetailsCard
            isLoading={this.props.isLoading.fetchFacilityDetails}
            isLoggedIn={isLoggedIn()}
            title="Facility Services"
            btnText="Edit Services"
            onEditBtnClick={() => {
              redirectToEdit(this.props);
            }}
          >
            {this._renderServices(servicesChunks)}
          </DetailsCard>
        </Col>
      </Row>
      // <Container>
      //   {this.props.allServices.length == 0 && this._renderAlert()}

      //   {this.props.isLoading.fetchCurrentServices &&
      //   this.props.isLoading.fetchServiceTypes ? (
      //     <Loader />
      //   ) : (
      //     <Tabs
      //       style={{ position: "relative", zIndex: "1" }}
      //       className="tabs blue accent-1 mfl-tabs tabs-fixed-width"
      //     >
      //       {this.props.serviceTypes.map((type, index) =>
      //         this._renderServiceTab(type, index)
      //       )}
      //     </Tabs>
      //   )}
      // </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    facilities: state.facilities.list,
    services: state.facilities.currentServices.hierarchy,
    serviceTypes: state.dependancies.serviceTypes,
    allServices: state.facilities.services,
    isLoading: state.statusErrors.isLoading
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
