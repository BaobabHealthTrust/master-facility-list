import React, { Component, Fragment } from "react";

import {
  BarChart,
  PieChart,
  DashboardSummary,
  FacilitySummaryCard
} from "./components";
import FacilitiesMap from "../Features/FacilitiesMap";
import { connect } from "react-redux";
import {
  FacilityService,
  Facility,
  Owner,
  OperationalStatus,
  RegulatoryStatus,
  FacilityType
} from "../types/model-types";
import { kids } from "../images";
import { Button } from "react-materialize";
import footerResizer from "../helpers/footerResize";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  removeSearchValues,
  addSearchValues,
  toggleAdvancedSearch
} from "../actions";

type Props = {
  fetchDashboardFacilityServices: Function,
  fetchServices: Function,
  fetchFacilities: Function,
  fetchFacilityOwners: Function,
  fetchFacilityTypes: Function,
  fetchOperationalStatuses: Function,
  fetchRegulatoryStatuses: Function,
  facilityServices: Array<FacilityService>,
  allFacilities: Array<Facility>,
  owners: Array<Owner>,
  facilityTypes: Array<FacilityType>,
  regulatoryStatuses: Array<RegulatoryStatus>,
  operationalStatuses: Array<OperationalStatus>,
  results: number[],
  isSearchValuesEmpty: boolean,
  total: number[],
  dependancyIsLoading: boolean,
  dependancyIsNetworkError: boolean,
  onClick: Function
};

type State = {
  dashboardServices: Array<{ id: number, displayName: string, icon: string }>,
  districts: Array<String>
};

const Container = styled.div`
  margin-left: 0.75rem;
  margin-right: 0.75rem;
`;
const MapContainer = styled.div.attrs({
  className: "col s12 m3 hide-on-small-only"
})`
  position: sticky;
  top: 10px;
`;

const WelcomeCardContainer = styled.div.attrs({ className: "row" })`
  position: sticky;
  top: -50px;
  z-index: 100;
`;
const CallToAction = styled.div.attrs({ className: "w-full p-8 mb-8" })`
  background: rgba(43, 43, 104, 1);
  background-image: url(${kids});
  background-blend-mode: overlay;
  background-position-y: center;
  color: white;
`;
const OuterChartSurface = styled.div.attrs({ className: "" })``;

// TODO: Codes for All Dependancies

class DashboardHome extends Component<Props, State> {
  state = {
    districts: [],
    name: "",
    typeOwnershipContainerWidth: 0,
    regulatoryStatusContainerWidth: 0,
    operationalStatusContainerWidth: 0
  };

  calculateContainerWidth = selector => {
    const container = document.getElementById(selector);
    const containerWidth = container ? container.clientWidth : 1000;
    return containerWidth;
  };

  resizeDashBoard = () => {
    const typeOwnershipContainerWidth = this.calculateContainerWidth(
      "typeOwnershipContainer"
    );
    const regulatoryStatusContainerWidth = this.calculateContainerWidth(
      "regulatoryStatusContainer"
    );
    const operationalStatusContainerWidth = this.calculateContainerWidth(
      "operationalStatusContainer"
    );
    this.setState({
      typeOwnershipContainerWidth,
      regulatoryStatusContainerWidth,
      operationalStatusContainerWidth
    });
  };

  facilityDistrictFilter = facility => {
    if (this.state.districts.length == 0) return true;
    return this.state.districts.includes(facility.district);
  };

  facilitiesOfType = (facilityType: string) => {
    const data = this.props.allFacilities.data;
    return data
      ? data
          .filter(facility => facility.type == facilityType)
          .filter(this.facilityDistrictFilter).length
      : 0;
  };

  generateBarChartData = (comparisonModel, comparisonField, facilityField) => {
    const data = this.props.allFacilities.data;
    if (data) {
      return this.props[comparisonModel].map(model => {
        return {
          name: model[comparisonField],
          count: data
            .filter(
              facility => facility[facilityField] == model[comparisonField]
            )
            .filter(this.facilityDistrictFilter).length
        };
      });
    }
    return [];
  };

  ownershipBarData = () => {
    const data = this.generateBarChartData(
      "owners",
      "facility_owner",
      "ownership"
    );
    const requiredOwners = [
      "Christian Health Association of Malawi (CHAM)",
      "Government/public",
      "Private for profit"
    ];
    const mainOwnerShips = data.filter(d => requiredOwners.includes(d.name));
    const otherOwnershipsCount = data
      .filter(d => !requiredOwners.includes(d.name))
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
      }, 0);
    return [...mainOwnerShips, { name: "Other", count: otherOwnershipsCount }];
  };
  regulatoryBarData = () => {
    const data = this.generateBarChartData(
      "regulatoryStatuses",
      "facility_regulatory_status",
      "regulatoryStatus"
    );

    const registered = data
      .filter(val => val.name == "Registered")
      .reduce((acc, cur) => Number(acc) + Number(cur.count), 0);

    const notRegistered = data
      .filter(val => val.name == "Not Registered")
      .reduce((acc, cur) => Number(acc) + Number(cur.count), 0);

    const pending = data
      .filter(val => val.name != "Registered" && val.name != "Not Registered")
      .reduce((acc, cur) => Number(acc) + Number(cur.count), 0);

    return [
      { name: "Registered", value: registered },
      { name: "Pending", value: notRegistered },
      { name: "Not Registered", value: pending }
    ];
  };

  operationalBarData = () => {
    const data = this.generateBarChartData(
      "operationalStatuses",
      "facility_operational_status",
      "status"
    );

    const opened = data
      .filter(val => val.name == "Functional")
      .reduce((acc, cur) => Number(acc) + Number(cur.count), 0);

    const tempClosed = data
      .filter(val => val.name == "Closed (Temporary)")
      .reduce((acc, cur) => Number(acc) + Number(cur.count), 0);

    const closed = data
      .filter(
        val => val.name != "Functional" && val.name != "Closed (Temporary)"
      )
      .reduce((acc, cur) => Number(acc) + Number(cur.count), 0);

    return [
      { name: "Functional", value: opened },
      { name: "Closed (Temporary)", value: tempClosed },
      { name: "Closed", value: closed }
    ];
  };

  totalFacilities = () =>
    this.props.allFacilities.data
      ? this.props.allFacilities.data.filter(this.facilityDistrictFilter).length
      : 0;

  closeTag = async event => {
    const district = event.target.id;
    const districts = await this.state.districts.filter(d => d != district);
    await this.setState({ districts });
  };

  onSummaryCardClick = (facilityType = "all") => {
    this.props.removeSearchValues(null, "REMOVE_ALL_SEARCH_VALUES");

    if (facilityType != "all") {
      facilityType = this.props.facilityTypes.filter(
        type => type.facility_type == facilityType
      )[0];
      let val = {
        type: "facilityTypes",
        id: facilityType.id,
        label: facilityType.facility_type
      };
      if (!this.props.advancedSearchOpen) this.props.toggleAdvancedSearch();
      this.props.addSearchValues(val, "ADD_ADVANCED_SEARCH_VALUE");
    }

    this.props.history.push("/facilities");
  };

  onMapClick = async event => {
    const district = event.target.id;
    if (this.state.districts.includes(district)) {
      const districts = this.state.districts.filter(d => d != district);
      await this.setState({ districts });
    } else {
      const districts = [...this.state.districts, district];
      await this.setState({ districts });
    }
  };

  async componentDidMount() {
    window.addEventListener("resize", this.resizeDashBoard);
    this.resizeDashBoard();
  }

  componentWillReceiveProps() {
    footerResizer();
  }

  _renderMap = () => (
    <MapContainer>
      <FacilitiesMap
        onClick={this.onMapClick}
        districts={this.state.districts}
        height={680}
      />
    </MapContainer>
  );

  _renderWelcomeContainer = () => (
    <WelcomeCardContainer>
      <div className="col s12">
        <DashboardSummary
          closeTag={this.closeTag}
          districts={this.state.districts}
        />
      </div>
    </WelcomeCardContainer>
  );

  _renderFacilitySummaryCards = () => (
    <div className="row">
      <FacilitySummaryCard
        count={this.totalFacilities()}
        title="Total Facilities"
        icon="hospital"
        onClick={() => this.onSummaryCardClick()}
      />
      <FacilitySummaryCard
        count={this.facilitiesOfType("District Hospital")}
        title="Dist Hospitals"
        icon="district"
        onClick={() => this.onSummaryCardClick("District Hospital")}
      />
      <FacilitySummaryCard
        count={this.facilitiesOfType("Health Centre")}
        title="Health Centres"
        icon="normal_hospital"
        onClick={() => this.onSummaryCardClick("Health Centre")}
      />
      <FacilitySummaryCard
        count={this.facilitiesOfType("Dispensary")}
        title="Dispensaries"
        icon="clinic"
        onClick={() => this.onSummaryCardClick("Dispensary")}
      />
      <FacilitySummaryCard
        count={this.facilitiesOfType("Health Post")}
        title="Health Posts"
        icon="tent"
        onClick={() => this.onSummaryCardClick("Health Post")}
      />
    </div>
  );

  _renderCallToAction = () => (
    <div className="col m12">
      <CallToAction>
        <Link to="/facilities/search">
          <Button>Go to Advanced Search</Button>
        </Link>
        <span className="ml-4 text-2xl">
          For a more detailed analysis of Facilities
        </span>
      </CallToAction>
    </div>
  );
  _renderRegulatoryChart = () => (
    <div className="col s12 m6" id="regulatoryStatusContainer">
      <OuterChartSurface>
        <PieChart
          title="Facilities By License Status"
          colorIndex={2}
          data={this.regulatoryBarData()}
          width={this.state.regulatoryStatusContainerWidth}
        />
      </OuterChartSurface>
    </div>
  );

  _renderOperationalStatusChart = () => (
    <div className="col s12 m6" id="operationalStatusContainer">
      <OuterChartSurface>
        <PieChart
          title="Facilities By Operational Status"
          data={this.operationalBarData()}
          width={this.state.operationalStatusContainerWidth}
        />
      </OuterChartSurface>
    </div>
  );

  _renderOwnershipStatusChart = () => (
    <div className="col s12" id="typeOwnershipContainer">
      <OuterChartSurface>
        <BarChart
          title="Facilities By Ownership"
          colorIndex={2}
          data={this.ownershipBarData()}
          width={this.state.typeOwnershipContainerWidth}
        />
      </OuterChartSurface>
    </div>
  );
  render() {
    return (
      <Container>
        <div className="row pt-6">
          {this._renderMap()}
          <div className="col s12 m9">
            {this._renderWelcomeContainer()}

            {this._renderFacilitySummaryCards()}

            <div className="row hide-on-small-only">
              {this._renderRegulatoryChart()}

              {this._renderOperationalStatusChart()}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = store => {
  return {
    allFacilities: store.facilities.all,
    owners: store.dependancies.facilityOwners,
    operationalStatuses: store.dependancies.operationalStatuses,
    regulatoryStatuses: store.dependancies.regulatoryStatuses,
    dependancyIsLoading: store.dependancies.isLoading,
    dependancyIsNetworkError: store.dependancies.isNetworkError,
    facilityTypes: store.dependancies.facilityTypes,
    advancedSearchOpen: store.ui.advancedSearchOpen
  };
};

export default connect(
  mapStateToProps,
  { removeSearchValues, addSearchValues, toggleAdvancedSearch }
)(DashboardHome);
