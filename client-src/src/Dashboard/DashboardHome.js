//@flow
import React from "react";
import Card from "../common/MflStatsCard";
import {
  FacilityOwnershipChart,
  FacilityOperationalChart,
  FacilityRegulatoryStatusChart,
  FacilityTypeChart,
  FacilitiesByTypeAndOwnership,
  FacilitiesByLicensingStatus,
  FacilitiesByOperationalStatus
} from "./charts";
import { 
  FacilityFilters, 
  MflCardGeneric,
  MFLGoogleMap
} from "../common/"
import { connect } from "react-redux";
import type {
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
  regulatoryStatuses,
  facilitiesWithService,
  fetchAllFacilities
} from "../actions";
import footerResizer from "../helpers/footerResize";

import { Doughnut, Bar } from 'react-chartjs-2'

import { 
  TotalFacilities, 
  FacilitiesWithANC, 
  FacilitiesWithHTC, 
  FacilitiesWithOPD 
} from './charts/mini-cards';

import mapmalawi from '../mapmalawi.png';
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
  dependancyIsNetworkError: boolean
};

type State = {
  dashboardServices: Array<{ id: number, displayName: string, icon: string }>
};

// TODO: Codes for All Dependancies

class DashboardHome extends React.Component<Props, State> {
  state = {
    dashboardServices: [
      {
        id: 138,
        displayName: "OPD",
        icon: "people"
      },
      {
        id: 152,
        displayName: "ANC",
        icon: "pregnant_woman"
      },
      {
        id: 151,
        displayName: "FAM",
        icon: "wc"
      },
      {
        id: 154,
        displayName: "ARI",
        icon: "smoking_rooms"
      }
    ]
  };

  calculateTotalFacilitiesWith = (
    id: number,
    results: number[] = this.props.results,
    isValuesEmpty: boolean = this.props.isSearchValuesEmpty
  ) => {
    const totalFacilities = this.props.facilityServices
      ? this.props.facilityServices.filter(fs => {
        return fs.service_id === id;
      })
      : [{}];

    const uniqueFacilities = isValuesEmpty
      ? uniq(map(totalFacilities, "facility_id")).length
      : intersection(results, uniq(map(totalFacilities, "facility_id")))
        .length;

    return uniqueFacilities;
  };

  calculateOwnership = (
    id: number,
    results: number[] = this.props.results,
    isValuesEmpty: boolean = this.props.isSearchValuesEmpty
  ) => {
    const total = this.props.allFacilities
      ? this.props.allFacilities.filter(facility => {
        return facility.facility_owner_id === id;
      })
      : [];

    const totalOwnership = isValuesEmpty
      ? total.length
      : intersection(results, map(total, "id")).length;

    return totalOwnership;
  };

  calculateFacilityType = (
    id: number,
    results: number[] = this.props.results,
    isValuesEmpty: boolean = this.props.isSearchValuesEmpty
  ) => {
    const total = this.props.allFacilities
      ? this.props.allFacilities.filter(facility => {
        return facility.facility_type_id === id;
      })
      : [];

    const totalFacilityType = isValuesEmpty
      ? total.length
      : intersection(results, map(total, "id")).length;

    return totalFacilityType;
  };

  calculateOperationalStatus = (
    id: number,
    results: number[] = this.props.results,
    isValuesEmpty: boolean = this.props.isSearchValuesEmpty
  ) => {
    const total = this.props.allFacilities
      ? this.props.allFacilities.filter(facility => {
        return facility.facility_operational_status_id === id;
      })
      : [];

    const totalOperationalStatus = isValuesEmpty
      ? total.length
      : intersection(results, map(total, "id")).length;

    return totalOperationalStatus;
  };

  calculateRegulatoryStatus = (
    id: number,
    results: number[] = this.props.results,
    isValuesEmpty: boolean = this.props.isSearchValuesEmpty
  ) => {
    const total = this.props.allFacilities
      ? this.props.allFacilities.filter(facility => {
        return facility.facility_regulatory_status_id === id;
      })
      : [];

    const totalRegulatoryStatus = isValuesEmpty
      ? total.length
      : intersection(results, map(total, "id")).length;

    return totalRegulatoryStatus;
  };

  calculateTotal = (
    results: number[] = this.props.results,
    isValuesEmpty: boolean = this.props.isSearchValuesEmpty
  ) => {
    const total = this.props.allFacilities
      ? map(this.props.allFacilities, "id")
      : [];

    const finalTotal = isValuesEmpty
      ? total.length
      : intersection(results, total).length;
    return finalTotal;
  };

  async componentDidMount() {
    await this.props.fetchFacilities();
    await this.props.fetchFacilityOwners();
    await this.props.fetchOperationalStatuses();
    await this.props.fetchRegulatoryStatuses();
    await this.props.fetchDashboardFacilityServices(
      map(this.state.dashboardServices, "id")
    );
    await this.props.facilitiesWithService('Out patient services (OPD)', 'FETCH_FACILITIES_WITH_OPD');
    await this.props.facilitiesWithService('Ante - natal Services', 'FETCH_FACILITIES_WITH_ANC');
    await this.props.facilitiesWithService('Vitamin A supplementation in infants and children 6-59 months', 'FETCH_FACILITIES_WITH_HTC');
    await this.props.fetchAllFacilities();
  }

  componentWillReceiveProps() {
    footerResizer();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
            <div className="row">
              {/* <div className="col s12 m4">
                <MflCardGeneric heading="map of amalawi" view={<MFLGoogleMap />} />
              </div> */}
              <div className="col s12">
                <div className="row">
                  <div className="col s12 m3">
                    <TotalFacilities title={'Total Facilities'} count={this.props.allFacilities.length} icon={'business'} />
                  </div>
                  <div className="col s12 m3">
                    <FacilitiesWithANC title={'Facilities with ANC'} icon={'business'} count={this.props.facilitiesWithANC.length} />
                  </div>
                  <div className="col s12 m3">
                    <FacilitiesWithHTC title={'Facilities with HTC'} icon={'business'} count={this.props.facilitiesWithHTC.length} />
                  </div>
                  <div className="col s12 m3">
                    <FacilitiesWithOPD title={'Facilities with OPD'} icon={'business'} count={this.props.facilitiesWithOPD.length} />
                  </div>
                  <div className="col s12 m12">
                    <div className="row">
                      <div className="col s12 m6">
                        <div class="outer-recharts-surface">
                          <FacilitiesByLicensingStatus />
                        </div>
                      </div>
                      <div className="col s12 m6">
                        <div className="outer-recharts-surface">
                          <FacilitiesByOperationalStatus />
                        </div>
                      </div>
                      <div class="col s12">
                        <div class="outer-recharts-surface">
                          <FacilitiesByTypeAndOwnership />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    facilitiesWithOPD: store.facilities.facilitiesWithOPD,
    facilitiesWithANC: store.facilities.facilitiesWithANC,
    facilitiesWithHTC: store.facilities.facilitiesWithHTC,
    facilityServices: store.dashboardStatistics.facilityServices,
    all: store.facilities.allFacilities,
    services: store.dependancies.services,
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
    dependancyIsNetworkError: store.dependancies.isNetworkError
  };
};

export default connect(mapStateToProps, {
  fetchDashboardFacilityServices,
  fetchFacilities,
  fetchServices,
  fetchFacilityTypes,
  fetchFacilityOwners,
  fetchOperationalStatuses,
  fetchRegulatoryStatuses,
  facilitiesWithService,
  fetchAllFacilities
})(DashboardHome);
connect()
