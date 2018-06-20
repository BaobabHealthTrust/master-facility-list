//@flow
import React from "react";
import Card from "../common/MflStatsCard";
import {
  FacilityOwnershipChart,
  FacilityOperationalChart,
  FacilityRegulatoryStatusChart,
  FacilityTypeChart,
  FacilitiesByTypeAndOwnership
} from "./charts";
import { FacilityFilters } from "../common/"
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
  fetchDashboardFacilityServices
} from "../actions";
import footerResizer from "../helpers/footerResize";

import { Doughnut, Bar } from 'react-chartjs-2'

import mapmalawi from '../mapmalawi.png';
// import '../App.css';

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
  }

  componentWillReceiveProps() {
    footerResizer();
  }

  render() {
    const facilityTypeData = this.props.facilityTypes.map(type => {
      return {
        facilityType: type.facility_type,
        total: this.calculateFacilityType(type.id)
      };
    });

    const ownershipData = this.props.owners.map(owner => {
      return {
        ownership: owner.facility_owner,
        total: this.calculateOwnership(owner.id)
      };
    });

    const regulatoryStatusData = this.props.regulatoryStatuses.map(
      regulatoryStatus => {
        return {
          regulatoryStatus:
            regulatoryStatus.facility_regulatory_status,
          total: this.calculateRegulatoryStatus(regulatoryStatus.id)
        };
      }
    );

    const operationalStatusData = this.props.operationalStatuses.map(
      operationalStatus => {
        return {
          x: operationalStatus.facility_operational_status,
          y: this.calculateOperationalStatus(operationalStatus.id)
        };
      }
    );

    const doughnutData = {
      datasets: [{
        data: [10, 20],
        backgroundColor: [
          '#1976D2',
          '#0D47A1',
        ],
      }],
      labels: [
        'closed',
        'opened'
      ],
      colors: [
        '#768392',
        '#568392'
      ]
    };

    const barData = {
      labels: ["Registered", "Not certified", "Suspended", "Cancelled", "Not Registered"],
      datasets: [{
        label: '',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          '#0D47A1',
          '#0D47A1',
          '#0D47A1',
          '#0D47A1',
          '#0D47A1',
        ],
        borderColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderWidth: 1
      }]
    };

    return (
      <div>
        <FacilityFilters url="" isFilteredResults={false} />
        <div className="container">
          <br />
          {this.props.dependancyIsLoading ? (
            <div class="progress">
              <div class="indeterminate" />
            </div>
          ) : this.props.dependancyIsNetworkError ? (
            <blockquote>
              <h4>
                "Sorry, we cannot connect to the Server. Please
                check your Network"
              </h4>
            </blockquote>
          ) : (
                <div className="row">
                  <div className="col s12 m3">
                    <div className="z-depth-2 mlf-w-9">
                      <div className="mfl-card-title bg-grey-light">
                        select district
                      </div>
                      <div className=" mfl-p-2 mfl-bm-5">
                        <div>
                          <img src={mapmalawi} alt="map of malawi" className="mfl-p-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m9">
                    <div className="row">
                      {this.state.dashboardServices.map(
                        services => (
                          <div className="col s12 m3">
                            <div className="mfl-tm-5" />
                            <Card
                              icon={services.icon}
                              stat={this.calculateTotalFacilitiesWith(
                                services.id
                              )}
                              title={`Facilities with ${
                                services.displayName
                                }`}
                            />
                          </div>
                        )
                      )}
                    </div>
                    <div className="row">
                      <div className="col s12 m6">
                        <div className="z-depth-2 mlf-w-9">
                          <div className="mfl-card-title bg-grey-light">
                            Facilities by Licensing status
                          </div>
                          <div className=" mfl-p-2 mfl-bm-5">
                            <Bar data={barData} />
                          </div>
                        </div>
                      </div>
                      <div className="col s12 m6">
                        <div className="z-depth-2 mlf-w-9">
                          <div className="mfl-card-title bg-grey-light">
                            Facilities by operational status
                          </div>
                          <div className=" mfl-p-2 mfl-bm-5">
                            <Doughnut data={doughnutData} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <div className="z-depth-2 mlf-w-9">
                          <div className="mfl-card-title bg-grey-light">
                            Facilities by operational status
                          </div>
                          <div className=" mfl-p-2 mfl-bm-5">
                            <FacilitiesByTypeAndOwnership />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    facilityServices: store.dashboardStatistics.facilityServices,
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
  fetchServices,
  fetchFacilities,
  fetchFacilityTypes,
  fetchFacilityOwners,
  fetchOperationalStatuses,
  fetchRegulatoryStatuses
})(DashboardHome);
