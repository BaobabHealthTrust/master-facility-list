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

import { Doughnut, Bar } from 'react-chartjs-2'

import {
  GenericCard
} from './charts/mini-cards';
import '../App.css';

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

  onClick = async (event) => {
    const district = event.target.id;

    if (this.state.districts.includes(district)) {
      const flag = this.state.districts.includes(district);
      if (flag) {
        const index = this.state.districts.indexOf(district);
        if (index >= 0) {
          await this.setState((prevState, props) => {
            const districts = prevState.districts;
            districts.splice(index, 1);
            return { districts }
          });
        }
      }
    } else {
      await this.setState((prevState, props) => {
        const districts = prevState.districts;
        districts.push(district);
        return { districts }
      });
    }

    this.props.regulatoryStatuses(this.state.districts);
    this.props.operationalStatuses(this.state.districts);
    this.props.facilityTypeAndOwnership(this.state.districts);
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resizeDashBoard)
    this.resizeDashBoard();
    await this.props.fetchFacilities();
    await this.props.fetchFacilityOwners();
    await this.props.fetchOperationalStatuses();
    await this.props.fetchRegulatoryStatuses();
    await this.props.regulatoryStatuses(this.state.districts);
    await this.props.operationalStatuses(this.state.districts);
    await this.props.fetchDashboardFacilityServices(
      map(this.state.dashboardServices, "id")
    );

    await this.props.facilitiesWithService('Injectable', 'FETCH_FACILITIES_WITH_OPD');
    await this.props.facilitiesWithService('Treatment of severe diarrhoea (IV Fluids)', 'FETCH_FACILITIES_WITH_ANC');
    await this.props.facilitiesWithService('Vitamin A supplementation in infants and children 6-59 months', 'FETCH_FACILITIES_WITH_HTC');
    await this.props.facilitiesWithService('Rapid Diagnostic Test (MRDT) ', 'FETCH_FACILITIES_WITH_ART');
    await this.props.facilityTypeAndOwnership(this.state.districts);
    await this.props.fetchTotalFacilities();
  }

  componentWillReceiveProps() {
    footerResizer();
  }

  render() {

    return (
      <div>
        <div className="row mt-6">
          <div className="col s12 m3" style={{ position: 'sticky', top: 10 }}>
            <FacilitiesMap onClick={this.onClick} districts={this.state.districts} />
          </div>
          <div className="col s12 m9">
            <div className="row">
              <div className="col s12 l3 col-5">
                <GenericCard count={this.props.totalFacilities.length} title="Total Facilities" icon="hospital" />
              </div>
              <div className="col s12 l3 col-5">
                <GenericCard count={this.props.facilitiesWithANC.length} title="With ANC" icon="pregnant" />
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
