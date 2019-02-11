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
import { UtilitiesForm } from "../components";
import { uniq, chunk, map, pull } from "lodash";
import { MflAlert } from "../../common";
import { Loader } from "../../common";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: "container"
})``;

const UtilityCard = styled.div.attrs({
  className: "col m4 s12"
})``;

const Row = styled.div.attrs({
  className: "row"
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
    utilityTypes.filter(util =>
      uniq(utilities.map(util => util.utilities.utility_type_id)).includes(
        util.id
      )
    );
  _getUtilitiesByType = (type, utilities) =>
    utilities
      .filter(util => util.utility.utility_type_id === type.id)
      .map(util => [util.utility.utility_name]);

  _renderCardForUtilityType = (type, utilities) => {
    var data = this._getUtilitiesByType(type, utilities);
    return (
      <UtilityCard key={data[0]}>
        <Card
          heading={type.utility_type}
          data={data}
          icon={this.getUtilityTypeIcon(type.utility_type)}
        />
      </UtilityCard>
    );
  };
  _renderCardsRows = (cardsChunks, utilities) => (
    <Fragment>
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
    const presentTypes = utilities
      ? this._getPresentTypes(utilities, utilityTypes)
      : [];

    const cardsChunks = chunk(presentTypes, 3);

    return (
      <Container>
        {cardsChunks.length == 0 && this._renderAlert()}
        {this.state.loading ? (
          <Loader />
        ) : (
          <Fragment>
            {!this.state.isEditUtilities ? (
              this._renderCardsRows(cardsChunks, utilities)
            ) : (
              <UtilitiesForm
                submitUtilityData={this.submitEditUtilityData}
                isEditUtilities={this.state.isEditUtilities}
                currentUtilities={utilities}
                handleCancel={this.handleCancel}
              />
            )}
          </Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    utilities: state.facilities.currentUtilities.data,
    facilities: state.facilities.list,
    isLoading: state.facilities.isLoading,
    utilityTypes: state.dependancies.utilityTypes,
    postResponse: state.postResponse,
    formValues: state.formValues,
    isLoading: state.facilities.isLoading
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
