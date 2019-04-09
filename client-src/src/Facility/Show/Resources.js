//@flow
import React, { Component, Fragment } from "react";
import Card from "../../common/MflCard";
import {
  fetchCurrentDetails,
  fetchCurrentResources,
  fetchResourceTypes,
  setCurrentDetails
} from "../../actions";
import { connect } from "react-redux";
import { uniq, chunk } from "lodash";
import { Resource, Facility, ResourceType } from "../../types/model-types";
import { MflAlert } from "../../common";
import { Loader } from "../../common";
import styled from "styled-components";

type Props = {
  resources: Array<Resource>,
  facilities: Array<Facility>,
  resourceTypes: Array<ResourceType>
};

const Container = styled.div.attrs({
  className: "container"
})``;

const ResourceCard = styled.div.attrs({
  className: "col m4 s12"
})``;

const Row = styled.div.attrs({
  className: "row"
})``;

class Resources extends Component<Props> {
  state = {
    isEditResources: false,
    error: {},
    loading: true
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCurrentDetails(id);
    await this.props.fetchResourceTypes();
    await this.props.fetchCurrentResources(id);
  }

  getResourceTypeIcon(resourceType) {
    switch (resourceType.toUpperCase()) {
      case "TRANSPORT":
        return "directions_bus";
      case "BEDS":
        return "airline_seat_individual_suite";
      case "GENERATORS":
        return "flash_off";
      case "COMPUTERS":
        return "computer";
      case "HOUSING":
        return "home";
      default:
        return "local_hospital";
    }
  }

  _renderAlert() {
    return (
      <MflAlert message={"Resources are not available for this facility"} />
    );
  }

  _getResourcesByType = (type, resources) =>
    resources
      .filter(res => res.resource.resource_type_id === type.id)
      .map(res => [res.resource.resource_name, String(res.quantity)]);

  _renderCardForResourceType = (type, resources) => {
    var data = this._getResourcesByType(type, resources);
    return (
      <ResourceCard key={data[0]}>
        <Card
          heading={type.resource_type}
          data={data}
          icon={this.getResourceTypeIcon(type.resource_type)}
        />
      </ResourceCard>
    );
  };

  _renderCardsRows = (cardsChunks, resources) => (
    <Fragment>
      {cardsChunks.map((card, index) => {
        return (
          <Row key={index}>
            {card.map(type => this._renderCardForResourceType(type, resources))}
          </Row>
        );
      })}
    </Fragment>
  );

  _getPresentTypes = (resources, resourceTypes) =>
    resourceTypes.filter(res =>
      uniq(resources.map(res => res.resource.resource_type_id)).includes(res.id)
    );

  render() {
    const { resources, resourceTypes } = this.props;
    const presentTypes = resources
      ? this._getPresentTypes(resources, resourceTypes)
      : [];

    const cardsChunks = chunk(presentTypes, 3);

    return (
      <Container>
        {cardsChunks.length == 0 && this._renderAlert()}
        {this.props.isLoading.fetchCurrentResources &&
        this.props.isLoading.fetchResourceTypes ? (
          <Loader />
        ) : (
          this._renderCardsRows(cardsChunks, resources)
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    resources: state.facilities.currentResources.data,
    facilities: state.facilities.list,
    isLoading: state.statusErrors.isLoading,
    error: state.facilities.error,
    resourceTypes: state.dependancies.resourceTypes
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCurrentResources,
    fetchCurrentDetails,
    setCurrentDetails,
    fetchResourceTypes
  }
)(Resources);
