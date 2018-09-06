import React from "react";

import {
  FacilitiesByTypeAndOwnership,
  FacilitiesByLicensingStatus,
  FacilitiesByOperationalStatus,
  FacilitiesMap
} from "./charts";

import { connect } from "react-redux";

import {
  FacilityService,
  Facility,
  Owner,
  OperationalStatus,
  RegulatoryStatus,
  FacilityType
} from "../types/model-types";

import { map, uniq, isEmpty, intersection } from "lodash";

import {
  fetchFacilityOwners,
  fetchFacilityTypes,
  fetchOperationalStatuses,
  fetchRegulatoryStatuses,
  fetchServices,
  fetchFacilities,
  fetchDashboardFacilityServices,
  operationalStatuses,
  regulatoryStatuses,
  facilitiesWithService,
  fetchTotalFacilities,
  facilityTypeAndOwnership
} from "../actions";
import footerResizer from "../helpers/footerResize";
import DashboardSummary from "./dashboardSummary";
import { GenericCard } from "./charts/mini-cards";
import styled from "styled-components";

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

const MapContainer = styled.div.attrs({ className: "col s12 m3" })`
  position: sticky;
  top: 10px;
`

const WelcomeCardContainer = styled.div.attrs({ className: "row" })`
  position: sticky;
  top: -50px;
  z-index: 100;
  background: white;
`

// TODO: Codes for All Dependancies

class DashboardHome extends React.Component<Props, State> {

  state = {
    districts: [],
    name: '',
    typeOwnershipContainerWidth: 0,
    regulatoryStatusContainerWidth: 0,
    operationalStatusContainerWidth: 0
  };

  calculateContainerWidth = (selector) => {
    const container = document.getElementById(selector);
    const containerWidth = container ? container.clientWidth : 1000;
    return containerWidth;
  }

  resizeDashBoard = () => {
    const typeOwnershipContainerWidth = this.calculateContainerWidth('typeOwnershipContainer');
    const regulatoryStatusContainerWidth = this.calculateContainerWidth('regulatoryStatusContainer');
    const operationalStatusContainerWidth = this.calculateContainerWidth('operationalStatusContainer');
    this.setState({
      typeOwnershipContainerWidth,
      regulatoryStatusContainerWidth,
      operationalStatusContainerWidth
    });
  }

  updateGraphs = () => {
    this.props.regulatoryStatuses(this.state.districts);
    this.props.operationalStatuses(this.state.districts);
    this.props.facilityTypeAndOwnership(this.state.districts);
    this.props.fetchTotalFacilities(this.state.districts);
    this.props.facilitiesWithService('Injectable', 'FETCH_FACILITIES_WITH_OPD', this.state.districts);
    this.props.facilitiesWithService('Treatment of severe diarrhoea (IV Fluids)', 'FETCH_FACILITIES_WITH_ANC', this.state.districts);
    this.props.facilitiesWithService('Vitamin A supplementation in infants and children 6-59 months', 'FETCH_FACILITIES_WITH_HTC', this.state.districts);
    this.props.facilitiesWithService('Rapid Diagnostic Test (MRDT) ', 'FETCH_FACILITIES_WITH_ART', this.state.districts);
  }

  closeTag = async (event) => {
    const district = event.target.id
    const districts = await this.state.districts.filter(d => d != district)
    await this.setState({ districts })
    await this.updateGraphs()
  }

  onClick = async (event) => {
    const district = event.target.id;
    if (this.state.districts.includes(district)) {
      const districts = this.state.districts.filter(d => d != district);
      await this.setState({ districts });
    } else {
      const districts = [...this.state.districts, district];
      await this.setState({ districts });
    }
    this.updateGraphs()
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resizeDashBoard)
    this.resizeDashBoard();
    await this.props.fetchFacilities();
    await this.props.fetchOperationalStatuses();
    await this.props.fetchRegulatoryStatuses();
    await this.updateGraphs();
    await this.props.fetchDashboardFacilityServices(
      map(this.state.dashboardServices, "id")
    );

    await this.updateGraphs();
  }

  componentWillReceiveProps() {
    footerResizer();
  }

  render() {

    return (
      <div>
        <div className="row mt-6">
          <MapContainer>
            <FacilitiesMap onClick={this.onClick} districts={this.state.districts} height={600} />
          </MapContainer>
          <div className="col s12 m9">
            <WelcomeCardContainer>
              <div className="col s12">
                <DashboardSummary closeTag={this.closeTag} districts={this.state.districts} />
              </div>
            </WelcomeCardContainer>
            <div className="row">
              <div className="col s12 l3 col-5">
                <GenericCard count={this.props.totalFacilities} title="Total Facilities" icon="hospital" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.props.facilitiesWithANC.length} title="With ANC" icon="maternity" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.props.facilitiesWithHTC.length} title="With HTC" icon="bloodTest" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.props.facilitiesWithOPD.length} title="With OPD" icon="patient" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.props.facilitiesWithART.length} title="With ART" icon="ribbon" />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6" id="regulatoryStatusContainer">
                <div class="outer-recharts-surface">
                  <FacilitiesByLicensingStatus
                    data={this.props.facilitiesByRegulatoryStatus}
                    width={this.state.regulatoryStatusContainerWidth}
                  />
                </div>
              </div>
              <div className="col s12 m6" id="operationalStatusContainer">
                <div className="outer-recharts-surface">
                  <FacilitiesByOperationalStatus
                    data={this.props.facilitiesByOperationalStatus}
                    width={this.state.operationalStatusContainerWidth}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div class="col s12" id="typeOwnershipContainer">
                <div class="outer-recharts-surface">
                  <FacilitiesByTypeAndOwnership
                    data={this.props.facilitiesByTypeAndOwnership}
                    keys={this.props.facilitiesByTypeAndOwnershipKeys}
                    width={this.state.typeOwnershipContainerWidth}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = store => {
  return {
    facilityServices: store.dashboardStatistics.facilityServices,
    services: store.dependancies.services,
    facilitiesByRegulatoryStatus: store.facilities.facilitiesByRegulatoryStatus,
    facilitiesByOperationalStatus: store.facilities.facilitiesByOperationalStatus,
    allFacilities: store.facilities.all,
    owners: store.dependancies.facilityOwners,
    facilityTypes: store.dependancies.facilityTypes,
    operationalStatuses: store.dependancies.operationalStatuses,
    regulatoryStatuses: store.dependancies.regulatoryStatuses,
    isSearchValuesEmpty: isEmpty(
      map({
        districtValues: store.advancedSearchValues.districtValues,
        operationalStatusValues:
          store.advancedSearchValues.operationalStatusValues,
        facilityTypeValues:
          store.advancedSearchValues.facilityTypeValues,
        facilityOwnerValues:
          store.advancedSearchValues.facilityOwnerValues,
        regulatoryStatusValues:
          store.advancedSearchValues.regulatoryStatusValues
      }).filter(arr => arr.length > 0)
    ),
    results:
      store.searchResults.advancedSearchFacilities.basicDetailsFacilities,
    dependancyIsLoading: store.dependancies.isLoading,
    dependancyIsNetworkError: store.dependancies.isNetworkError,
    facilitiesByTypeAndOwnership: store.facilities.facilitiesByTypeAndOwnership,
    facilitiesByTypeAndOwnershipKeys: store.facilities.facilitiesByTypeAndOwnershipKeys,
    facilitiesWithOPD: store.facilities.facilitiesWithOPD,
    facilitiesWithANC: store.facilities.facilitiesWithANC,
    facilitiesWithHTC: store.facilities.facilitiesWithHTC,
    facilitiesWithART: store.facilities.facilitiesWithART,
    totalFacilities: store.facilities.totalFacilities
  };
};

export default connect(mapStateToProps, {
  fetchDashboardFacilityServices,
  fetchServices,
  regulatoryStatuses,
  operationalStatuses,
  fetchFacilities,
  fetchServices,
  fetchFacilityTypes,
  fetchFacilityOwners,
  fetchOperationalStatuses,
  fetchRegulatoryStatuses,
  facilitiesWithService,
  fetchTotalFacilities,
  facilityTypeAndOwnership
})(DashboardHome);
connect()
