import React, { Component, Fragment } from "react";
import Card from "../../common/MflCard";
import {
  fetchCurrentDetails,
  fetchCurrentUtilities,
  fetchUtilityTypes,
  setCurrentDetails,
  addFormValues,
  postFormData,
  editFacilityDependancies
} from "../../actions";
import { connect } from "react-redux";
import { Utilities as UtilitiesForm } from "../Forms";
import { uniq, chunk, map, pull } from "lodash";
import { MflAlert } from "../../common";
import { Loader } from "../../common";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Row, Col } from "react-materialize";
import { Link } from "react-router-dom";
import settings from "../../settings";
import FacilityDetail from "./components/FacilityDetail";
import { isLoggedIn } from "../helpers/utilities";
import { DetailsCard } from "./components/DetailsCard";
import { redirectToEdit } from "./helpers";
import EmptyState from "../../common/EmptyState";

const CardContent = styled.div.attrs({
  className: "row"
})`
  padding: 10px 0px;
`;

const CardTitle = styled.div.attrs({
  className: "mfl-card-title  bg-blue"
})``;

const Container = styled.div.attrs({
  className: "container"
})``;

const UtilityCard = styled.div.attrs({
  className: "col m4 s12"
})``;

class Utilities extends Component {
  state = {
    isEditUtilities: false,
    loading: true
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading)
      this.setState({
        loading: false
      });
  }

  submitEditUtilityData = async () => {
    const facilityId = this.props.match.params.id;
    const token = sessionStorage.getItem("token");
    const resourceName = "FacilityUtilities/";
    const actionType = "EDIT_FACILITY_UTILITY_DATA";
    const oldUtilityData = map(this.props.utilities, "id");
    await oldUtilityData.map(id => {
      this.props.editFacilityDependancies(id, resourceName, actionType);
    });

    const newUtilityData = this.props.formValues.utilities.map(utility => {
      return Object.assign(
        {},
        {
          facility_id: facilityId,
          utility_id: utility
        }
      );
    });

    const resource = "/FacilityUtilities";
    const method = "post";
    const actionName = "POST_FORM_FACILITY_UTILITY_DATA";
    await this.props.postFormData(
      newUtilityData,
      resource,
      method,
      actionName,
      token
    );
    if (this.props.postResponse.facilityUtilityResponse.status === 200) {
      await this.props.fetchCurrentUtilities(facilityId);
      this.setState({ isEditUtilities: false });
      await this.props.addFormValues("", "REMOVE_ALL_FORM_VALUES");
    }
  };

  toggleEditUtilities = () => {
    this.setState({ isEditUtilities: true });
  };

  handleCancel = () => {
    this.props.addFormValues("", "REMOVE_ALL_FORM_VALUES");
    this.setState({ isEditUtilities: false });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCurrentDetails(id);
    await this.props.fetchUtilityTypes();
    await this.props.fetchCurrentUtilities(id);
  }

  _renderAlert() {
    return (
      <MflAlert message={"Utilities are not available for this facility"} />
    );
  }
  _getPresentTypes = (utilities, utilityTypes) =>
    utilityTypes.filter(utilType => {
      return uniq(utilities.map(util => util.utility.utility_type_id)).includes(
        utilType.id
      );
    });

  _getUtilitiesByType = (type, utilities) =>
    utilities
      .filter(util => util.utility.utility_type_id === type.id)
      .map(util => [util.utility.utility_name]);

  _renderCardForUtilityType = (type, utilities) => {
    var data = this._getUtilitiesByType(type, utilities);
    return (
      <Col m={4} s={12} className="mb-5" key={data[0]}>
        <SectionTitle
          icon={this.getUtilityTypeIcon(type.utility_type)}
          text={type.utility_type}
        />
        {data.map(data => (
          <FacilityDetail key={data[0]} label={data[0]} text={data[1]} />
        ))}
      </Col>
    );
  };

  _renderCardsRows = (cardsChunks, utilities) => (
    <Fragment>
      {cardsChunks.length == 0 && (
        <Col m={12} s={12} className="mb-5">
          {<EmptyState resource="Utilities" />}
        </Col>
      )}
      {cardsChunks.map((card, index) => {
        return (
          <Row key={index}>
            {card.map(type => this._renderCardForUtilityType(type, utilities))}
          </Row>
        );
      })}
    </Fragment>
  );
  getUtilityTypeIcon(utilityType) {
    switch (utilityType.toUpperCase()) {
      case "ENERGY PROVIDER":
        return "lightbulb_outline";
      case "WATER PROVIDER":
        return "opacity";
      case "WASTE DISPOSAL":
        return "wc";
      case "NETWORK PROVIDER":
        return "wifi";
      default:
        return "local_hospital";
    }
  }

  render() {
    const { utilities, utilityTypes } = this.props;
    const presentTypes =
      utilities && utilityTypes
        ? this._getPresentTypes(utilities, utilityTypes)
        : [];
    const cardsChunks = chunk(presentTypes, 3);

    return (
      <Row>
        <Col m={8} s={12} offset="m4">
          <DetailsCard
            isLoading={this.props.isLoading.fetchFacilityDetails}
            isLoggedIn={isLoggedIn()}
            title="Facility Utilities"
            btnText="Edit Utilities"
            onEditBtnClick={() => {
              redirectToEdit(this.props);
            }}
          >
            {this._renderCardsRows(cardsChunks, utilities)}
          </DetailsCard>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    utilities: state.facilities.currentUtilities.data,
    facilities: state.facilities.list,
    isLoading: state.statusErrors.isLoading,
    utilityTypes: state.dependancies.utilityTypes,
    postResponse: state.postResponse,
    formValues: state.formValues
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCurrentUtilities,
    fetchCurrentDetails,
    setCurrentDetails,
    fetchUtilityTypes,
    addFormValues,
    postFormData,
    editFacilityDependancies
  }
)(Utilities);
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
