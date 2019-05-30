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
import { Paper } from "@material-ui/core";
import { Row, Col } from "react-materialize";
import { Link } from "react-router-dom";
import FacilityDetail from "./components/FacilityDetail";
import { isLoggedIn } from "../helpers/utilities";
import { DetailsCard } from "./components/DetailsCard";
import { redirectToEdit } from "./helpers";

const CardContent = styled.div.attrs({
  className: "row"
})`
  padding: 10px 0px;
`;

const CardTitle = styled.div.attrs({
  className: "mfl-card-title  bg-blue"
})``;

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
      <Col m={4} s={12} className="mb-5" key={data[0]}>
        <SectionTitle
          icon={this.getResourceTypeIcon(type.resource_type)}
          text={type.resource_type}
        />
        {data.map(data => (
          <FacilityDetail key={data[0]} label={data[0]} text={data[1]} />
        ))}
      </Col>
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
      <Row>
        <Col m={8} s={12} offset="m4">
          <DetailsCard
            isLoading={this.props.isLoading.fetchFacilityDetails}
            isLoggedIn={isLoggedIn()}
            title="Facility Resources"
            btnText="Edit Resources"
            onEditBtnClick={() => {
              redirectToEdit(this.props);
            }}
          >
            {this._renderCardsRows(cardsChunks, resources)}
          </DetailsCard>
        </Col>
      </Row>
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

function Button(props) {
  const { color, icon, text } = props;
  const buttonClass = props.margin
    ? `waves-effect btn`
    : `mr-3 waves-effect btn`;
  return props.link ? (
    <Link
      className={buttonClass}
      to={props.link}
      style={{ backgroundColor: color }}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  ) : (
    <Link
      className={buttonClass}
      style={{ backgroundColor: color }}
      to="#"
      onClick={() => props.onClick()}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  );
}

function SectionTitle(props) {
  return (
    <div
      style={{
        paddingBottom: "10px",
        borderBottom: "1px solid gray",
        marginBottom: "10px"
      }}
    >
      <i
        className="material-icons"
        style={{
          display: "inline-block",
          padding: "0 0.5rem",
          verticalAlign: "middle",
          fontSize: "20px"
        }}
      >
        {props.icon}
      </i>
      <b>{props.text}</b>
    </div>
  );
}
